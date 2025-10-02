// سرویس تولید/دریافت تصاویر استایل
// اگر کلید API موجود نباشد، از تصاویر Unsplash به عنوان جایگزین استفاده می‌کنیم

import https from 'https'

function buildPrompt(personality, gender) {
  const name = personality?.name || 'استایل شخصی'
  const palette = personality?.colors?.name || 'پالت رنگ مناسب'
  const vibe = personality?.description?.slice(0, 120) || 'استایل شیک و مدرن'
  const genderFa = gender === 'male' ? 'مردانه' : 'زنانه'

  return `A premium ${genderFa} fashion editorial photo, ${name}, ${palette}, clean studio lighting, Vogue quality, soft shadows, f/1.8, 85mm, detailed fabrics, cinematic, minimal background`
}

function buildFallbackUnsplash(personality, gender) {
  const base = 'https://images.unsplash.com/photo-'
  // چند شناسه امن و باکیفیت (fashion editorial)
  const femaleIds = [
    '1520975922203-b88622243563', // fashion portrait
    '1490481651871-ab68de25d43d',
    '1519741497674-611481863552',
    '1516826957135-700dedea6985'
  ]
  const maleIds = [
    '1520975922203-b88622243563',
    '1537832816519-689ad163238b',
    '1503341455253-b2e723bb3dbb',
    '1515886657613-9f3515b0c78f'
  ]
  const ids = gender === 'male' ? maleIds : femaleIds
  // پارامترهای کیفیت
  const params = '?auto=format&fit=crop&w=1400&q=90'
  return ids.map(id => ({
    url: `${base}${id}${params}`,
    alt: personality?.name || 'fashion image'
  }))
}

export async function generateStyleImages(personality, gender = 'female', count = 4) {
  try {
    const provider = process.env.IMAGE_PROVIDER || ''
    const openaiKey = process.env.OPENAI_API_KEY || ''
    const prompt = buildPrompt(personality, gender)

    if (provider.toLowerCase() === 'openai' && openaiKey) {
      // فراخوانی ساده API تصاویر OpenAI (Stable URL pattern depends on SDK; از https استفاده می‌کنیم)
      // توجه: برای سادگی، از fetch بومی Node 18+ می‌توان استفاده کرد. در صورت نبود، از https استفاده می‌کنیم.
      const payload = JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        size: '1024x1024',
        n: count
      })

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        }
      }

      const apiHost = 'api.openai.com'
      const apiPath = '/v1/images/generations'

      const responseData = await new Promise((resolve, reject) => {
        const req = https.request({ hostname: apiHost, path: apiPath, ...options }, (res) => {
          let data = ''
          res.on('data', chunk => (data += chunk))
          res.on('end', () => resolve(data))
        })
        req.on('error', reject)
        req.write(payload)
        req.end()
      })

      const parsed = JSON.parse(responseData)
      const images = (parsed?.data || []).map(d => ({ url: d.url, alt: personality?.name || 'fashion image' }))
      if (images.length > 0) return images
    }
  } catch (err) {
    // در خطا به fallback می‌رویم
    console.error('Image generation error, falling back to Unsplash:', err)
  }

  return buildFallbackUnsplash(personality, gender)
}

export default { generateStyleImages }


