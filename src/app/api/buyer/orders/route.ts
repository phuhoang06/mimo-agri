import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/buyer/orders - Tạo đơn hàng mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { buyerName, phone, address, items } = body

    // Validate input
    if (!buyerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      return sum + (item.price * item.quantity)
    }, 0)

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_name: buyerName,
        phone: phone,
        address: address,
        total_amount: totalAmount,
        status: 'WAITING_CONFIRMATION'
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json(
        { error: `Lỗi khi tạo đơn hàng: ${orderError.message}` },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = items.map((item: { productId: string; productName: string; price: number; quantity: number; variantId?: string; variantName?: string }) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
      variant_id: item.variantId && item.variantId !== 'default' ? item.variantId : null,
      // variant_name removed as it's not in the schema
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      // Rollback order if items creation fails
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { error: `Lỗi khi tạo chi tiết đơn hàng: ${itemsError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: 'Đơn hàng đã được tạo thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.'
    })

  } catch (error) {
    console.error('Error in POST /api/buyer/orders:', error)
    return NextResponse.json(
      { error: 'Lỗi server nội bộ' },
      { status: 500 }
    )
  }
}

// GET /api/buyer/orders - Lấy danh sách đơn hàng
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phone = searchParams.get('phone')

    if (!phone) {
      return NextResponse.json(
        { error: 'Số điện thoại là bắt buộc' },
        { status: 400 }
      )
    }

    // Get orders with items
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          price,
          quantity,
          subtotal,
          variant_id
        )
      `)
      .eq('phone', phone)
      .order('created_at', { ascending: false })

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
      return NextResponse.json(
        { error: 'Lỗi khi lấy danh sách đơn hàng' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orders: orders || []
    })

  } catch (error) {
    console.error('Error in GET /api/buyer/orders:', error)
    return NextResponse.json(
      { error: 'Lỗi server nội bộ' },
      { status: 500 }
    )
  }
}
