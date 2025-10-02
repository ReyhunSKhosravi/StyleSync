// سرویس واقعی تحلیل توییتر با اتصال به Twitter API

/**
 * نسخه واقعی: اتصال به Twitter API v2
 * 
 * 🔑 نیاز به:
 * 1. ثبت‌نام در https://developer.twitter.com
 * 2. ساخت App و دریافت Bearer Token
 * 3. نصب package: npm install axios
 */

import axios from 'axios';

// ⚠️ توجه: Bearer Token را در .env قرار دهید!
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN || '';

/**
 * دریافت واقعی توییت‌ها از Twitter API v2
 */
export async function fetchRealTweets(username) {
  if (!TWITTER_BEARER_TOKEN) {
    console.error('❌ TWITTER_BEARER_TOKEN تنظیم نشده است!');
    return null;
  }

  try {
    console.log(`🐦 در حال دریافت توییت‌های واقعی برای: @${username}`);

    // مرحله 1: دریافت User ID از username
    const userResponse = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!userResponse.data?.data?.id) {
      console.error('❌ کاربر پیدا نشد');
      return null;
    }

    const userId = userResponse.data.data.id;
    console.log(`✅ User ID پیدا شد: ${userId}`);

    // مرحله 2: دریافت توییت‌های کاربر
    const tweetsResponse = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets`,
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
        params: {
          'max_results': 50, // تا 100 توییت (free tier: تا 50)
          'tweet.fields': 'created_at,public_metrics,lang',
          'exclude': 'retweets,replies', // فقط توییت‌های اصلی
        },
      }
    );

    if (!tweetsResponse.data?.data) {
      console.error('❌ توییتی پیدا نشد');
      return null;
    }

    const tweets = tweetsResponse.data.data.map(tweet => tweet.text);
    console.log(`✅ ${tweets.length} توییت دریافت شد`);

    return tweets;

  } catch (error) {
    console.error('❌ خطا در دریافت توییت‌ها:', error.message);
    
    if (error.response?.status === 429) {
      console.error('⚠️ Rate limit reached! صبر کنید و دوباره تلاش کنید.');
    } else if (error.response?.status === 401) {
      console.error('⚠️ Authentication failed! Bearer Token را چک کنید.');
    }
    
    return null;
  }
}

/**
 * تحلیل کامل با Twitter API واقعی
 */
export async function analyzeRealTwitterProfile(username) {
  if (!username) {
    return null;
  }

  try {
    // دریافت توییت‌های واقعی
    const tweets = await fetchRealTweets(username);
    
    if (!tweets || tweets.length === 0) {
      console.log('⚠️ توییتی برای تحلیل یافت نشد');
      return null;
    }

    // تحلیل محتوا (همون تابع قبلی)
    const analysis = analyzeTweetContent(tweets);
    
    return {
      username,
      tweetCount: tweets.length,
      traits: analysis.traits,
      keywords: analysis.keywords,
      sentiment: analysis.sentiment,
      styleIndicators: analysis.styleIndicators,
      isReal: true, // نشان می‌دهد داده واقعی است
    };
  } catch (error) {
    console.error('Error analyzing real Twitter profile:', error);
    return null;
  }
}

/**
 * تحلیل محتوای توییت‌ها
 */
function analyzeTweetContent(tweets) {
  const allText = tweets.join(' ').toLowerCase();
  
  // دیکشنری کلمات کلیدی
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

  // شمارش تطابق‌ها
  const traits = {};
  Object.entries(traitKeywords).forEach(([trait, keywords]) => {
    const matches = keywords.filter(keyword => allText.includes(keyword)).length;
    if (matches > 0) {
      traits[trait] = matches * 2;
    }
  });

  // استخراج کلمات کلیدی
  const fashionKeywords = [
    'jacket', 'dress', 'jeans', 'shirt', 'sweater', 'shoes', 'boots',
    'bag', 'accessories', 'vintage', 'designer', 'brand', 'outfit',
    'style', 'fashion', 'look', 'wear', 'clothing', 'wardrobe'
  ];
  const keywords = fashionKeywords.filter(keyword => allText.includes(keyword));

  // تحلیل احساسات
  const positiveWords = [
    'love', 'amazing', 'perfect', 'beautiful', 'great', 'awesome',
    'fantastic', 'wonderful', 'excellent', 'obsessed', 'favorite'
  ];
  const negativeWords = [
    'hate', 'terrible', 'awful', 'boring', 'ugly', 'disappointed'
  ];

  const positiveCount = positiveWords.filter(word => allText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => allText.includes(word)).length;

  let sentiment = 'neutral';
  if (positiveCount > negativeCount * 2) {
    sentiment = 'positive';
  } else if (negativeCount > positiveCount) {
    sentiment = 'negative';
  }

  // شاخص‌های استایل
  const styleIndicators = {
    fashionForward: allText.includes('fashion') || allText.includes('runway'),
    artsy: allText.includes('art') || allText.includes('gallery'),
    comfortFocused: allText.includes('comfortable') || allText.includes('cozy'),
    brandConscious: allText.includes('designer') || allText.includes('brand'),
    vintageLover: allText.includes('vintage') || allText.includes('retro'),
    minimalApproach: allText.includes('minimal') || allText.includes('simple'),
    colorEnthusiast: allText.includes('colorful') || allText.includes('bright'),
    sustainabilityMinded: allText.includes('sustainable') || allText.includes('eco')
  };

  return { traits, keywords, sentiment, styleIndicators };
}

/**
 * دریافت اطلاعات پروفایل کاربر
 */
export async function getUserProfile(username) {
  if (!TWITTER_BEARER_TOKEN) {
    return null;
  }

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
        params: {
          'user.fields': 'description,public_metrics,profile_image_url',
        },
      }
    );

    if (response.data?.data) {
      const user = response.data.data;
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        description: user.description,
        followers: user.public_metrics.followers_count,
        following: user.public_metrics.following_count,
        profileImage: user.profile_image_url,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }
}

/**
 * بررسی وضعیت Rate Limit
 */
export async function checkRateLimit() {
  if (!TWITTER_BEARER_TOKEN) {
    return null;
  }

  try {
    const response = await axios.get(
      'https://api.twitter.com/2/tweets/search/recent',
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
        params: {
          'query': 'test',
          'max_results': 10,
        },
      }
    );

    const rateLimit = {
      limit: response.headers['x-rate-limit-limit'],
      remaining: response.headers['x-rate-limit-remaining'],
      reset: response.headers['x-rate-limit-reset'],
    };

    console.log('📊 Rate Limit Status:', rateLimit);
    return rateLimit;

  } catch (error) {
    console.error('Error checking rate limit:', error.message);
    return null;
  }
}

