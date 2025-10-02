import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Quiz() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showTwitterInput, setShowTwitterInput] = useState(false)
  const [twitterUsername, setTwitterUsername] = useState('')
  const [gender, setGender] = useState(null)

  // سوالات فیلترشده بر اساس جنسیت
  const filteredQuestions = gender
    ? questions.filter(q => q.audience === 'all' || q.audience === gender)
    : []

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/questions')
      setQuestions(response.data.questions)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching questions:', error)
      alert('خطا در دریافت سوالات. لطفا مطمئن شوید سرور بک‌اند در حال اجراست.')
      setLoading(false)
    }
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    
    // انتقال خودکار به سوال بعدی بعد از 500 میلی‌ثانیه
    setTimeout(() => {
      handleNext(option)
    }, 500)
  }

  const handleNext = (option = null) => {
    const optionToUse = option || selectedOption
    
    if (!optionToUse) {
      alert('لطفا یک گزینه را انتخاب کنید')
      return
    }

    const newAnswers = [...answers, optionToUse]
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // نمایش فرم توییتر بعد از آخرین سوال
      setShowTwitterInput(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const newAnswers = answers.slice(0, -1)
      setAnswers(newAnswers)
      setSelectedOption(null)
    }
  }

  const submitAnswers = async (finalAnswers = answers) => {
    setSubmitting(true)
    try {
      const payload = { 
        answers: finalAnswers,
        gender,
        twitterUsername: twitterUsername || null
      }
      
      const response = await axios.post('/api/analyze', payload)
      navigate('/results', { state: { data: response.data } })
    } catch (error) {
      console.error('Error submitting answers:', error)
      alert('خطا در تحلیل نتایج')
      setSubmitting(false)
    }
  }

  const handleSkipTwitter = () => {
    submitAnswers(answers)
  }

  const handleSubmitWithTwitter = () => {
    if (twitterUsername.trim()) {
      submitAnswers(answers)
    } else {
      alert('لطفا یوزرنیم توییتر خود را وارد کنید یا Skip کنید')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl text-gray-700 font-bold mb-2">در حال تحلیل شخصیت شما...</p>
          <p className="text-gray-500">لطفا کمی صبر کنید</p>
        </div>
      </div>
    )
  }

  // انتخاب جنسیت در ابتدای کار
  if (!gender) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <div className="card text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">جنسیت شما چیست؟</h2>
            <p className="text-gray-600 mb-6">برای شخصی‌سازی دقیق‌تر سوالات و پیشنهادات</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setGender('female'); setCurrentQuestion(0); setAnswers([]); }}
                className={`p-6 rounded-2xl font-bold text-lg hover:shadow-lg transition ${gender === 'female' ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'}`}
              >
                👩 زن
              </button>
              <button
                onClick={() => { setGender('male'); setCurrentQuestion(0); setAnswers([]); }}
                className={`p-6 rounded-2xl font-bold text-lg hover:shadow-lg transition ${gender === 'male' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
              >
                👨 مرد
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // بررسی اینکه سوالات بارگذاری شده باشند
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">خطا در بارگذاری سوالات</h2>
          <p className="text-gray-600 mb-6">لطفا مطمئن شوید که سرور بک‌اند در حال اجراست.</p>
          <div className="space-y-3">
            <button
              onClick={fetchQuestions}
              className="btn-primary w-full"
            >
              تلاش مجدد
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    )
  }

  // نمایش فرم توییتر
  if (showTwitterInput) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="card scale-in text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                تحلیل بیشتر با توییتر 🐦
              </h2>
              <p className="text-gray-600 text-lg mb-2">
                برای پیشنهادات دقیق‌تر، یوزرنیم توییتر خود را وارد کنید
              </p>
              <p className="text-sm text-gray-500">
                توییت‌های شما را تحلیل می‌کنیم تا استایل واقعی‌تر شما را بفهمیم
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  @
                </span>
                <input
                  type="text"
                  value={twitterUsername}
                  onChange={(e) => setTwitterUsername(e.target.value.replace('@', ''))}
                  placeholder="username (بدون @)"
                  className="w-full pr-12 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-300 text-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitWithTwitter()
                    }
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">
                مثال: elonmusk یا taylorswift13
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSkipTwitter}
                className="btn-secondary"
              >
                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                رد کردن
              </button>
              <button
                onClick={handleSubmitWithTwitter}
                disabled={!twitterUsername.trim()}
                className={`btn-primary ${!twitterUsername.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                تحلیل با توییتر
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>🔒 حریم خصوصی:</strong> فقط توییت‌های عمومی شما را می‌خوانیم و هیچ اطلاعاتی ذخیره نمی‌شود
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = filteredQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8 fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-purple-600">
              سوال {currentQuestion + 1} از {filteredQuestions.length}
            </span>
            <span className="text-sm font-semibold text-purple-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card scale-in mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`w-full p-6 rounded-2xl text-right font-semibold text-lg transition-all duration-300 transform hover:scale-102 ${
                  selectedOption?.id === option.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl scale-102'
                    : 'bg-gray-50 text-gray-800 hover:bg-gray-100 shadow-md hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="inline-block w-8 h-8 rounded-full bg-white bg-opacity-20 text-center leading-8 ml-4">
                  {String.fromCharCode(65 + index)}
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center fade-in">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className={`btn-secondary ${
              currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            قبلی
          </button>

          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 font-semibold transition-colors"
          >
            انصراف
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`btn-primary ${
              !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'مشاهده نتایج' : 'بعدی'}
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz

