import Link from 'next/link'
import Logo from './Logo'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start">
              <Logo size="md" showText={true} className="mb-2" variant="white" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mt-4">
                MiMo Agriculture chuyên cung cấp các giải pháp nông nghiệp hiện đại, an toàn và hiệu quả. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất cho bà con nông dân.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 group">
                <MapPinIcon className="w-6 h-6 text-primary mt-0.5 group-hover:text-white transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">3 Ngõ Đương Xóm 1 Đỗ Xá, Phú Xuyên, Hà Nội</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <PhoneIcon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">085 399 1995</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <EnvelopeIcon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">mimoagriculture@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <GlobeAltIcon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">bayruoivang.com</span>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="bg-gray-800 p-2.5 rounded-full hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://zalo.me/0853991995" target="_blank" rel="noopener" className="bg-gray-800 p-2.5 rounded-full hover:bg-[#0068FF] hover:text-white transition-all transform hover:-translate-y-1" aria-label="Zalo">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 17.6v-11.2c0-1.3-.9-2.4-2-2.4h-16c-1.1 0-2 1.1-2 2.4v11.2c0 1.3.9 2.4 2 2.4h2.8l2.5 3.6c.4.6 1.3.6 1.7 0l2.5-3.6h6.5c1.1 0 2-1.1 2-2.4zm-11-6.4h2v2h-2v-2zm-4 0h2v2h-2v-2zm8 0h2v2h-2v-2z" /></svg>
              </a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener" className="bg-gray-800 p-2.5 rounded-full hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.997 2.997 0 0 0-2.115-2.123C19.48 3.5 12 3.5 12 3.5s-7.48 0-9.383.563A2.997 2.997 0 0 0 .502 6.186C0 8.09 0 12 0 12s0 3.91.502 5.814a2.997 2.997 0 0 0 2.115 2.123C4.52 20.5 12 20.5 12 20.5s7.48 0 9.383-.563a2.997 2.997 0 0 0 2.115-2.123C24 15.91 24 12 24 12s0-3.91-.502-5.814zM9.545 15.568V8.432L15.818 12 9.545 15.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white text-lg mb-6 relative inline-block">
              Chính sách
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/policy#exchange" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>Chính sách đổi trả</Link></li>
              <li><Link href="/policy#shipping" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>Chính sách vận chuyển</Link></li>
              <li><Link href="/policy#support" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>Chính sách hỗ trợ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>Liên hệ tư vấn</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>Về chúng tôi</Link></li>
            </ul>
          </div>

          {/* Map - 4 cols */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-white text-lg mb-6 relative inline-block">
              Bản đồ
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></span>
            </h4>
            <div className="bg-gray-800 rounded-xl p-1 shadow-lg overflow-hidden h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d932.5796704363112!2d105.9012659754065!3d20.77839145268325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zMyBuZ8O1IMSRxrDGoW5nIHjDs20gMSDEkeG7lyB4w6EgduG6oW4gxJFp4buDbSB0aMaw4budbmcgdMOtbiBow6AgbuG7mWkg!5e0!3m2!1svi!2s!4v1759428419267!5m2!1svi!2s"
                className="w-full h-full rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                style={{ border: 'none' }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} MiMo Agriculture. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            Thiết kế bởi <span className="text-primary font-semibold ml-1">Phú Hoàng</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
