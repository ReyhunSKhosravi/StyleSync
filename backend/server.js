import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { analyzePersonality, getStyleRecommendations } from './services/improvedPersonalityService.js';
import { questions } from './data/questions.js';
import { 
  analyzeTwitterProfile, 
  mergeTwitterAnalysisWithTest,
  generatePersonalizedTips,
  suggestBrandsBasedOnTwitter 
} from './services/twitterAnalysisService.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'سرور StyleSync در حال اجراست' });
});

// دریافت سوالات تست شخصیت
app.get('/api/questions', (req, res) => {
  res.json({ questions });
});

// نسخه قدیمی سوالات (برای backup)
const oldQuestions = [
    {
      id: 1,
      question: 'در مهمانی‌ها معمولاً چگونه رفتار می‌کنید؟',
      options: [
        { id: 'a', text: 'مرکز توجه هستم و با همه صحبت می‌کنم', traits: { extrovert: 2, confident: 2 } },
        { id: 'b', text: 'با گروه کوچکی از دوستان نزدیک وقت می‌گذرانم', traits: { introvert: 2, calm: 1 } },
        { id: 'c', text: 'ترجیح می‌دهم گوشه‌ای بنشینم و مشاهده کنم', traits: { introvert: 2, thoughtful: 2 } },
        { id: 'd', text: 'بین گروه‌های مختلف حرکت می‌کنم', traits: { extrovert: 1, social: 2 } }
      ]
    },
    {
      id: 2,
      question: 'وقتی می‌خواهید لباس بپوشید، چه چیزی برایتان مهم‌تر است؟',
      options: [
        { id: 'a', text: 'راحتی و آسودگی', traits: { casual: 2, practical: 2 } },
        { id: 'b', text: 'منحصر به فرد و متفاوت بودن', traits: { creative: 2, bold: 2 } },
        { id: 'c', text: 'شیک و رسمی بودن', traits: { elegant: 2, professional: 2 } },
        { id: 'd', text: 'ترکیب رنگ‌ها و هماهنگی', traits: { artistic: 2, balanced: 1 } }
      ]
    },
    {
      id: 3,
      question: 'در زندگی روزمره چه چیزی شما را تعریف می‌کند؟',
      options: [
        { id: 'a', text: 'ماجراجویی و تجربه‌های جدید', traits: { adventurous: 2, bold: 1 } },
        { id: 'b', text: 'سازماندهی و برنامه‌ریزی', traits: { organized: 2, professional: 1 } },
        { id: 'c', text: 'خلاقیت و هنر', traits: { creative: 2, artistic: 2 } },
        { id: 'd', text: 'آرامش و سادگی', traits: { calm: 2, minimalist: 2 } }
      ]
    },
    {
      id: 4,
      question: 'رنگ‌های مورد علاقه شما کدامند؟',
      options: [
        { id: 'a', text: 'رنگ‌های روشن و پررنگ (قرمز، آبی، زرد)', traits: { bold: 2, energetic: 2 } },
        { id: 'b', text: 'رنگ‌های خنثی (سفید، مشکی، خاکستری)', traits: { minimalist: 2, elegant: 1 } },
        { id: 'c', text: 'رنگ‌های پاستلی و ملایم', traits: { romantic: 2, calm: 1 } },
        { id: 'd', text: 'رنگ‌های گرم (قهوه‌ای، نارنجی، زرشکی)', traits: { warm: 2, natural: 1 } }
      ]
    },
    {
      id: 5,
      question: 'تعطیلات ایده‌آل شما چگونه است؟',
      options: [
        { id: 'a', text: 'سفر به شهرهای بزرگ و خرید', traits: { urban: 2, trendy: 2 } },
        { id: 'b', text: 'کوهنوردی و طبیعت‌گردی', traits: { natural: 2, casual: 1 } },
        { id: 'c', text: 'بازدید از موزه‌ها و گالری‌ها', traits: { artistic: 2, cultured: 2 } },
        { id: 'd', text: 'استراحت در خانه با کتاب و فیلم', traits: { introvert: 1, calm: 2 } }
      ]
    },
    {
      id: 6,
      question: 'در محیط کار چگونه لباس می‌پوشید؟',
      options: [
        { id: 'a', text: 'رسمی و حرفه‌ای', traits: { professional: 2, elegant: 2 } },
        { id: 'b', text: 'اسمارت کژوال', traits: { balanced: 2, modern: 1 } },
        { id: 'c', text: 'راحت و کژوال', traits: { casual: 2, practical: 1 } },
        { id: 'd', text: 'خلاقانه و منحصر به فرد', traits: { creative: 2, bold: 1 } }
      ]
    },
    {
      id: 7,
      question: 'کدام مورد شما را بیشتر توصیف می‌کند؟',
      options: [
        { id: 'a', text: 'دنبال‌کننده ترندهای مد', traits: { trendy: 2, modern: 2 } },
        { id: 'b', text: 'طرفدار استایل کلاسیک و بی‌زمان', traits: { classic: 2, elegant: 1 } },
        { id: 'c', text: 'خلق کننده استایل خودم', traits: { creative: 2, unique: 2 } },
        { id: 'd', text: 'ترجیح راحتی به زیبایی', traits: { practical: 2, casual: 1 } }
      ]
    },
    {
      id: 8,
      question: 'وقتی استرس دارید چه کاری انجام می‌دهید؟',
      options: [
        { id: 'a', text: 'با دوستان بیرون می‌روم', traits: { social: 2, extrovert: 1 } },
        { id: 'b', text: 'ورزش می‌کنم یا پیاده‌روی', traits: { active: 2, natural: 1 } },
        { id: 'c', text: 'کاری خلاقانه انجام می‌دهم', traits: { creative: 2, artistic: 1 } },
        { id: 'd', text: 'تنها می‌مانم و فکر می‌کنم', traits: { introvert: 2, thoughtful: 1 } }
      ]
    }
  ];

// تحلیل شخصیت و ارائه پیشنهادات (با تحلیل توییتر)
app.post('/api/analyze', async (req, res) => {
  try {
    const { answers, twitterUsername } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'پاسخ‌ها نامعتبر است' });
    }

    // تحلیل تست شخصیت
    let personality = analyzePersonality(answers);
    
    // اگر یوزرنیم توییتر داده شده، تحلیل توییتر
    let twitterAnalysis = null;
    let enhancedRecommendations = null;
    
    if (twitterUsername && twitterUsername.trim()) {
      console.log(`🐦 تحلیل توییتر برای: @${twitterUsername}`);
      
      try {
        twitterAnalysis = await analyzeTwitterProfile(twitterUsername);
        
        if (twitterAnalysis) {
          // ترکیب نتایج توییتر با تست
          personality = mergeTwitterAnalysisWithTest(personality, twitterAnalysis);
          
          // تولید نکات شخصی‌سازی شده
          const personalizedTips = generatePersonalizedTips(twitterAnalysis);
          const suggestedBrands = suggestBrandsBasedOnTwitter(twitterAnalysis);
          
          enhancedRecommendations = {
            personalizedTips,
            suggestedBrands,
            twitterKeywords: twitterAnalysis.keywords,
            styleIndicators: twitterAnalysis.styleIndicators
          };
        }
      } catch (twitterError) {
        console.error('خطا در تحلیل توییتر (ادامه با تحلیل تست):', twitterError);
        // اگر توییتر خطا داد، با تحلیل تست ادامه می‌دهیم
      }
    }

    const recommendations = getStyleRecommendations(personality);

    res.json({
      personality,
      recommendations,
      twitterEnhanced: !!twitterAnalysis,
      enhancedRecommendations
    });
  } catch (error) {
    console.error('Error analyzing personality:', error);
    res.status(500).json({ error: 'خطا در تحلیل شخصیت' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 سرور در حال اجرا بر روی پورت ${PORT}`);
});

