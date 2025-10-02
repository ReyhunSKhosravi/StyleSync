// سوالات پیشرفته شخصیت‌شناسی برای تحلیل استایل

export const questions = [
  {
    id: 1,
    question: 'صبح‌ها وقتی از خواب بیدار می‌شوید، اولین حسی که دارید چیست؟',
    options: [
      { 
        id: 'a', 
        text: 'انرژی و آمادگی برای چالش‌های جدید', 
        traits: { energetic: 3, bold: 2, adventurous: 2 } 
      },
      { 
        id: 'b', 
        text: 'آرامش و تمایل به برنامه‌ریزی روز', 
        traits: { organized: 3, professional: 2, calm: 2 } 
      },
      { 
        id: 'c', 
        text: 'الهام و ایده‌های خلاقانه', 
        traits: { creative: 3, artistic: 2, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'نیاز به راحتی و آرامش بیشتر', 
        traits: { calm: 3, minimalist: 2, introvert: 2 } 
      }
    ]
  },
  {
    id: 2,
    question: 'وقتی وارد یک فروشگاه لباس می‌شوید، به چه چیزی بیشتر جذب می‌شوید؟',
    options: [
      { 
        id: 'a', 
        text: 'رنگ‌های پررنگ و طرح‌های جسورانه', 
        traits: { bold: 3, energetic: 2, trendy: 2, confident: 2 } 
      },
      { 
        id: 'b', 
        text: 'کیفیت پارچه و برش حرفه‌ای', 
        traits: { elegant: 3, professional: 3, classic: 2 } 
      },
      { 
        id: 'c', 
        text: 'قطعات منحصر به فرد و هنری', 
        traits: { creative: 3, artistic: 3, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'راحتی و سادگی در پوشیدن', 
        traits: { casual: 3, practical: 3, natural: 2 } 
      }
    ]
  },
  {
    id: 3,
    question: 'در یک رویداد اجتماعی مهم، چگونه دوست دارید دیده شوید؟',
    options: [
      { 
        id: 'a', 
        text: 'برجسته و متفاوت از بقیه', 
        traits: { bold: 3, confident: 3, unique: 2, extrovert: 2 } 
      },
      { 
        id: 'b', 
        text: 'شیک، مرتب و حرفه‌ای', 
        traits: { elegant: 3, professional: 3, organized: 2 } 
      },
      { 
        id: 'c', 
        text: 'خلاق و با سبک شخصی خاص', 
        traits: { creative: 3, artistic: 2, unique: 3 } 
      },
      { 
        id: 'd', 
        text: 'ساده، طبیعی و خودمانی', 
        traits: { minimalist: 3, calm: 2, natural: 2 } 
      }
    ]
  },
  {
    id: 4,
    question: 'کدام دسته از رنگ‌ها بیشتر شما را جذب می‌کند؟',
    options: [
      { 
        id: 'a', 
        text: 'قرمز، نارنجی، زرد طلایی - رنگ‌های گرم و پرانرژی', 
        traits: { energetic: 3, bold: 3, warm: 2, confident: 2 } 
      },
      { 
        id: 'b', 
        text: 'مشکی، سفید، سرمه‌ای - رنگ‌های کلاسیک و قدرتمند', 
        traits: { elegant: 3, professional: 3, classic: 3 } 
      },
      { 
        id: 'c', 
        text: 'بنفش، فیروزه‌ای، زرد خردلی - رنگ‌های غیرمعمول', 
        traits: { creative: 3, artistic: 3, unique: 3, bold: 2 } 
      },
      { 
        id: 'd', 
        text: 'بژ، خاکی، سبز زیتونی - رنگ‌های طبیعی و ملایم', 
        traits: { natural: 3, calm: 3, minimalist: 2, warm: 1 } 
      }
    ]
  },
  {
    id: 5,
    question: 'آخرین باری که خرید لباس کردید، چه چیزی شما را به خرید ترغیب کرد؟',
    options: [
      { 
        id: 'a', 
        text: 'یک قطعه خیره‌کننده که همه نگاهش می‌کنند', 
        traits: { bold: 3, confident: 3, trendy: 2, extrovert: 2 } 
      },
      { 
        id: 'b', 
        text: 'کیفیت عالی و مناسب برای محیط کار', 
        traits: { professional: 3, elegant: 2, organized: 2, practical: 2 } 
      },
      { 
        id: 'c', 
        text: 'طرح و دیزاین منحصر به فرد آن', 
        traits: { creative: 3, artistic: 3, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'راحتی و تطبیق با لباس‌های دیگرم', 
        traits: { practical: 3, casual: 3, minimalist: 2 } 
      }
    ]
  },
  {
    id: 6,
    question: 'اگر بخواهید کمد لباس خود را با یک کلمه توصیف کنید، کدام است؟',
    options: [
      { 
        id: 'a', 
        text: 'پرانرژی و رنگارنگ', 
        traits: { bold: 3, energetic: 3, trendy: 2 } 
      },
      { 
        id: 'b', 
        text: 'منظم و هماهنگ', 
        traits: { organized: 3, elegant: 3, classic: 2 } 
      },
      { 
        id: 'c', 
        text: 'متنوع و خلاقانه', 
        traits: { creative: 3, artistic: 2, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'ساده و کاربردی', 
        traits: { minimalist: 3, practical: 3, casual: 2 } 
      }
    ]
  },
  {
    id: 7,
    question: 'در مورد اکسسوری‌ها (جواهرات، کیف، کفش) نظر شما چیست؟',
    options: [
      { 
        id: 'a', 
        text: 'هرچه بیشتر و جسورانه‌تر، بهتر!', 
        traits: { bold: 3, confident: 2, extrovert: 2 } 
      },
      { 
        id: 'b', 
        text: 'انتخاب دقیق قطعات باکیفیت و کلاسیک', 
        traits: { elegant: 3, professional: 2, organized: 2 } 
      },
      { 
        id: 'c', 
        text: 'قطعات دست‌ساز و هنری', 
        traits: { artistic: 3, creative: 3, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'کمترین و ساده‌ترین ممکن', 
        traits: { minimalist: 3, calm: 2, practical: 2 } 
      }
    ]
  },
  {
    id: 8,
    question: 'چه حسی می‌خواهید استایل شما به دیگران منتقل کند؟',
    options: [
      { 
        id: 'a', 
        text: 'قدرت، اعتماد به نفس و جسارت', 
        traits: { bold: 3, confident: 3, energetic: 2 } 
      },
      { 
        id: 'b', 
        text: 'حرفه‌ای بودن، احترام و اعتماد', 
        traits: { professional: 3, elegant: 3, organized: 2 } 
      },
      { 
        id: 'c', 
        text: 'خلاقیت، هنر و منحصر به فرد بودن', 
        traits: { creative: 3, artistic: 3, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'آرامش، صداقت و سادگی', 
        traits: { calm: 3, natural: 2, minimalist: 3 } 
      }
    ]
  },
  {
    id: 9,
    question: 'در یک روز معمولی، کدام استایل را ترجیح می‌دهید؟',
    options: [
      { 
        id: 'a', 
        text: 'استایل استرییت مدرن و ترندی', 
        traits: { trendy: 3, modern: 3, urban: 2, bold: 1 } 
      },
      { 
        id: 'b', 
        text: 'استایل بیزینس کژوال شیک', 
        traits: { professional: 2, elegant: 3, balanced: 3 } 
      },
      { 
        id: 'c', 
        text: 'استایل بوهو یا هیپستر خلاقانه', 
        traits: { creative: 3, artistic: 3, unique: 2 } 
      },
      { 
        id: 'd', 
        text: 'استایل مینیمال و راحت', 
        traits: { minimalist: 3, casual: 3, practical: 2 } 
      }
    ]
  },
  {
    id: 10,
    question: 'وقتی به الگوهای مد و سلبریتی‌ها نگاه می‌کنید، کدام سبک شما را جذب می‌کند؟',
    options: [
      { 
        id: 'a', 
        text: 'سبک جسورانه ستاره‌های پاپ و رپ', 
        traits: { bold: 3, trendy: 3, confident: 2, energetic: 2 } 
      },
      { 
        id: 'b', 
        text: 'سبک کلاسیک و شیک بازیگران هالیوود', 
        traits: { elegant: 3, classic: 3, professional: 2 } 
      },
      { 
        id: 'c', 
        text: 'سبک هنری و متفاوت هنرمندان مستقل', 
        traits: { creative: 3, artistic: 3, unique: 3 } 
      },
      { 
        id: 'd', 
        text: 'سبک ساده و طبیعی اینفلوئنسرهای لایف‌استایل', 
        traits: { natural: 3, minimalist: 2, calm: 2, casual: 2 } 
      }
    ]
  }
];

