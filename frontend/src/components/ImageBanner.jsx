import { useMemo } from 'react'

function ImageBanner({ images = [], title, subtitle }) {
  const display = useMemo(() => images.slice(0, 4), [images])

  if (!display.length) return null

  return (
    <div className="mb-10">
      {(title || subtitle) && (
        <div className="text-center mb-6">
          {title && <h3 className="text-2xl font-extrabold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {display.map((img, idx) => (
          <div key={idx} className="relative group overflow-hidden rounded-3xl shadow-lg">
            <img
              src={img.url}
              alt={img.alt || 'style'}
              className="w-full h-40 md:h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageBanner


