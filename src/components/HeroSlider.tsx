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
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out hero-slide ${
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
                <div className="w-fit px-6 pb-4 tracking-wide bg-white z-10 relative transition-opacity duration-700 ease-in-out">
                    <h3 className="text-black" id="hero-name">
                        {currentItem?.name}
                    </h3>
                    <a
                        className="text-xl inline-block underline leading-relaxed hover:text-black hover:border-black h5"
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