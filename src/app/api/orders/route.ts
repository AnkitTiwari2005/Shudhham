import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { items, shipping, total_amount } = body;

    // 1. Create Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount,
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

    // 2. Insert Order Items
    const orderItemsToInsert = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      throw itemsError;
    }

    // 3. Send Email Notification to Admin
    try {
      const itemsHtml = items.map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      await resend.emails.send({
        from: 'Shudhham Orders <onboarding@resend.dev>',
        to: ['12328.uspc@gmail.com'],
        subject: `New Order Received! (₹${total_amount})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>🎉 New Order Placed!</h2>
            <p><strong>Customer:</strong> ${shipping.firstName} ${shipping.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Total Amount:</strong> ₹${total_amount}</p>
            
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
              Check your Supabase dashboard for complete order details.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Failed to send order email notification:", emailError);
      // We don't throw here because the order was already successfully placed in the DB
    }

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
