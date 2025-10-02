import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!location.state?.data) {
      navigate('/')
      return
    }
    setData(location.state.data)
  }, [location, navigate])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    )
  }

  const { personality, recommendations, twitterEnhanced, enhancedRecommendations } = data

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            نتایج تحلیل شخصیت شما
          </h1>
          <p className="text-xl text-gray-600">
            استایل مناسب برای شخصیت شما آماده است!
          </p>
          {twitterEnhanced && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              تحلیل شده با توییتر - پیشنهادات شخصی‌سازی‌تر
            </div>
          )}
        </div>

        {/* Personality Type */}
        <div className="card mb-8 scale-in text-center">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-bold text-sm mb-4">
              نوع شخصیت شما
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {personality.typeName}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {personality.description}
          </p>
        </div>

        {/* Traits */}
        <div className="card mb-8 fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ویژگی‌های شخصیتی شما
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {personality.traits.map((trait, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border-2 border-purple-200 hover:border-purple-400 transition-colors duration-300"
              >
                <span className="font-bold text-gray-800">{trait.name}</span>
                <span className="text-purple-600 mr-2">★ {trait.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="card mb-8 slide-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 ml-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            رنگ‌های پیشنهادی برای شما
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.colors.map((color, index) => (
              <div key={index} className="text-center group">
                <div
                  className="w-full h-32 rounded-2xl mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">{color.name}</h4>
                <p className="text-sm text-gray-600">{color.description}</p>
                <p className="text-xs text-gray-400 mt-2 font-mono">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clothing Recommendations */}
        <div className="card mb-8 fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 ml-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            لباس‌های پیشنهادی
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.clothing.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="font-bold text-xl text-gray-800 mb-2">{item.item}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accessories */}
        <div className="card mb-8 slide-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 ml-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            اکسسوری‌های پیشنهادی
          </h3>
          <div className="flex flex-wrap gap-4">
            {recommendations.accessories.map((accessory, index) => (
              <div
                key={index}
                className="px-6 py-4 bg-white border-2 border-purple-200 rounded-xl font-semibold text-gray-700 hover:bg-purple-50 hover:border-purple-400 transition-colors duration-300 shadow-md"
              >
                {accessory}
              </div>
            ))}
          </div>
        </div>

        {/* Twitter Enhanced Tips */}
        {twitterEnhanced && enhancedRecommendations && enhancedRecommendations.personalizedTips && enhancedRecommendations.personalizedTips.length > 0 && (
          <div className="card mb-8 slide-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-8 h-8 ml-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              نکات شخصی‌سازی شده از توییتر شما
            </h3>
            <div className="space-y-4">
              {enhancedRecommendations.personalizedTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow duration-300 border-r-4 border-blue-500"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold ml-4">
                    🐦
                  </span>
                  <p className="text-gray-700 text-lg">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Brands from Twitter */}
        {twitterEnhanced && enhancedRecommendations && enhancedRecommendations.suggestedBrands && enhancedRecommendations.suggestedBrands.length > 0 && (
          <div className="card mb-8 fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-8 h-8 ml-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              برندهای پیشنهادی براساس توییتر شما
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {enhancedRecommendations.suggestedBrands.map((brand, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-shadow duration-300 border-2 border-purple-200"
                >
                  <h4 className="font-bold text-lg text-gray-800 mb-2">🏷️ {brand.name}</h4>
                  <p className="text-sm text-gray-600">{brand.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="card mb-8 fade-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 ml-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            نکات استایل برای شما
          </h3>
          <div className="space-y-4">
            {recommendations.tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold ml-4">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-lg">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center fade-in space-x-4 space-x-reverse">
          <button
            onClick={() => navigate('/quiz')}
            className="btn-secondary"
          >
            تست مجدد
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results

