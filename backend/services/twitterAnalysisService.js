// سرویس تحلیل توییتر برای شخصی‌سازی بیشتر

/**
 * تحلیل توییت‌های کاربر و استخراج ویژگی‌های شخصیتی
 */
export async function analyzeTwitterProfile(username) {
  if (!username) {
    return null;
  }

  try {
    // شبیه‌سازی دریافت توییت‌ها
    // در نسخه واقعی باید از Twitter API استفاده کنید
    const tweets = await fetchTweets(username);
    
    if (!tweets || tweets.length === 0) {
      return null;
    }

    // تحلیل محتوای توییت‌ها
    const analysis = analyzeTweetContent(tweets);
    
    return {
      username,
      tweetCount: tweets.length,
      traits: analysis.traits,
      keywords: analysis.keywords,
      sentiment: analysis.sentiment,
      styleIndicators: analysis.styleIndicators
    };
  } catch (error) {
    console.error('Error analyzing Twitter profile:', error);
    return null;
  }
}

/**
 * شبیه‌سازی دریافت توییت‌ها
 * در نسخه واقعی باید از Twitter API v2 استفاده شود
 */
async function fetchTweets(username) {
  // این یک شبیه‌سازی است
  // در پروداکشن باید از Twitter API استفاده کنید:
  // https://developer.twitter.com/en/docs/twitter-api
  
  console.log(`📱 در حال تحلیل پروفایل توییتر: @${username}`);
  
  // شبیه‌سازی توییت‌های نمونه بر اساس یوزرنیم
  return simulateTweets(username);
}

/**
 * شبیه‌سازی توییت‌ها برای تست
 */
function simulateTweets(username) {
  // در نسخه واقعی، این داده‌ها از Twitter API می‌آید
  const sampleTweets = [
    "Just got this amazing new jacket! Love the minimalist design 😍",
    "Coffee, laptop, and a cozy sweater. Perfect morning vibes ☕",
    "Fashion is about expressing yourself, not following trends",
    "Obsessed with these vintage jeans I found today! 👖",
    "Clean lines and neutral colors are my weakness",
    "Ready for the fashion show tonight! Bold and beautiful 💃",
    "Sometimes all you need is a classic white shirt",
    "Street style is the best style. Urban and edgy!",
    "Spent the day at the art gallery. So inspired! 🎨",
    "Comfortable doesn't mean boring. Casual chic all the way"
  ];
  
  return sampleTweets;
}

/**
 * تحلیل محتوای توییت‌ها
 */
function analyzeTweetContent(tweets) {
  const allText = tweets.join(' ').toLowerCase();
  
  // دیکشنری کلمات کلیدی برای هر ویژگی
  const traitKeywords = {
    minimalist: ['minimalist', 'clean', 'simple', 'minimal', 'neutral', 'white', 'black'],
    creative: ['creative', 'art', 'artistic', 'unique', 'different', 'design', 'inspired'],
    bold: ['bold', 'statement', 'bright', 'colorful', 'eye-catching', 'standout'],
    casual: ['casual', 'comfortable', 'cozy', 'relaxed', 'easy', 'sweater', 'jeans'],
    elegant: ['elegant', 'classic', 'sophisticated', 'chic', 'graceful', 'refined'],
    trendy: ['trendy', 'fashion', 'latest', 'new', 'trend', 'style', 'runway'],
    urban: ['urban', 'street', 'city', 'edgy', 'modern', 'contemporary'],
    romantic: ['romantic', 'soft', 'delicate', 'feminine', 'pretty', 'lovely'],
    professional: ['professional', 'work', 'business', 'office', 'formal', 'suit'],
    energetic: ['energetic', 'exciting', 'vibrant', 'dynamic', 'lively', 'fun']
  };

  // شمارش تطابق کلمات کلیدی
  const traits = {};
  Object.entries(traitKeywords).forEach(([trait, keywords]) => {
    const matches = keywords.filter(keyword => allText.includes(keyword)).length;
    if (matches > 0) {
      traits[trait] = matches * 2; // وزن بیشتر برای توییت‌ها
    }
  });

  // استخراج کلمات کلیدی مهم
  const keywords = extractKeywords(tweets);

  // تحلیل احساسات (ساده)
  const sentiment = analyzeSentiment(tweets);

  // شاخص‌های استایل
  const styleIndicators = detectStyleIndicators(tweets);

  return {
    traits,
    keywords,
    sentiment,
    styleIndicators
  };
}

/**
 * استخراج کلمات کلیدی
 */
function extractKeywords(tweets) {
  const allText = tweets.join(' ').toLowerCase();
  
  const fashionKeywords = [
    'jacket', 'dress', 'jeans', 'shirt', 'sweater', 'shoes', 'boots',
    'bag', 'accessories', 'vintage', 'designer', 'brand', 'outfit',
    'style', 'fashion', 'look', 'wear', 'clothing', 'wardrobe'
  ];

  return fashionKeywords.filter(keyword => allText.includes(keyword));
}

/**
 * تحلیل احساسات
 */
function analyzeSentiment(tweets) {
  const allText = tweets.join(' ').toLowerCase();
  
  const positiveWords = [
    'love', 'amazing', 'perfect', 'beautiful', 'great', 'awesome',
    'fantastic', 'wonderful', 'excellent', 'obsessed', 'favorite'
  ];
  
  const negativeWords = [
    'hate', 'terrible', 'awful', 'boring', 'ugly', 'disappointed'
  ];

  const positiveCount = positiveWords.filter(word => allText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => allText.includes(word)).length;

  if (positiveCount > negativeCount * 2) {
    return 'positive';
  } else if (negativeCount > positiveCount) {
    return 'negative';
  }
  return 'neutral';
}

/**
 * تشخیص شاخص‌های استایل
 */
function detectStyleIndicators(tweets) {
  const allText = tweets.join(' ').toLowerCase();
  
  const indicators = {
    fashionForward: allText.includes('fashion') || allText.includes('runway') || allText.includes('show'),
    artsy: allText.includes('art') || allText.includes('gallery') || allText.includes('museum'),
    comfortFocused: allText.includes('comfortable') || allText.includes('cozy') || allText.includes('relaxed'),
    brandConscious: allText.includes('designer') || allText.includes('brand') || allText.includes('luxury'),
    vintageLover: allText.includes('vintage') || allText.includes('retro') || allText.includes('classic'),
    minimalApproach: allText.includes('minimal') || allText.includes('simple') || allText.includes('clean'),
    colorEnthusiast: allText.includes('colorful') || allText.includes('bright') || allText.includes('vibrant'),
    sustainabilityMinded: allText.includes('sustainable') || allText.includes('eco') || allText.includes('ethical')
  };

  return indicators;
}

/**
 * ترکیب نتایج توییتر با تحلیل تست
 */
export function mergeTwitterAnalysisWithTest(testResults, twitterAnalysis) {
  if (!twitterAnalysis) {
    return testResults;
  }

  // افزودن traits از توییتر به نتایج تست
  const mergedTraits = { ...testResults.rawTraits };
  
  Object.entries(twitterAnalysis.traits).forEach(([trait, score]) => {
    mergedTraits[trait] = (mergedTraits[trait] || 0) + score;
  });

  // اضافه کردن اطلاعات توییتر
  return {
    ...testResults,
    rawTraits: mergedTraits,
    twitterInsights: {
      username: twitterAnalysis.username,
      keywords: twitterAnalysis.keywords,
      sentiment: twitterAnalysis.sentiment,
      styleIndicators: twitterAnalysis.styleIndicators,
      enhancedAnalysis: true
    }
  };
}

/**
 * تولید پیشنهادات شخصی‌سازی شده بر اساس توییتر
 */
export function generatePersonalizedTips(twitterInsights) {
  if (!twitterInsights) {
    return [];
  }

  const tips = [];
  const { keywords, styleIndicators } = twitterInsights;

  // نکات بر اساس کلمات کلیدی
  if (keywords.includes('vintage')) {
    tips.push('💎 با توجه به علاقه شما به vintage، فروشگاه‌های دست دوم و بازارهای قدیمی را بررسی کنید');
  }

  if (keywords.includes('designer') || keywords.includes('brand')) {
    tips.push('👜 شما به برندها توجه دارید - در outlet stores به دنبال تخفیف‌ها باشید');
  }

  // نکات بر اساس شاخص‌های استایل
  if (styleIndicators.artsy) {
    tips.push('🎨 روح هنری شما در توییت‌هایتان مشهود است - از گالری‌ها و نمایشگاه‌های هنری برای الهام استفاده کنید');
  }

  if (styleIndicators.comfortFocused) {
    tips.push('☁️ راحتی برای شما اولویت است - روی پارچه‌های طبیعی و breathable سرمایه‌گذاری کنید');
  }

  if (styleIndicators.minimalApproach) {
    tips.push('✨ سبک مینیمالیستی شما در توییت‌ها دیده می‌شود - capsule wardrobe برای شما ایده‌آل است');
  }

  if (styleIndicators.sustainabilityMinded) {
    tips.push('🌱 با توجه به اهمیت sustainability برای شما، برندهای اتیکال و eco-friendly را بررسی کنید');
  }

  return tips;
}

/**
 * تولید توصیه‌های برند بر اساس توییتر
 */
export function suggestBrandsBasedOnTwitter(twitterInsights) {
  if (!twitterInsights) {
    return [];
  }

  const brands = [];
  const { styleIndicators, keywords } = twitterInsights;

  if (styleIndicators.vintageLover) {
    brands.push({ name: 'فروشگاه‌های vintage محلی', reason: 'علاقه به قطعات vintage' });
  }

  if (styleIndicators.sustainabilityMinded) {
    brands.push({ name: 'Patagonia, Everlane', reason: 'توجه به پایداری' });
  }

  if (styleIndicators.minimalApproach) {
    brands.push({ name: 'COS, Arket, Uniqlo', reason: 'سبک مینیمال' });
  }

  if (styleIndicators.fashionForward) {
    brands.push({ name: 'Zara, H&M Trend', reason: 'دنبال کردن ترندها' });
  }

  return brands;
}

