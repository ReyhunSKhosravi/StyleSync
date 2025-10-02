import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

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

  const { personality, twitterEnhanced, enhancedRecommendations, glossary } = data

  const tabs = [
    { id: 'overview', name: 'خلاصه', icon: '📊' },
    { id: 'colors', name: 'رنگ‌ها', icon: '🎨' },
    { id: 'clothing', name: 'لباس', icon: '👗' },
    { id: 'hair', name: 'مو', icon: '💇‍♀️' },
    { id: 'makeup', name: 'آرایش', icon: '💄' },
    { id: 'hijab', name: 'حجاب', icon: '🧕' },
    { id: 'accessories', name: 'اکسسوری', icon: '👜' },
    { id: 'tips', name: 'نکات', icon: '💡' }
  ]

  return (
    <div className="min-h-screen p-6 pb-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-block text-8xl mb-4">
            {personality.icon}
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            {personality.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {personality.description}
          </p>
          {twitterEnhanced && (
            <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              ✨ تحلیل شده با توییتر
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max px-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="ml-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="card fade-in">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  ویژگی‌های شخصیتی شما
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {personality.traits.map((trait, index) => (
                    <div
                      key={index}
                      className="px-6 py-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300"
                    >
                      <span className="font-bold text-gray-800 text-lg">{trait.name}</span>
                      <span className="text-purple-700 mr-3 text-xl">★ {trait.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl text-center">
                  <div className="text-5xl mb-4">🎨</div>
                  <h4 className="font-bold text-xl mb-2">{personality.colors?.name || 'پالت رنگ شما'}</h4>
                  <p className="text-gray-700 text-sm">{personality.colors?.description}</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl text-center">
                  <div className="text-5xl mb-4">👗</div>
                  <h4 className="font-bold text-xl mb-2">لباس و استایل</h4>
                  <p className="text-gray-700 text-sm">پیشنهادات کامل برای کمد لباس شما</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl text-center">
                  <div className="text-5xl mb-4">💄</div>
                  <h4 className="font-bold text-xl mb-2">زیبایی</h4>
                  <p className="text-gray-700 text-sm">راهنمای کامل مو و آرایش</p>
                </div>
              </div>

              {twitterEnhanced && enhancedRecommendations && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-300">
                  <h4 className="font-bold text-xl mb-4 flex items-center">
                    <span className="text-3xl ml-2">🐦</span>
                    نکات شخصی‌سازی شده از توییتر
                  </h4>
                  <div className="space-y-3">
                    {enhancedRecommendations.personalizedTips?.map((tip, index) => (
                      <p key={index} className="text-gray-700 mr-6">• {tip}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && personality.colors && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3 text-center">
                {personality.colors.name}
              </h3>
              <p className="text-gray-600 text-center mb-8 text-lg">
                {personality.colors.description}
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                {personality.colors.colors?.map((color, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className="w-full h-40 rounded-3xl mb-4 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 border-4 border-white"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h4 className="font-bold text-xl text-gray-800 mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{color.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 font-mono bg-gray-100 inline-block px-3 py-1 rounded-full">{color.hex}</p>
                      <p className="text-xs text-gray-500">مناسب برای: {color.usage}</p>
                      <p className="text-xs text-purple-600 font-bold">فصل: {color.season?.join('، ')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Guides */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                  <h4 className="font-bold text-xl mb-4">📍 راهنمای رنگ براساس پوست</h4>
                  {personality.skinToneGuide && Object.values(personality.skinToneGuide).map((guide, index) => (
                    <div key={index} className="mb-4 pb-4 border-b border-orange-200 last:border-0">
                      <h5 className="font-bold text-gray-800">{guide.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                      <p className="text-sm text-green-700">✓ بهترین‌ها: {guide.bestColors.join('، ')}</p>
                      {guide.avoidColors.length > 0 && (
                        <p className="text-sm text-red-700">✗ اجتناب: {guide.avoidColors.join('، ')}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <h4 className="font-bold text-xl mb-4">🎨 ترکیب‌های رنگی پیشنهادی</h4>
                  {personality.colorCombinations && Object.values(personality.colorCombinations).map((category, catIndex) => (
                    <div key={catIndex} className="mb-4">
                      <h5 className="font-bold text-purple-700 mb-2">{category.name}</h5>
                      {category.combinations.map((combo, comboIndex) => (
                        <div key={comboIndex} className="mb-2 mr-4">
                          <p className="text-sm font-bold text-gray-800">
                            {combo.colors.join(' + ')}
                          </p>
                          <p className="text-xs text-gray-600">{combo.description}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Clothing Tab */}
          {activeTab === 'clothing' && personality.clothing && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                لباس‌های ضروری برای کمد شما
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {personality.clothing.essentials?.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400"
                  >
                    <h4 className="font-bold text-2xl text-gray-800 mb-3">{item.item}</h4>
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">{item.description}</p>
                    <div className="bg-white p-3 rounded-xl">
                      <p className="text-sm text-purple-700 font-bold">
                        🏷️ برندهای پیشنهادی:
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{item.brands}</p>
                    </div>
                  </div>
                ))}
              </div>

              {twitterEnhanced && enhancedRecommendations?.suggestedBrands && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-300">
                  <h4 className="font-bold text-2xl mb-4 flex items-center">
                    <span className="text-3xl ml-2">🐦</span>
                    برندهای پیشنهادی از تحلیل توییتر
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {enhancedRecommendations.suggestedBrands.map((brand, index) => (
                      <div key={index} className="p-4 bg-white rounded-2xl">
                        <h5 className="font-bold text-lg text-gray-800">{brand.name}</h5>
                        <p className="text-sm text-gray-600">{brand.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hair Tab */}
          {activeTab === 'hair' && personality.hair && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                💇‍♀️ راهنمای کامل مو
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {personality.hair.styles?.map((style, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl hover:shadow-xl transition-all"
                  >
                    <h4 className="font-bold text-xl text-gray-800 mb-3">{style.style}</h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">{style.description}</p>
                    <div className="bg-white p-3 rounded-xl">
                      <p className="text-sm font-bold text-purple-700 mb-1">محصولات مورد نیاز:</p>
                      <p className="text-sm text-gray-600">{style.products?.join('، ')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl">
                <h4 className="font-bold text-2xl mb-4">💡 نکات مراقبت از مو</h4>
                <div className="space-y-3">
                  {personality.hair.tips?.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-2xl ml-3">✨</span>
                      <p className="text-gray-700 text-lg">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Makeup Tab */}
          {activeTab === 'makeup' && personality.makeup && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                💄 راهنمای کامل آرایش
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Daily Makeup */}
                {personality.makeup.daily && (
                  <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl border-2 border-pink-200">
                    <h4 className="font-bold text-2xl mb-6 text-center">{personality.makeup.daily.name}</h4>
                    <div className="space-y-4">
                      {personality.makeup.daily.steps?.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold ml-3">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 mt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-2xl">
                      <p className="text-sm font-bold text-pink-700 mb-2">🛍️ محصولات پیشنهادی:</p>
                      <p className="text-sm text-gray-600">{personality.makeup.daily.products?.join('، ')}</p>
                    </div>
                  </div>
                )}

                {/* Evening Makeup */}
                {personality.makeup.evening && (
                  <div className="p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-2 border-purple-300">
                    <h4 className="font-bold text-2xl mb-6 text-center">{personality.makeup.evening.name}</h4>
                    <div className="space-y-4">
                      {personality.makeup.evening.steps?.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold ml-3">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 mt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-2xl">
                      <p className="text-sm font-bold text-purple-700 mb-2">🛍️ محصولات پیشنهادی:</p>
                      <p className="text-sm text-gray-600">{personality.makeup.evening.products?.join('، ')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-r from-yellow-50 to-pink-50 rounded-3xl">
                <h4 className="font-bold text-2xl mb-4">💡 نکات آرایش</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {personality.makeup.tips?.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-2xl ml-3">✨</span>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hijab Tab */}
          {activeTab === 'hijab' && personality.hijab && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                🧕 راهنمای حجاب و پوشش سر
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {personality.hijab.styles?.map((style, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl hover:shadow-xl transition-all border-2 border-blue-200"
                  >
                    <h4 className="font-bold text-xl text-gray-800 mb-3">{style.style}</h4>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{style.description}</p>
                    <div className="bg-white p-3 rounded-xl">
                      <p className="text-xs font-bold text-blue-700 mb-1">🎀 نحوه بستن:</p>
                      <p className="text-xs text-gray-600">{style.how}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl">
                  <h4 className="font-bold text-xl mb-4">🎨 رنگ‌های پیشنهادی شال</h4>
                  <div className="flex flex-wrap gap-3">
                    {personality.hijab.colors?.map((color, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-gray-700 font-semibold shadow-md"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl">
                  <h4 className="font-bold text-xl mb-4">💡 نکات مهم</h4>
                  <div className="space-y-3">
                    {personality.hijab.tips?.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-xl ml-2">✨</span>
                        <p className="text-gray-700 text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accessories Tab */}
          {activeTab === 'accessories' && personality.accessories && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                👜 اکسسوری‌های ضروری
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personality.accessories.must_have?.map((accessory, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-2 border-purple-300 hover:shadow-xl hover:scale-105 transition-all text-center"
                  >
                    <div className="text-5xl mb-4">✨</div>
                    <p className="font-bold text-lg text-gray-800">{accessory}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && personality.tips && (
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                💡 نکات طلایی استایل
              </h3>
              <div className="space-y-6">
                {personality.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start p-6 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 rounded-3xl hover:shadow-xl transition-all border-r-4 border-purple-600"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl ml-4">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 text-xl leading-relaxed mt-2">{tip}</p>
                  </div>
                ))}
              </div>

              {/* Fashion Glossary */}
              {glossary && Object.keys(glossary).length > 0 && (
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-300">
                  <h4 className="font-bold text-2xl mb-6 text-center">📖 واژه‌نامه اصطلاحات مد و فشن</h4>
                  <p className="text-center text-gray-600 mb-6">
                    اگر با این اصطلاحات آشنا نیستید، نگران نباشید! اینجا توضیح ساده‌ شون رو می‌بینید:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(glossary).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white rounded-2xl">
                        <h5 className="font-bold text-lg text-purple-700 mb-1">
                          {value.fa} ({key})
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>به زبان ساده:</strong> {value.simple}
                        </p>
                        <p className="text-sm text-gray-500">
                          {value.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 space-x-4 space-x-reverse">
          <button
            onClick={() => navigate('/quiz')}
            className="px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg"
          >
            🔄 تست مجدد
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            🏠 بازگشت به خانه
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
