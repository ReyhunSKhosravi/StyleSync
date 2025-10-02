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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitAnswers(newAnswers)
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

  const submitAnswers = async (finalAnswers) => {
    setSubmitting(true)
    try {
      const response = await axios.post('/api/analyze', { answers: finalAnswers })
      navigate('/results', { state: { data: response.data } })
    } catch (error) {
      console.error('Error submitting answers:', error)
      alert('خطا در تحلیل نتایج')
      setSubmitting(false)
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

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8 fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-purple-600">
              سوال {currentQuestion + 1} از {questions.length}
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

