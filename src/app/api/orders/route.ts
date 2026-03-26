import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
