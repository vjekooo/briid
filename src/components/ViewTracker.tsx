import { useSimpleViewTracker } from '../hooks/useSimpleViewTracker'

type Props = {
  slug: string
  delay?: number
}

export default function ViewTracker({ slug, delay = 6000 }: Props) {
  useSimpleViewTracker(slug, delay)
  return <div></div>
}
