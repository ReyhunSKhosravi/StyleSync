import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            StyleSync
          </h1>
          <p className="text-2xl text-gray-700 font-medium mb-2">
            استایلی متناسب با شخصیت واقعی شما
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            با تحلیل شخصیت شما، بهترین پیشنهادات استایل و مد را برای شما انتخاب می‌کنیم
          </p>
        </div>

        {/* Main Card */}
        <div className="card scale-in mb-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="text-center p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تست شخصیت</h3>
              <p className="text-gray-600">به چند سوال ساده پاسخ دهید</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">تحلیل هوشمند</h3>
              <p className="text-gray-600">شخصیت شما را تحلیل می‌کنیم</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">پیشنهاد استایل</h3>
              <p className="text-gray-600">استایل مناسب برای شما</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/quiz')}
              className="btn-primary group"
            >
              شروع تست شخصیت
              <svg className="inline-block w-6 h-6 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center fade-in">
          <button
            onClick={() => navigate('/about')}
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-300"
          >
            درباره StyleSync
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

