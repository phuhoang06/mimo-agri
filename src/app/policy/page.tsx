'use client'

import { useState, useEffect } from 'react'

type TabKey = 'exchange' | 'shipping' | 'support'

export default function PolicyPage() {
  const [active, setActive] = useState<TabKey>('exchange')

  useEffect(() => {
    const applyHash = () => {
      if (typeof window === 'undefined') return
      const hash = window.location.hash.replace('#', '') as TabKey
      if (hash === 'exchange' || hash === 'shipping' || hash === 'support') {
        setActive(hash)
      }
    }

    // Áp dụng ngay khi mount
    applyHash()

    // Lắng nghe thay đổi hash để chuyển tab đúng đích khi điều hướng từ footer
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const tabBtn = (key: TabKey, label: string) => (
    <button
      onClick={() => {
        setActive(key)
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.hash = key
          window.history.replaceState(null, '', url.toString())
        }
      }}
      className={`px-4 py-2 rounded-t-md border-b-2 ${active === key ? 'border-green-600 text-green-700 font-semibold' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
    >
      {label}
    </button>
  )

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">CHÍNH SÁCH BÁN HÀNG</h1>

      <div className="border rounded-md bg-white">
        <div className="flex gap-2 px-2 pt-2 border-b bg-gray-50 rounded-t-md">
          {tabBtn('exchange', 'Chính sách đổi trả')}
          {tabBtn('shipping', 'Chính sách vận chuyển')}
          {tabBtn('support', 'Chính sách hỗ trợ')}
        </div>

        <div className="p-4">
          {active === 'exchange' && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Cam kết đổi 1 Đổi 1 nếu có lỗi từ NSX</h2>
              <p className="mb-3 text-gray-700">Tại MiMo Agriculture, chúng tôi cam kết đảm bảo chất lượng sản phẩm cung cấp đến khách hàng. Trong trường hợp sản phẩm có lỗi từ nhà sản xuất, chúng tôi sẽ thực hiện chính sách đổi 1 Đổi 1 cho khách hàng.</p>
              <h3 className="font-semibold mt-4">Điều kiện áp dụng:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Sản phẩm còn trong thời hạn bảo hành</li>
                <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất, không do tác động bên ngoài</li>
                <li>Sản phẩm còn nguyên tem, nhãn và phụ kiện đi kèm</li>
              </ul>
              <h3 className="font-semibold mt-4">Quy trình đổi trả:</h3>
              <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                <li>Thông báo cho MiMo Agriculture qua hotline 0853.991.995 hoặc Zalo</li>
                <li>Gửi hình ảnh hoặc video mô tả lỗi sản phẩm</li>
                <li>Nhân viên kỹ thuật sẽ xác nhận lỗi và hướng dẫn thủ tục đổi trả</li>
                <li>Gửi sản phẩm lỗi về MiMo Agriculture theo hướng dẫn</li>
                <li>Nhận sản phẩm mới thay thế</li>
              </ol>
            </div>
          )}

          {active === 'shipping' && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Chính sách vận chuyển</h2>
              <p className="text-gray-700 mb-4">Chúng tôi hỗ trợ giao hàng toàn quốc với nhiều lựa chọn vận chuyển. Phí và thời gian giao hàng sẽ được thông báo khi đặt hàng, ưu tiên tối ưu chi phí và tốc độ nhận hàng cho khách.</p>
              
              <h3 className="font-semibold mb-3">🚚 Phí vận chuyển:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 200.000đ</li>
              </ul>
              
              <h3 className="font-semibold mb-3 mt-4">⏰ Thời gian giao hàng:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Nội thành Hà Nội: 1-2 ngày làm việc</li>
                <li>Các tỉnh thành khác: 2-5 ngày làm việc</li>
                <li>Khu vực xa: 5-7 ngày làm việc</li>
              </ul>
            </div>
          )}

          {active === 'support' && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Hỗ trợ trả lời mọi thắc mắc</h2>
              <p className="mb-3 text-gray-700">MiMo Agriculture cam kết hỗ trợ và giải đáp mọi thắc mắc của khách hàng liên quan đến sản phẩm, đơn hàng và các dịch vụ của chúng tôi.</p>
              <h3 className="font-semibold mt-4">Kênh hỗ trợ khách hàng:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li><strong>Hotline:</strong> 0853.991.995 (8:00 - 18:00, Thứ 2 - CN)</li>
                <li><strong>Zalo:</strong> 0853.991.995</li>
                <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="text-green-600 hover:underline">MiMo Agriculture</a></li>
                <li><strong>Email:</strong> mimoagriculture@gmail.com</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


