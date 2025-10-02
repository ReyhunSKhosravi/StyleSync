import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            درباره StyleSync
          </h1>
          <p className="text-xl text-gray-600">
            سیستم هوشمند پیشنهاد استایل براساس شخصیت‌شناسی
          </p>
        </div>

        {/* Main Content */}
        <div className="card mb-8 scale-in">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded ml-3"></span>
                StyleSync چیست؟
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                StyleSync یک سیستم پیشرفته پیشنهاد استایل است که با تحلیل شخصیت شما، بهترین پیشنهادات مد و
                استایل را ارائه می‌دهد. ما معتقدیم که هر فردی منحصر به فرد است و استایل او باید بازتاب شخصیت
                واقعی‌اش باشد.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded ml-3"></span>
                چگونه کار می‌کند؟
              </h2>
              <div className="space-y-4">
                <div className="flex items-start p-6 bg-purple-50 rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-xl ml-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">تست شخصیت</h3>
                    <p className="text-gray-700">
                      به ۸ سوال طراحی‌شده درباره سبک زندگی، ترجیحات و شخصیت خود پاسخ می‌دهید.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-pink-50 rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-xl ml-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">تحلیل هوشمند</h3>
                    <p className="text-gray-700">
                      سیستم ما پاسخ‌های شما را تحلیل کرده و یک پروفایل شخصیتی کامل برای شما می‌سازد.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-blue-50 rounded-2xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl ml-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">پیشنهادات شخصی‌سازی‌شده</h3>
                    <p className="text-gray-700">
                      براساس شخصیت شما، رنگ‌ها، لباس‌ها، اکسسوری‌ها و نکات استایل مناسب را دریافت می‌کنید.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded ml-3"></span>
                انواع شخصیت
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'شیک و حرفه‌ای', icon: '👔' },
                  { name: 'خلاق و هنری', icon: '🎨' },
                  { name: 'راحت‌طلب و کژوال', icon: '👕' },
                  { name: 'جسور و ماجراجو', icon: '⚡' },
                  { name: 'مینیمال و آرام', icon: '✨' },
                  { name: 'مدرن و مدگرا', icon: '🌟' },
                  { name: 'رمانتیک و ملایم', icon: '🌸' }
                ].map((type, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300"
                  >
                    <span className="text-3xl ml-3">{type.icon}</span>
                    <span className="font-bold text-gray-800 text-lg">{type.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded ml-3"></span>
                ویژگی‌های StyleSync
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-purple-600 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">تحلیل دقیق</h3>
                    <p className="text-gray-600">با الگوریتم پیشرفته شخصیت‌شناسی</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-8 h-8 text-purple-600 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">رایگان و آسان</h3>
                    <p className="text-gray-600">بدون نیاز به ثبت‌نام</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-8 h-8 text-purple-600 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">پیشنهادات کامل</h3>
                    <p className="text-gray-600">رنگ، لباس، اکسسوری و نکات</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-8 h-8 text-purple-600 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">رابط کاربری زیبا</h3>
                    <p className="text-gray-600">طراحی مدرن و کاربرپسند</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center fade-in">
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary mb-4"
          >
            شروع تست شخصیت
            <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <br />
          <button
            onClick={() => navigate('/')}
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-300"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  )
}

export default About

