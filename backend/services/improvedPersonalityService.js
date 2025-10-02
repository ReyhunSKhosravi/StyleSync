// سرویس پیشرفته تحلیل شخصیت و پیشنهاد استایل

export function analyzePersonality(answers) {
  const traits = {};
  
  // جمع‌آوری تمام ویژگی‌های شخصیتی از پاسخ‌ها با وزن‌دهی
  answers.forEach((answer, index) => {
    if (answer.traits) {
      // سوالات اولیه وزن بیشتری دارند
      const questionWeight = 1 + (0.1 * (10 - index));
      
      Object.entries(answer.traits).forEach(([trait, score]) => {
        traits[trait] = (traits[trait] || 0) + (score * questionWeight);
      });
    }
  });

  // نرمال‌سازی امتیازها
  const maxScore = Math.max(...Object.values(traits));
  Object.keys(traits).forEach(trait => {
    traits[trait] = (traits[trait] / maxScore) * 100;
  });

  // محاسبه ویژگی‌های برتر
  const sortedTraits = Object.entries(traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  // تعیین تیپ شخصیتی اصلی با الگوریتم پیشرفته
  const personalityType = determinePersonalityType(traits);
  
  // تعیین تیپ شخصیتی ثانویه
  const secondaryType = determineSecondaryType(traits, personalityType.type);

  return {
    type: personalityType.type,
    typeName: personalityType.name,
    description: personalityType.description,
    secondaryType: secondaryType?.type,
    secondaryTypeName: secondaryType?.name,
    traits: sortedTraits.map(([name, score]) => ({
      name: getTraitPersianName(name),
      englishName: name,
      score: Math.round(score)
    })),
    rawTraits: traits,
    dominantTraits: getDominantTraits(traits)
  };
}

function determinePersonalityType(traits) {
  const types = [
    {
      type: 'elegant_professional',
      name: 'شخصیت شیک و حرفه‌ای',
      description: 'شما فردی منظم، با سلیقه و حرفه‌ای هستید. استایل شما نشان‌دهنده اعتماد به نفس، قدرت و احترام است. برای شما کیفیت و ظاهر حرفه‌ای بسیار مهم است.',
      weights: { 
        professional: 4, 
        elegant: 4, 
        organized: 3, 
        classic: 3,
        balanced: 2 
      }
    },
    {
      type: 'creative_artistic',
      name: 'شخصیت خلاق و هنری',
      description: 'شما روح هنرمندی دارید و دوست دارید با استایل خود خلاقیت و شخصیت منحصربه‌فردتان را نشان دهید. برای شما بیان خود از طریق پوشش بسیار مهم است.',
      weights: { 
        creative: 4, 
        artistic: 4, 
        unique: 3, 
        bold: 2,
        cultured: 2
      }
    },
    {
      type: 'casual_comfortable',
      name: 'شخصیت راحت‌طلب و کژوال',
      description: 'برای شما راحتی و سادگی در اولویت است. استایل شما طبیعی، بدون تکلف و کاربردی است. شما باور دارید که راحتی می‌تواند با استایل همراه باشد.',
      weights: { 
        casual: 4, 
        practical: 4, 
        natural: 3,
        calm: 2,
        minimalist: 2
      }
    },
    {
      type: 'bold_adventurous',
      name: 'شخصیت جسور و پرانرژی',
      description: 'شما فردی پرانرژی، جسور و خودآگاه هستید که از برجسته بودن نمی‌ترسید. استایل شما قدرتمند، جذاب و چشم‌نواز است.',
      weights: { 
        bold: 4, 
        energetic: 4,
        confident: 3, 
        adventurous: 2,
        extrovert: 2
      }
    },
    {
      type: 'minimalist_calm',
      name: 'شخصیت مینیمال و آرام',
      description: 'شما سادگی، آرامش و کیفیت را دوست دارید. استایل شما شیک، ساده، بی‌زمان و متفکرانه است. برای شما کمتر یعنی بهتر.',
      weights: { 
        minimalist: 4, 
        calm: 4, 
        elegant: 2,
        balanced: 3,
        thoughtful: 2
      }
    },
    {
      type: 'trendy_modern',
      name: 'شخصیت مدرن و مدگرا',
      description: 'شما همیشه از آخرین ترندهای مد مطلع هستید و دوست دارید استایل روز داشته باشید. برای شما به‌روز بودن و دنبال کردن جریان‌های جدید مد اهمیت دارد.',
      weights: { 
        trendy: 4, 
        modern: 4, 
        urban: 3,
        social: 2,
        confident: 2
      }
    },
    {
      type: 'romantic_soft',
      name: 'شخصیت رمانتیک و ملایم',
      description: 'شما شخصیتی ملایم، رمانتیک و زیباپسند دارید. استایل شما نرم، زیبا، دلنشین و پر از جزئیات ظریف است.',
      weights: { 
        romantic: 4,
        calm: 3, 
        artistic: 2,
        warm: 3,
        elegant: 2
      }
    },
    {
      type: 'urban_sporty',
      name: 'شخصیت شهری و اسپرت',
      description: 'شما فردی فعال، پویا و شهری هستید. استایل شما ترکیبی از راحتی، عملکرد و ظاهر مدرن است.',
      weights: { 
        urban: 4,
        active: 3,
        modern: 3,
        casual: 2,
        energetic: 2
      }
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

function determineSecondaryType(traits, primaryType) {
  // تعیین تیپ ثانویه که می‌تواند با تیپ اصلی ترکیب شود
  const secondaryTypes = {
    elegant_professional: ['minimalist_calm', 'classic'],
    creative_artistic: ['bold_adventurous', 'romantic_soft'],
    casual_comfortable: ['minimalist_calm', 'natural'],
    bold_adventurous: ['trendy_modern', 'urban_sporty'],
    minimalist_calm: ['elegant_professional', 'natural'],
    trendy_modern: ['bold_adventurous', 'urban_sporty'],
    romantic_soft: ['elegant_professional', 'artistic'],
    urban_sporty: ['trendy_modern', 'casual_comfortable']
  };

  // این فعلاً ساده است، می‌توان پیچیده‌تر کرد
  return null;
}

function getDominantTraits(traits) {
  const sorted = Object.entries(traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  
  return sorted.map(([name]) => name);
}

export function getStyleRecommendations(personality) {
  const styleGuides = {
    elegant_professional: {
      colors: [
        { 
          name: 'مشکی کلاسیک', 
          hex: '#000000', 
          description: 'رنگ قدرت، اعتماد به نفس و رسمیت',
          usage: 'مناسب برای کت، شلوار و مانتوهای رسمی'
        },
        { 
          name: 'سفید خالص', 
          hex: '#FFFFFF', 
          description: 'رنگ پاکی، تمیزی و حرفه‌ای بودن',
          usage: 'عالی برای پیراهن، بلوز و لایه‌های زیرین'
        },
        { 
          name: 'سرمه‌ای', 
          hex: '#1A237E', 
          description: 'رنگ اعتماد، استحکام و حرفه‌ای بودن',
          usage: 'ایده‌آل برای کت و شلوار اداری'
        },
        { 
          name: 'خاکستری متالیک', 
          hex: '#546E7A', 
          description: 'رنگ تعادل، خونسردی و شیکی',
          usage: 'عالی برای ترکیب با سایر رنگ‌ها'
        },
        {
          name: 'کرم نوبل',
          hex: '#F5F5DC',
          description: 'رنگ ظرافت و گرمای ملایم',
          usage: 'مناسب برای بلوز و پیراهن روزمره'
        }
      ],
      clothing: [
        { 
          item: 'کت تیلور به سبک کلاسیک', 
          description: 'برش حرفه‌ای با پارچه باکیفیت - پایه هر کمد لباس حرفه‌ای',
          brands: ['زارا بیزینس، مانگو سوئیت']
        },
        { 
          item: 'پیراهن سفید کلاسیک با یقه ایتالیایی', 
          description: 'اساسی‌ترین قطعه - باید چندین عدد داشته باشید',
          brands: ['مانگو، اچ‌اند‌ام پرمیوم']
        },
        { 
          item: 'شلوار پارچه‌ای راسته با برش عالی', 
          description: 'راحت اما رسمی - مناسب برای هر روز',
          brands: ['مسیمو دوتی، کوتون']
        },
        { 
          item: 'مانتوی ساده اما شیک با طراحی مینیمال', 
          description: 'کیفیت دوخت و پارچه مهم‌تر از تزئینات است',
          brands: ['برندهای ایرانی باکیفیت']
        },
        { 
          item: 'کفش پاشنه کوتاه چرم طبیعی', 
          description: 'راحت برای تمام روز، شیک برای هر موقعیت',
          brands: ['اکو، کلارکس']
        }
      ],
      accessories: [
        'ساعت کلاسیک با بند چرم یا فلزی - سرمایه‌گذاری روی یک ساعت باکیفیت',
        'کیف دستی ساختاریافته از چرم اصل - در رنگ‌های کلاسیک',
        'عینک آفتابی مشکی با فریم ساده - برند معتبر',
        'گوشواره‌های ظریف طلا یا نقره - نه خیلی بزرگ، نه خیلی کوچک',
        'روسری ابریشم ساده یا با طرح minimal',
        'کمربند چرم باکیفیت - تکمیل‌کننده ظاهر حرفه‌ای'
      ],
      tips: [
        '✓ در کیفیت پارچه سرمایه‌گذاری کنید - یک قطعه باکیفیت بهتر از ده قطعه معمولی است',
        '✓ رنگ‌های خنثی و کلاسیک را پایه کمد لباس خود قرار دهید',
        '✓ توجه به جزئیات: همیشه مرتب، اتو شده و تمیز باشید',
        '✓ اکسسوری‌های ساده اما باکیفیت انتخاب کنید - کمتر اما بهتر',
        '✓ سرمایه‌گذاری روی یک کت خوب ارزشش را دارد',
        '✓ از طرح‌های خیلی شلوغ اجتناب کنید - سادگی شیک است'
      ],
      styleIcons: ['Victoria Beckham', 'Meghan Markle', 'Amal Clooney'],
      colorPalette: 'مونوکروم با لمسی از رنگ‌های خنثی',
      fabricTypes: ['پشم مرینو', 'ابریشم', 'کتان', 'پنبه اجرت'],
      occasions: {
        work: 'کت و شلوار + پیراهن + کفش رسمی',
        casual: 'شلوار کتان + بلوز ساده + کفش لوفر',
        formal: 'لباس ساده با برش عالی + اکسسوری minimal'
      }
    },
    
    creative_artistic: {
      colors: [
        { 
          name: 'بنفش آمیتیست', 
          hex: '#9C27B0', 
          description: 'رنگ خلاقیت، تخیل و معنویت',
          usage: 'جذاب برای قطعات برجسته و اکسسوری'
        },
        { 
          name: 'فیروزه‌ای', 
          hex: '#00BCD4', 
          description: 'رنگ انرژی خلاق و الهام',
          usage: 'عالی برای لایه‌های بیرونی'
        },
        { 
          name: 'زرد خردلی', 
          hex: '#F9A825', 
          description: 'رنگ شادی، هنر و جسارت',
          usage: 'قطعه محوری در استایل'
        },
        { 
          name: 'نارنجی مرجانی', 
          hex: '#FF5722', 
          description: 'رنگ گرمی، انرژی و حس هنری',
          usage: 'برای لباس‌های تابستانی و شادی'
        },
        {
          name: 'سبز زمردی',
          hex: '#009688',
          description: 'رنگ طبیعت و هنر',
          usage: 'ترکیب عالی با زمین‌ی‌ها'
        }
      ],
      clothing: [
        { 
          item: 'ژاکت کیمونو یا کاردیگان با طرح هنری', 
          description: 'قطعه اصلی که شخصیت شما را نشان می‌دهد',
          brands: ['Desigual، Free People']
        },
        { 
          item: 'شلوار یا دامن با پرینت منحصربه‌فرد', 
          description: 'طرح‌های هندسی، گل‌دار یا اتنیک',
          brands: ['Zara Studio، Bershka']
        },
        { 
          item: 'بلوز با حجم و برش خاص', 
          description: 'شکل‌های غیرمعمول و جالب',
          brands: ['COS، & Other Stories']
        },
        { 
          item: 'کفش‌های رنگی یا با طرح', 
          description: 'نقطه شروع مکالمه!',
          brands: ['Camper، Dr. Martens']
        },
        { 
          item: 'مانتو با دیزاین خاص', 
          description: 'برش‌های آویزان، رنگ‌های ترکیبی',
          brands: ['برندهای ایرانی هنری']
        }
      ],
      accessories: [
        'جواهرات دست‌ساز و اتنیک - حتماً یک داستان داشته باشند',
        'شال و روسری با طرح‌های هنری یا پترن منحصربه‌فرد',
        'کلاه - از کلاه لبه‌دار تا کلاه بافتنی',
        'کیف با طرح خاص یا دست‌دوز',
        'گردنبندهای لایه‌ای با آویزهای مختلف',
        'انگشتر‌های statement و دستبندهای چند لایه'
      ],
      tips: [
        '✓ از ترکیب پترن‌های مختلف نترسید - قوانین را بشکنید!',
        '✓ به حمایت از هنرمندان مستقل فکر کنید - قطعات دست‌ساز منحصربه‌فردند',
        '✓ لایه‌ها را به شیوه خلاقانه ترکیب کنید - depth ایجاد کنید',
        '✓ استایل خودتان را خلق کنید - الهام بگیرید اما کپی نکنید',
        '✓ رنگ‌های غیرمنتظره را با هم ترکیب کنید',
        '✓ از vintage shopping لذت ببرید - قطعات یکتا پیدا کنید'
      ],
      styleIcons: ['Frida Kahlo', 'Iris Apfel', 'Zoe Kravitz'],
      colorPalette: 'رنگارنگ و غیرمتعارف',
      fabricTypes: ['ابریشم، پنبه اورگانیک، کتان، مخمل'],
      occasions: {
        work: 'پترن mixing با یک قطعه neutral',
        casual: 'آزادی کامل در ترکیب رنگ و طرح',
        formal: 'یک قطعه statement با accessories جذاب'
      }
    },

    casual_comfortable: {
      colors: [
        { 
          name: 'آبی دنیم', 
          hex: '#4A90E2', 
          description: 'رنگ آرامش، راحتی و روزمرگی',
          usage: 'پایه هر استایل کژوال'
        },
        { 
          name: 'کرم نرم', 
          hex: '#F5E6D3', 
          description: 'رنگ طبیعت، سادگی و گرمی',
          usage: 'عالی برای تی‌شرت و بافت'
        },
        { 
          name: 'خاکی زیتونی', 
          hex: '#6B8E23', 
          description: 'رنگ زمین و صمیمیت',
          usage: 'ژاکت و شلوار'
        },
        { 
          name: 'خاکستری ملانژ', 
          hex: '#95A5A6', 
          description: 'خنثی و کاربردی',
          usage: 'هودی و سوئیشرت'
        },
        {
          name: 'سفید شکسته',
          hex: '#FAFAFA',
          description: 'ساده و تمیز',
          usage: 'برای همه چیز!'
        }
      ],
      clothing: [
        { 
          item: 'تی‌شرت پنبه‌ای باکیفیت - سفید و مشکی', 
          description: 'پایه هر کمد لباس کژوال - 5-6 عدد داشته باشید',
          brands: ['Uniqlo، Gap، COS']
        },
        { 
          item: 'شلوار جین perfect fit', 
          description: 'بدون پارگی یا خیلی تنگ - راحت و شیک',
          brands: ['Levi\'s، Wrangler، Lee']
        },
        { 
          item: 'هودی یا سویشرت خوب', 
          description: 'نه خیلی شل، نه خیلی تنگ - دنج و گرم',
          brands: ['Nike، Adidas، Uniqlo']
        },
        { 
          item: 'کفش اسنیکر راحت', 
          description: 'سفید یا مشکی - با همه چیز ست می‌شود',
          brands: ['Adidas Stan Smith، Nike Air Force']
        },
        { 
          item: 'ژاکت دنیم یا بمبر', 
          description: 'لایه سوم ایده‌آل',
          brands: ['Levi\'s، H&M، Zara']
        }
      ],
      accessories: [
        'کوله‌پشتی ساده و کاربردی - جا برای لپ‌تاپ داشته باشد',
        'کلاه کپ ساده - برای روزهای بد موها',
        'ساعت اسپرت یا هوشمند - عملکرد مهم‌تر از زیبایی',
        'عینک آفتابی wayfarer - کلاسیک و راحت',
        'کیف crossbody کوچک - برای وسایل ضروری',
        'جوراب‌های رنگی - برای شخصیت دادن!'
      ],
      tips: [
        '✓ روی راحتی هرگز سازش نکنید - راحتی = اعتماد به نفس',
        '✓ در تی‌شرت و جین خوب سرمایه‌گذاری کنید',
        '✓ پارچه‌های نرم و تنفسی انتخاب کنید - پنبه و کتان',
        '✓ استایل ساده اما مرتب - casual ≠ shloppy',
        '✓ از لایه‌بندی استفاده کنید - تی‌شرت + هودی + ژاکت',
        '✓ همیشه یک کفش extra راحت در ماشین داشته باشید'
      ],
      styleIcons: ['Ryan Gosling', 'Emma Stone (casual)', 'Kendall Jenner (off-duty)'],
      colorPalette: 'خنثی با لمساتی از آبی و سبز',
      fabricTypes: ['پنبه اورگانیک، دنیم، کتان، ژرسی'],
      occasions: {
        work: 'smart casual - جین + پیراهن + کفش تمیز',
        casual: 'تی‌شرت + جین + اسنیکر',
        formal: 'chino + پیراهن + لوفر'
      }
    },

    bold_adventurous: {
      colors: [
        { 
          name: 'قرمز آتشین', 
          hex: '#D32F2F', 
          description: 'رنگ قدرت، جسارت و اشتیاق',
          usage: 'قطعه statement'
        },
        { 
          name: 'مشکی براق', 
          hex: '#000000', 
          description: 'قدرت، رمز و راز و جذابیت',
          usage: 'پایه + چرم'
        },
        { 
          name: 'طلایی متالیک', 
          hex: '#FFD700', 
          description: 'لوکس، برجسته و جذاب',
          usage: 'اکسسوری و جزئیات'
        },
        { 
          name: 'آبی کبالت', 
          hex: '#0D47A1', 
          description: 'قدرتمند و جذب‌کننده',
          usage: 'قطعه رویی'
        },
        {
          name: 'سفید پلاتینیوم',
          hex: '#F5F5F5',
          description: 'کنتراست و تمیزی',
          usage: 'برای باز کردن استایل'
        }
      ],
      clothing: [
        { 
          item: 'کت چرم یا فو-لدر', 
          description: 'نماد جسارت - سیاه یا قهوه‌ای تیره',
          brands: ['AllSaints، Zara TRF']
        },
        { 
          item: 'لباس رنگ statement', 
          description: 'قرمز، کبالت، یا پترن جسورانه',
          brands: ['H&M Trend، Bershka']
        },
        { 
          item: 'شلوار چرم یا Vinyl', 
          description: 'برای جلب توجه',
          brands: ['Zara، Mango']
        },
        { 
          item: 'بوت یا کفش پلتفرم', 
          description: 'ارتفاع و قدرت',
          brands: ['Steve Madden، Aldo']
        },
        { 
          item: 'تاپ متالیک یا sequin', 
          description: 'برای شب‌ها',
          brands: ['Pretty Little Thing، ASOS']
        }
      ],
      accessories: [
        'جواهرات chunky و statement - زنجیر، دستبند پهن',
        'کمربند پهن یا با مهره‌های فلزی',
        'عینک آفتابی oversized یا cat-eye',
        'کیف crossbody با زنجیر - کوچک اما جذاب',
        'انگشترهای بزرگ و چند عدد با هم',
        'بوت‌های زانو‌بلند یا چلسی'
      ],
      tips: [
        '✓ یک قطعه statement در هر outfit کافیست',
        '✓ با رنگ‌های پررنگ و جسورانه راحت باشید',
        '✓ چرم و مخمل دوستان شما هستند',
        '✓ لایه‌ها باید کنتراست ایجاد کنند',
        '✓ اعتماد به نفس مهم‌ترین اکسسوری شماست',
        '✓ قوانین را بشکنید - شب با کفش بوت هم می‌شود رفت!'
      ],
      styleIcons: ['Rihanna', 'Bella Hadid', 'Lady Gaga'],
      colorPalette: 'پررنگ با کنتراست بالا',
      fabricTypes: ['چرم، مخمل، ساتن، sequin'],
      occasions: {
        work: 'تعادل - یک قطعه bold + بقیه neutral',
        casual: 'جین مشکی + چرم + بوت',
        formal: 'لباس قرمز + کفش پاشنه + clutch طلایی'
      }
    },

    minimalist_calm: {
      colors: [
        { 
          name: 'سفید برفی', 
          hex: '#FFFFFF', 
          description: 'رنگ خلوص، سادگی و آرامش',
          usage: '60% کمد شما'
        },
        { 
          name: 'مشکی مات', 
          hex: '#212121', 
          description: 'شیکی، تایم‌لس و قدرت',
          usage: '20% کمد شما'
        },
        { 
          name: 'خاکستری نقره‌ای', 
          hex: '#ECEFF1', 
          description: 'آرامش و تعادل',
          usage: 'لایه‌های میانی'
        },
        { 
          name: 'بژ شنی', 
          hex: '#C5B299', 
          description: 'گرمای ملایم و طبیعی',
          usage: 'برای نرم کردن'
        },
        {
          name: 'کرم استخوانی',
          hex: '#F5F5DC',
          description: 'نرم و دلپذیر',
          usage: 'جایگزین سفید'
        }
      ],
      clothing: [
        { 
          item: 'پیراهن سفید perfect fit', 
          description: 'سرمایه‌گذاری در یکی باکیفیت - پایه کمد',
          brands: ['COS، Everlane، Uniqlo']
        },
        { 
          item: 'شلوار راست مشکی یا بژ', 
          description: 'برش ساده، پارچه خوب',
          brands: ['COS، & Other Stories']
        },
        { 
          item: 'کت بدون یقه یا cardigan', 
          description: 'لایه سوم ایده‌آل',
          brands: ['COS، Arket']
        },
        { 
          item: 'کفش loafer یا اسنیکر سفید', 
          description: 'ساده، تمیز، بدون لوگو',
          brands: ['Common Projects، Veja']
        },
        { 
          item: 'مانتو اورسایز ساده', 
          description: 'بدون دکمه یا زیپ - شال بی‌آستین',
          brands: ['برندهای ایرانی minimal']
        }
      ],
      accessories: [
        'ساعت minimalist - صفحه ساده، بند چرم یا mesh',
        'کیف ساده tote یا structured bag - بدون لوگو',
        'گوشواره‌های stud طلا یا نقره - خیلی ریز',
        'شال ابریشم ساده تک‌رنگ',
        'عینک گرد minimal - فریم نازک',
        'دستبند نازک طلا یا نقره - فقط یکی'
      ],
      tips: [
        '✓ کیفیت بی‌نهایت مهم‌تر از کمیت است',
        '✓ capsule wardrobe بسازید - هر چیز با هر چیز ست شود',
        '✓ در قطعات بی‌زمان سرمایه‌گذاری کنید',
        '✓ خطوط ساده و برش‌های تمیز',
        '✓ رنگ‌های خنثی را پایه قرار دهید',
        '✓ کمتر، اما بهتر - کمد کوچک، انتخاب آسان'
      ],
      styleIcons: ['Phoebe Philo', 'Gwyneth Paltrow', 'Japanese minimalism'],
      colorPalette: 'مونوکروم با neutral tones',
      fabricTypes: ['کتان، پشم مرینو، کشمیر، پنبه مصری'],
      occasions: {
        work: 'سفید + مشکی + بژ',
        casual: 'تی‌شرت سفید + جین + کت',
        formal: 'لباس ساده برش دار در رنگ neutral'
      }
    },

    trendy_modern: {
      colors: [
        { 
          name: 'نئون سبز', 
          hex: '#76FF03', 
          description: 'ترند، جوان و پرانرژی',
          usage: 'اکسسوری و لمسات'
        },
        { 
          name: 'لیلک پاستل', 
          hex: '#E1BEE7', 
          description: 'نرم اما ترندی',
          usage: 'قطعه اصلی'
        },
        { 
          name: 'آبی اینستاگرام', 
          hex: '#00B0FF', 
          description: 'تازه و modern',
          usage: 'دنیم و کژوال'
        },
        { 
          name: 'کرم vanilla', 
          hex: '#FFF8E1', 
          description: 'پایه trendy',
          usage: 'base layer'
        },
        {
          name: 'نارنجی کورال',
          hex: '#FF7043',
          description: 'گرم و لطیف',
          usage: 'تابستان'
        }
      ],
      clothing: [
        { 
          item: 'oversized hoodie', 
          description: 'استایل استریت - رنگ ترند فصل',
          brands: ['H&M Divided، Pull&Bear']
        },
        { 
          item: 'cargo pants یا wide-leg jeans', 
          description: 'مد امسال - راحت و شیک',
          brands: ['Bershka، Stradivarius']
        },
        { 
          item: 'crop top یا bralette', 
          description: 'لایه‌ای کردن',
          brands: ['Zara TRF، Urban Outfitters']
        },
        { 
          item: 'پفر jacket یا windbreaker', 
          description: 'اسپرت و ترندی',
          brands: ['Nike، The North Face']
        },
        { 
          item: 'اسنیکر chunky', 
          description: 'ugly shoes که trendy هستند',
          brands: ['Fila، Balenciaga-inspired']
        }
      ],
      accessories: [
        'کلاه bucket - must have هر فصل',
        'کیف crossbody کوچک - micro bag',
        'ساعت هوشمند یا digital',
        'عینک رنگی - لنز gradient',
        'جوراب بالا یا knee-high socks',
        'hair clips و scrunchies رنگی'
      ],
      tips: [
        '✓ اینستاگرام و تیک‌تاک را برای ترندها دنبال کنید',
        '✓ با fast fashion آشنا باشید - اما هوشمندانه خرید کنید',
        '✓ استایل K-pop و streetwear را مطالعه کنید',
        '✓ layering و oversizing مهارت‌های کلیدی هستند',
        '✓ جسور باشید اما authentic بمانید',
        '✓ ترند را بفهمید، سپس به سبک خودتان تطبیق دهید'
      ],
      styleIcons: ['Jennie Kim', 'Hailey Bieber', 'Olivia Rodrigo'],
      colorPalette: 'ترندهای فصلی + پاستل',
      fabricTypes: ['polyester، tech fabric، denim stretch'],
      occasions: {
        work: 'tone down - oversized blazer + jeans',
        casual: 'oversized everything + chunky sneakers',
        formal: 'mini dress + blazer + boots'
      }
    },

    romantic_soft: {
      colors: [
        { 
          name: 'صورتی رز', 
          hex: '#F8BBD0', 
          description: 'عشق، ملایمت و رمانتیک',
          usage: 'قطعه اصلی'
        },
        { 
          name: 'لاوندر', 
          hex: '#E1BEE7', 
          description: 'زیبا و رویایی',
          usage: 'لایه‌ها'
        },
        { 
          name: 'کرم شیری', 
          hex: '#FFF9C4', 
          description: 'گرم و نرم',
          usage: 'base'
        },
        { 
          name: 'آبی baby', 
          hex: '#BBDEFB', 
          description: 'آرام و دوست‌داشتنی',
          usage: 'جزئیات'
        },
        {
          name: 'سفید لؤلؤیی',
          hex: '#FFFFF0',
          description: 'ظریف و نرم',
          usage: 'همه جا'
        }
      ],
      clothing: [
        { 
          item: 'بلوز گلدار flowy', 
          description: 'دامن باد کرده - زیبا و زنانه',
          brands: ['Mango، Zara']
        },
        { 
          item: 'دامن midi پلیسه', 
          description: 'حرکت نرم - رمانتیک',
          brands: ['H&M، Mango']
        },
        { 
          item: 'کاردیگان یا cardigan ظریف', 
          description: 'نرم و دوست‌داشتنی',
          brands: ['Zara Knitwear']
        },
        { 
          item: 'لباس midi با طرح گل', 
          description: 'برای مناسبت‌ها',
          brands: ['& Other Stories']
        },
        { 
          item: 'کفش مری جین یا بالرینا', 
          description: 'ظریف و راحت',
          brands: ['Zara، Aldo']
        }
      ],
      accessories: [
        'گردنبند ظریف با آویز قلب یا گل',
        'دستبند‌های نازک - stack کردن',
        'گیره‌های مو با پروانه یا گل',
        'کیف کوچک rounded - رنگ پاستلی',
        'شال ابریشمی با طرح گل',
        'گوشواره drop با مروارید یا کریستال'
      ],
      tips: [
        '✓ پارچه‌های نرم و روان - شیفون، ساتن، تول',
        '✓ طرح‌های گل و نقش‌های ظریف',
        '✓ جزئیات دانتل و حاشیه',
        '✓ آستین‌های puff و یقه‌های peter pan',
        '✓ رنگ‌های پاستلی و نرم',
        '✓ لایه‌های شفاف و ethereal'
      ],
      styleIcons: ['Taylor Swift', 'Elle Fanning', 'Audrey Hepburn'],
      colorPalette: 'پاستل با لمساتی از سفید',
      fabricTypes: ['شیفون، ساتن، تول، دانتل، کشمیر نرم'],
      occasions: {
        work: 'بلوز پاستلی + شلوار ساده',
        casual: 'دامن گلدار + cardigan',
        formal: 'لباس midi با کمربند ظریف'
      }
    },

    urban_sporty: {
      colors: [
        { 
          name: 'مشکی تکنیکال', 
          hex: '#1A1A1A', 
          description: 'پایه استایل اسپرت',
          usage: 'همه جا'
        },
        { 
          name: 'سفید کریسپ', 
          hex: '#FAFAFA', 
          description: 'تمیز و اسپرت',
          usage: 'کنتراست'
        },
        { 
          name: 'خاکستری متالیک', 
          hex: '#757575', 
          description: 'modern و تکنیکال',
          usage: 'لایه میانی'
        },
        { 
          name: 'نئون زرد', 
          hex: '#FFFF00', 
          description: 'انرژی و هیجان',
          usage: 'لمسات'
        },
        {
          name: 'آبی الکتریک',
          hex: '#00E5FF',
          description: 'پرانرژی',
          usage: 'جزئیات'
        }
      ],
      clothing: [
        { 
          item: 'تراک پنت یا joggers', 
          description: 'راحت برای شهر',
          brands: ['Nike، Adidas']
        },
        { 
          item: 'tech jacket windbreaker', 
          description: 'عملکردی و شیک',
          brands: ['The North Face، Uniqlo']
        },
        { 
          item: 'تی‌شرت performance', 
          description: 'تنفس‌پذیر و سبک',
          brands: ['Nike Dri-FIT، Under Armour']
        },
        { 
          item: 'لگینگ high-waist', 
          description: 'برای ورزش و casual',
          brands: ['Lululemon، Gymshark']
        },
        { 
          item: 'اسنیکر running', 
          description: 'راحت و مد روز',
          brands: ['Nike، New Balance']
        }
      ],
      accessories: [
        'کوله پشتی تکنیکال - ضد آب',
        'ساعت ورزشی یا smart watch',
        'کپ یا beanie',
        'کیف کمری یا chest bag',
        'جوراب compression',
        'عینک اسپرت'
      ],
      tips: [
        '✓ پارچه‌های تکنیکال - breathable و moisture-wicking',
        '✓ fit مهم است - نه خیلی شل، نه تنگ',
        '✓ layering برای functionality',
        '✓ investment در کفش خوب',
        '✓ neutral palette با accent color',
        '✓ از ورزش به خیابان - athleisure'
      ],
      styleIcons: ['LeBron James', 'Serena Williams off-court', 'Travis Scott'],
      colorPalette: 'مشکی-سفید با نئون',
      fabricTypes: ['polyester، nylon، mesh، spandex'],
      occasions: {
        work: 'joggers + turtleneck + blazer',
        casual: 'track pants + hoodie + sneakers',
        formal: 'dark joggers + button-up + leather sneakers'
      }
    }
  };

  const guide = styleGuides[personality.type] || styleGuides.casual_comfortable;

  // اضافه کردن cross-recommendations بر اساس ویژگی ثانویه
  if (personality.secondaryType && styleGuides[personality.secondaryType]) {
    const secondaryGuide = styleGuides[personality.secondaryType];
    guide.secondaryRecommendations = {
      colors: secondaryGuide.colors.slice(0, 2),
      items: secondaryGuide.clothing.slice(0, 2)
    };
  }

  return {
    ...guide,
    personalityType: personality.typeName,
    personalityDescription: personality.description,
    dominantTraits: personality.dominantTraits
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

