import { useEffect } from 'react'

export const useSimpleViewTracker = (
  articleSlug: string,
  delay: number = 6000
) => {
  useEffect(() => {
    if (!articleSlug) return

    const viewedKey = `viewed_${articleSlug}`
    const lastViewed = localStorage.getItem(viewedKey)
    const oneHour = 60 * 60 * 1000 // 1 hour in milliseconds

    if (lastViewed && Date.now() - parseInt(lastViewed) < oneHour) {
      return
    }

    const trackView = async () => {
      try {
        const response = await fetch(
          `/track-view?slug=${encodeURIComponent(articleSlug)}`,
          {
            method: 'GET',
          }
        )

        if (response.ok) {
          localStorage.setItem(viewedKey, Date.now().toString())
          console.log(`View tracked for article: ${articleSlug}`)
        }
      } catch (error) {
        console.error('Error tracking view:', error)
        localStorage.removeItem(viewedKey)
      }
    }

    const timeout = setTimeout(trackView, delay)

    return () => clearTimeout(timeout)
  }, [articleSlug, delay])
}
