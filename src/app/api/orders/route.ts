import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    
    // Create a server-side supabase client that reads auth from cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'You must be logged in to place an order.' }, { status: 401 });
    }

    const body = await request.json();
    const { items, shipping, paymentIntentId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    if (!paymentIntentId) {
       return NextResponse.json({ success: false, error: 'Missing payment intent' }, { status: 400 });
    }

    // 1. Validate pricing securely from database (duplicate logic to prevent tampering)
    const productIds = items.map((item: any) => item.id);
    const { data: dbProducts, error: dbError } = await supabase
      .from('products')
      .select('id, price')
      .in('id', productIds);

    if (dbError || !dbProducts) {
      throw new Error('Failed to fetch product data for verification');
    }

    let calculatedTotal = 0;
    for (const item of items) {
      const dbProduct = dbProducts.find(p => p.id === item.id);
      if (!dbProduct) throw new Error(`Product ${item.id} not found`);
      calculatedTotal += dbProduct.price * Math.max(1, item.quantity);
    }

    // 2. Strict Payment Verification with Stripe!
    if (paymentIntentId !== 'cod') {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.status !== 'succeeded') {
        return NextResponse.json({ success: false, error: 'Payment has not succeeded in Stripe.' }, { status: 400 });
      }
      if (intent.amount !== Math.round(calculatedTotal * 100)) {
        return NextResponse.json({ success: false, error: 'Payment amount mismatch. Potential tampering detected.' }, { status: 400 });
      }
    }

    // 3. Create Order using the SAFE calculatedTotal
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: calculatedTotal,
        full_name: `${shipping.firstName} ${shipping.lastName}`.trim(),
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        pin_code: shipping.pinCode,
        status: 'processing'
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      throw orderError;
    }

    // 4. Insert Order Items using SAFE dbProduct prices
    const orderItemsToInsert = items.map((item: any) => {
      const dbProduct = dbProducts.find(p => p.id === item.id)!;
      return {
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: Math.max(1, item.quantity),
        price: dbProduct.price 
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      throw itemsError;
    }

    // 5. Send Email Notification to Admin
    try {
      const itemsHtml = orderItemsToInsert.map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.product_name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      await resend.emails.send({
        from: 'Shudhham Orders <onboarding@resend.dev>',
        to: ['pikapikachu1626@gmail.com'],
        subject: `New Order Received! [${paymentIntentId === 'cod' ? 'COD' : 'PAID'}] (₹${calculatedTotal})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>🎉 New Order Placed!</h2>
            <p><strong>Customer:</strong> ${shipping.firstName} ${shipping.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Total Amount:</strong> ₹${calculatedTotal}</p>
            <p><strong>Payment Method:</strong> ${paymentIntentId === 'cod' ? 'Cash on Delivery' : 'Card / Paid via Stripe'}</p>
            
            <h3>Shipping Address</h3>
            <p>
              ${shipping.address}<br/>
              ${shipping.city}, ${shipping.state} - ${shipping.pinCode}
            </p>

            <h3>Order Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Price</th>
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Check your Supabase/Stripe dashboard for complete order details.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Failed to send order email notification:", emailError);
    }

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
