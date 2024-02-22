import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import NotFound from '../not-found'

export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

export default function ThankYou({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  if (searchParams.status && searchParams.status == 'subscription-confirmed') {
    return (
      <SimpleLayout
        title="Thanks for subscribing."
        intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
      />
    )
  }

  return NotFound()
}
