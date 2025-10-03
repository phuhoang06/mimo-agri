'use client'

import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg shadow-sm">
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">LIÊN HỆ</h1>
        <p className="text-gray-600 mt-2">Liên hệ mua hàng và hỗ trợ kỹ thuật</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Thông tin liên hệ</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <div className="font-medium">Địa chỉ:</div>
                <div>3 Ngõ Đương Xóm 1 Đỗ Xá Phú Xuyên Hà Nội</div>
              </div>
              <div>
                <div className="font-medium">Hotline:</div>
                <div>085 399 1995</div>
              </div>
              <div>
                <div className="font-medium">Zalo:</div>
                <div>085 399 1995</div>
              </div>
              <div>
                <div className="font-medium">Fanpage:</div>
                <div>
                  <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="text-green-600 hover:underline">MiMo Agriculture</a>
                </div>
              </div>
              <div>
                <div className="font-medium">Email:</div>
                <div>mimoagriculture@gmail.com</div>
              </div>
              <div>
                <div className="font-medium">Website:</div>
                <div>bayruoivang.com</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="https://m.me/108621171549372" target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Mua qua Messenger</Link>
            <Link href="https://zalo.me/0853991995" target="_blank" className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors">Mua qua Zalo</Link>
          </div>
        </div>

        {/* Bản đồ */}
        <div>
          <div className="aspect-video rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d932.5796704363112!2d105.9012659754065!3d20.77839145268325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zMyBuZ8O1IMSRxrDGoW5nIHjDs20gMSDEkeG7lyB4w6EgduG6oW4gxJFp4buDbSB0aMaw4budbmcgdMOtbiBow6AgbuG7mWkg!5e0!3m2!1svi!2s!4v1759428419267!5m2!1svi!2s"
              width="600"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  )
}


