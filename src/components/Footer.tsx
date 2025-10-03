import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-green-50 text-gray-800 border-t border-green-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <Logo size="sm" showText={true} className="mb-4" />
            </div>
            <div className="space-y-1.5 text-gray-700 text-sm leading-6">
              <p className="font-semibold text-base text-gray-900">MiMo Agriculture</p>
              <p>Địa chỉ: 3 Ngõ Đương Xóm 1 Đỗ Xá Phú Xuyên Hà Nội</p>
              <p>Hotline: 085 399 1995</p>
              <p>Email: mimoagriculture@gmail.com</p>
              <p>Website: bayruoivang.com</p>
            </div>
            <div className="flex space-x-4 mt-5 items-center justify-center md:justify-start">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.847V11.06h2.973V8.413c0-2.948 1.8-4.555 4.43-4.555 1.26 0 2.342.094 2.657.136v3.08h-1.823c-1.43 0-1.707.68-1.707 1.676v2.31h3.413l-.445 3.646h-2.968V24h5.824C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/></svg>
              </a>
              <a href="https://zalo.me/0853991995" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600 transition-colors" aria-label="Zalo">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h18v18H3z" fill="none"/><path d="M12 2C6.48 2 2 6.03 2 10.99 2 15.19 5.4 18.8 10 19.8V22l3.09-1.85c.3.03.61.05.91.05 5.52 0 10-4.03 10-8.99C24 6.03 19.52 2 14 2h-2z"/></svg>
              </a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener" className="text-gray-600 hover:text-green-600 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a2.997 2.997 0 0 0-2.115-2.123C19.48 3.5 12 3.5 12 3.5s-7.48 0-9.383.563A2.997 2.997 0 0 0 .502 6.186C0 8.09 0 12 0 12s0 3.91.502 5.814a2.997 2.997 0 0 0 2.115 2.123C4.52 20.5 12 20.5 12 20.5s7.48 0 9.383-.563a2.997 2.997 0 0 0 2.115-2.123C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.545 15.568V8.432L15.818 12 9.545 15.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-gray-900">Chính sách bán hàng</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/policy#exchange" className="text-gray-700 hover:text-green-600 transition-colors">Chính sách đổi trả</a></li>
              <li><a href="/policy#shipping" className="text-gray-700 hover:text-green-600 transition-colors">Chính sách vận chuyển</a></li>
              <li><a href="/policy#support" className="text-gray-700 hover:text-green-600 transition-colors">Chính sách hỗ trợ</a></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Fanpage Info */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-gray-900">Fanpage MiMo Agriculture</h4>
            <div className="bg-white rounded-lg p-2 shadow-sm border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d932.5796704363112!2d105.9012659754065!3d20.77839145268325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zMyBuZ8O1IMSRxrDGoW5nIHjDs20gMSDEkeG7lyB4w6EgduG6oW4gxJFp4buDbSB0aMaw4budbmcgdMOtbiBow6AgbuG7mWkg!5e0!3m2!1svi!2s!4v1759428419267!5m2!1svi!2s"
                className="w-full h-[350px]"
                style={{ border: 'none', overflow: 'hidden' }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            Trang web này được thiết kế bởi <span className="text-red-500 font-semibold">Phú Hoàng</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
