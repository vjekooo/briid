import { useEffect, useRef } from 'react'

export const useSimpleViewTracker = (
  articleSlug: string,
  delay: number = 60000
) => {
  const hasTracked = useRef(false)

  useEffect(() => {
    if (!articleSlug || hasTracked.current) return

    const viewedKey = `viewed_${articleSlug}`
    const lastViewed = localStorage.getItem(viewedKey)
    const oneHour = 60 * 60 * 1000 // 1 hour in milliseconds

    if (lastViewed && Date.now() - parseInt(lastViewed) < oneHour) {
      return
    }

    const trackView = async () => {
      try {
        hasTracked.current = true
        localStorage.setItem(viewedKey, Date.now().toString())

        const response = await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug: articleSlug }),
        })

        if (response.ok) {
          console.log(`View tracked for article: ${articleSlug}`)
        }
      } catch (error) {
        console.error('Error tracking view:', error)
        hasTracked.current = false
        localStorage.removeItem(viewedKey)
      }
    }

    const timeout = setTimeout(trackView, delay)

    return () => clearTimeout(timeout)
  }, [articleSlug, delay])
}
