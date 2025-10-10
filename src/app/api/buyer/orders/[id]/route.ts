import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/buyer/orders/[id] - Lấy chi tiết đơn hàng
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const orderId = params.id

    if (!orderId) {
      return NextResponse.json(
        { error: 'ID đơn hàng không hợp lệ' },
        { status: 400 }
      )
    }

    // Get order with items
    const { data: order, error: orderError } = await supabase
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
          variant_id,
          variant_name
        )
      `)
      .eq('id', orderId)
      .single()

    if (orderError) {
      console.error('Error fetching order:', orderError)
      if (orderError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Không tìm thấy đơn hàng' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Lỗi khi lấy thông tin đơn hàng' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Error in GET /api/buyer/orders/[id]:', error)
    return NextResponse.json(
      { error: 'Lỗi server nội bộ' },
      { status: 500 }
    )
  }
}
