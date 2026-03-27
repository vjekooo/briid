import { useEffect, useState } from 'react'

export interface HeroItem {
  title: string
  url: string
  image: string
  name?: string
}

interface Props {
  items: HeroItem[]
  interval?: number
}

export default function HeroSlider({ items, interval = 5000 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!items.length || items.length === 1) return

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [items, interval])

  const currentItem = items[currentIndex]

  return (
    <>
      {items.map((item, index) => (
        <div
          key={`${item.url}-${index}`}
          className={`hero-slide absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${item.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
          }}
        />
      ))}

      <div className="container mx-auto px-6 pb-6">
        <div className="relative z-10 w-fit bg-white px-6 pb-4 tracking-wide transition-opacity duration-700 ease-in-out">
          <h3 className="text-black" id="hero-name">
            {currentItem?.name}
          </h3>
          <a
            className="h5 inline-block text-xl leading-relaxed underline hover:border-black hover:text-black"
            href={currentItem?.url}
            id="hero-link"
          >
            {currentItem?.title}
          </a>
        </div>
      </div>
    </>
  )
}
