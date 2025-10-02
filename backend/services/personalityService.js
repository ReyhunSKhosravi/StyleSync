// سرویس تحلیل شخصیت و پیشنهاد استایل

export function analyzePersonality(answers) {
  const traits = {};
  
  // جمع‌آوری تمام ویژگی‌های شخصیتی از پاسخ‌ها
  answers.forEach(answer => {
    if (answer.traits) {
      Object.entries(answer.traits).forEach(([trait, score]) => {
        traits[trait] = (traits[trait] || 0) + score;
      });
    }
  });

  // محاسبه ویژگی‌های برتر
  const sortedTraits = Object.entries(traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // تعیین تیپ شخصیتی اصلی
  const personalityType = determinePersonalityType(traits);

  return {
    type: personalityType.type,
    typeName: personalityType.name,
    description: personalityType.description,
    traits: sortedTraits.map(([name, score]) => ({
      name: getTraitPersianName(name),
      score
    })),
    rawTraits: traits
  };
}

function determinePersonalityType(traits) {
  const types = [
    {
      type: 'elegant_professional',
      name: 'شخصیت شیک و حرفه‌ای',
      description: 'شما فردی منظم، با سلیقه و حرفه‌ای هستید. استایل شما نشان‌دهنده اعتماد به نفس و قدرت است.',
      weights: { professional: 3, elegant: 3, organized: 2, classic: 2 }
    },
    {
      type: 'creative_artistic',
      name: 'شخصیت خلاق و هنری',
      description: 'شما روح هنرمندی دارید و دوست دارید با استایل خود خلاقیت‌تان را نشان دهید.',
      weights: { creative: 3, artistic: 3, unique: 2, bold: 2 }
    },
    {
      type: 'casual_comfortable',
      name: 'شخصیت راحت‌طلب و کژوال',
      description: 'برای شما راحتی و سادگی در اولویت است. استایل شما طبیعی و بدون تکلف است.',
      weights: { casual: 3, practical: 3, calm: 2, natural: 2 }
    },
    {
      type: 'bold_adventurous',
      name: 'شخصیت جسور و ماجراجو',
      description: 'شما فردی پرانرژی و جسور هستید که از برجسته بودن نمی‌ترسید.',
      weights: { bold: 3, adventurous: 2, energetic: 2, trendy: 2 }
    },
    {
      type: 'minimalist_calm',
      name: 'شخصیت مینیمال و آرام',
      description: 'شما سادگی و آرامش را دوست دارید. استایل شما شیک، ساده و بی‌زمان است.',
      weights: { minimalist: 3, calm: 3, elegant: 2, balanced: 2 }
    },
    {
      type: 'trendy_modern',
      name: 'شخصیت مدرن و مدگرا',
      description: 'شما همیشه از آخرین ترندهای مد مطلع هستید و دوست دارید استایل روز داشته باشید.',
      weights: { trendy: 3, modern: 3, urban: 2, social: 2 }
    },
    {
      type: 'romantic_soft',
      name: 'شخصیت رمانتیک و ملایم',
      description: 'شما شخصیتی ملایم و رمانتیک دارید. استایل شما نرم، زیبا و دلنشین است.',
      weights: { romantic: 3, calm: 2, artistic: 2, warm: 2 }
    }
  ];

  let bestMatch = types[0];
  let bestScore = 0;

  types.forEach(type => {
    let score = 0;
    Object.entries(type.weights).forEach(([trait, weight]) => {
      score += (traits[trait] || 0) * weight;
    });

    if (score > bestScore) {
      bestScore = score;
      bestMatch = type;
    }
  });

  return bestMatch;
}

export function getStyleRecommendations(personality) {
  const styleGuides = {
    elegant_professional: {
      colors: [
        { name: 'مشکی', hex: '#000000', description: 'رنگ قدرت و اعتماد به نفس' },
        { name: 'سفید', hex: '#FFFFFF', description: 'رنگ تمیزی و شیکی' },
        { name: 'سرمه‌ای', hex: '#1E3A8A', description: 'رنگ حرفه‌ای بودن' },
        { name: 'خاکستری', hex: '#6B7280', description: 'رنگ تعادل و خونسردی' }
      ],
      clothing: [
        { item: 'کت و شلوار رسمی', description: 'برای محیط کار و رویدادهای رسمی' },
        { item: 'پیراهن سفید کلاسیک', description: 'پایه‌ای برای هر استایل حرفه‌ای' },
        { item: 'مانتوی ساده و شیک', description: 'مناسب برای استایل روزمره' },
        { item: 'کفش رسمی چرم', description: 'تکمیل‌کننده ظاهر حرفه‌ای' }
      ],
      accessories: [
        'ساعت کلاسیک',
        'کیف دستی ساده',
        'عینک آفتابی مشکی',
        'گوشواره‌های ظریف'
      ],
      tips: [
        'روی کیفیت پارچه تمرکز کنید',
        'از رنگ‌های خنثی و کلاسیک استفاده کنید',
        'اکسسوری‌های ساده و شیک انتخاب کنید',
        'همیشه مرتب و اتو شده باشید'
      ]
    },
    creative_artistic: {
      colors: [
        { name: 'بنفش', hex: '#9333EA', description: 'رنگ خلاقیت و تخیل' },
        { name: 'فیروزه‌ای', hex: '#14B8A6', description: 'رنگ انرژی خلاق' },
        { name: 'زرد خردلی', hex: '#EAB308', description: 'رنگ شادی و هنر' },
        { name: 'نارنجی', hex: '#F97316', description: 'رنگ گرمی و انرژی' }
      ],
      clothing: [
        { item: 'لباس‌های پترن‌دار و منحصر به فرد', description: 'برای ابراز شخصیت' },
        { item: 'ژاکت رنگی', description: 'قطعه اصلی و برجسته' },
        { item: 'شلوار یا دامن با طرح', description: 'خاص و متفاوت' },
        { item: 'کفش‌های رنگارنگ', description: 'جذاب و هنری' }
      ],
      accessories: [
        'جواهرات دست‌ساز',
        'شال و روسری پترن‌دار',
        'کلاه آفتابی',
        'کیف با طرح منحصر به فرد'
      ],
      tips: [
        'از ترکیب رنگ‌های غیرمعمول نترسید',
        'قطعات هنری و دست‌ساز بپوشید',
        'لایه‌ها را به شیوه خلاقانه ترکیب کنید',
        'استایل خودتان را خلق کنید'
      ]
    },
    casual_comfortable: {
      colors: [
        { name: 'آبی روشن', hex: '#60A5FA', description: 'رنگ آرامش و راحتی' },
        { name: 'کرم', hex: '#FEF3C7', description: 'رنگ طبیعت و سادگی' },
        { name: 'خاکی', hex: '#92400E', description: 'رنگ گرما و صمیمیت' },
        { name: 'سبز زیتونی', hex: '#84CC16', description: 'رنگ طبیعت' }
      ],
      clothing: [
        { item: 'تی‌شرت ساده', description: 'پایه هر استایل کژوال' },
        { item: 'شلوار جین راحت', description: 'کاربردی و راحت' },
        { item: 'هودی یا سویشرت', description: 'گرم و دنج' },
        { item: 'کفش اسپرت', description: 'راحت برای تمام روز' }
      ],
      accessories: [
        'کوله‌پشتی',
        'کلاه کپ',
        'ساعت اسپرت',
        'عینک ساده'
      ],
      tips: [
        'روی راحتی تمرکز کنید',
        'پارچه‌های نرم و تنفسی انتخاب کنید',
        'استایل ساده اما شیک داشته باشید',
        'از لایه‌بندی استفاده کنید'
      ]
    },
    bold_adventurous: {
      colors: [
        { name: 'قرمز', hex: '#EF4444', description: 'رنگ قدرت و جسارت' },
        { name: 'مشکی براق', hex: '#000000', description: 'رنگ قدرت و اسرار' },
        { name: 'طلایی', hex: '#F59E0B', description: 'رنگ برجستگی' },
        { name: 'آبی الکتریک', hex: '#3B82F6', description: 'رنگ انرژی' }
      ],
      clothing: [
        { item: 'کت چرم', description: 'نماد جسارت و قدرت' },
        { item: 'لباس‌های رنگی برجسته', description: 'برای دیده شدن' },
        { item: 'شلوار اسکینی', description: 'مدرن و جذاب' },
        { item: 'بوت یا کفش برجسته', description: 'قوی و متفاوت' }
      ],
      accessories: [
        'زنجیر و دستبند قوی',
        'کمربند برجسته',
        'عینک آفتابی بزرگ',
        'کیف اسپرت'
      ],
      tips: [
        'از رنگ‌های پررنگ استفاده کنید',
        'ترکیب‌های جسورانه امتحان کنید',
        'قطعه محوری برجسته داشته باشید',
        'با اعتماد به نفس بپوشید'
      ]
    },
    minimalist_calm: {
      colors: [
        { name: 'سفید', hex: '#FFFFFF', description: 'رنگ خلوص و سادگی' },
        { name: 'مشکی', hex: '#000000', description: 'رنگ شیکی و مینیمال' },
        { name: 'خاکستری روشن', hex: '#E5E7EB', description: 'رنگ آرامش' },
        { name: 'بژ', hex: '#D6BCAB', description: 'رنگ گرمای ملایم' }
      ],
      clothing: [
        { item: 'پیراهن ساده تک‌رنگ', description: 'بنیاد کمد مینیمال' },
        { item: 'شلوار راست ساده', description: 'تمیز و شیک' },
        { item: 'مانتو یا کت بدون طرح', description: 'کلاسیک و بی‌زمان' },
        { item: 'کفش ساده اما باکیفیت', description: 'تکمیل کننده ظاهر مینیمال' }
      ],
      accessories: [
        'ساعت ساده با بند چرم',
        'کیف ساده و کوچک',
        'گوشواره‌های ریز',
        'شال ساده تک‌رنگ'
      ],
      tips: [
        'کیفیت به جای کمیت',
        'رنگ‌های خنثی انتخاب کنید',
        'خطوط ساده و تمیز',
        'کمتر، بهتر است'
      ]
    },
    trendy_modern: {
      colors: [
        { name: 'صورتی نئون', hex: '#EC4899', description: 'رنگ مد روز' },
        { name: 'سبز نئون', hex: '#10B981', description: 'رنگ تازگی' },
        { name: 'بنفش', hex: '#8B5CF6', description: 'رنگ مدرن' },
        { name: 'آبی آسمانی', hex: '#0EA5E9', description: 'رنگ جوانی' }
      ],
      clothing: [
        { item: 'لباس‌های ترند فصل', description: 'آخرین مدهای روز' },
        { item: 'اورسایز هودی', description: 'استایل استریت' },
        { item: 'شلوار کارگو یا وایدلگ', description: 'مد امسال' },
        { item: 'اسنیکرهای برند', description: 'ترندی و راحت' }
      ],
      accessories: [
        'کلاه باکت',
        'کیف کراس‌بادی',
        'ساعت هوشمند',
        'عینک‌های رنگی'
      ],
      tips: [
        'از اینستاگرام و مجلات مد الهام بگیرید',
        'با ترندهای جدید آزمایش کنید',
        'برندهای مد روز را دنبال کنید',
        'جسور باشید اما متعادل'
      ]
    },
    romantic_soft: {
      colors: [
        { name: 'صورتی پاستلی', hex: '#FCA5A5', description: 'رنگ عشق و ملایمت' },
        { name: 'لوندر', hex: '#C4B5FD', description: 'رنگ رمانتیک' },
        { name: 'کرم روشن', hex: '#FEF3C7', description: 'رنگ نرمی' },
        { name: 'آبی بیبی', hex: '#BFDBFE', description: 'رنگ آرامش' }
      ],
      clothing: [
        { item: 'پیراهن گلدار', description: 'زیبا و رمانتیک' },
        { item: 'بلوز تور یا دانتل', description: 'ظریف و زنانه' },
        { item: 'دامن بلند', description: 'نرم و زیبا' },
        { item: 'کفش با پاشنه کوتاه', description: 'زیبا و راحت' }
      ],
      accessories: [
        'گردنبند ظریف',
        'دستبند نازک',
        'گل سر یا گیره مو زیبا',
        'کیف کوچک پاستلی'
      ],
      tips: [
        'از رنگ‌های ملایم و پاستلی استفاده کنید',
        'پارچه‌های نرم و روان انتخاب کنید',
        'طرح‌های گل و زیبا بپوشید',
        'اکسسوری‌های ظریف و زنانه'
      ]
    }
  };

  const guide = styleGuides[personality.type] || styleGuides.casual_comfortable;

  return {
    ...guide,
    personalityType: personality.typeName,
    personalityDescription: personality.description
  };
}

function getTraitPersianName(trait) {
  const names = {
    extrovert: 'برون‌گرا',
    introvert: 'درون‌گرا',
    confident: 'با اعتماد به نفس',
    calm: 'آرام',
    thoughtful: 'متفکر',
    social: 'اجتماعی',
    casual: 'کژوال',
    practical: 'عملی',
    creative: 'خلاق',
    bold: 'جسور',
    elegant: 'شیک',
    professional: 'حرفه‌ای',
    artistic: 'هنری',
    balanced: 'متعادل',
    adventurous: 'ماجراجو',
    organized: 'منظم',
    minimalist: 'مینیمالیست',
    trendy: 'مدگرا',
    modern: 'مدرن',
    classic: 'کلاسیک',
    unique: 'منحصربه‌فرد',
    romantic: 'رمانتیک',
    warm: 'گرم',
    natural: 'طبیعی',
    urban: 'شهری',
    cultured: 'فرهیخته',
    energetic: 'پرانرژی',
    active: 'فعال'
  };
  
  return names[trait] || trait;
}

