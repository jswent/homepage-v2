import { NextRequest, NextResponse, userAgent } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // TODO: Implement rate limiting

  const reqData = await requestData(request)
  if (!reqData) {
    return NextResponse.json(
      { error: 'Invalid or no schema provided' },
      { status: 400 },
    )
  }

  const { ua } = userAgent(request)
  const ip = request.ip || request.headers.get('x-forwarded-for')
  const geo = request.geo

  const UserData = {
    email: reqData.get('email'),
  }

  if (UserData.email) {
    const supabase = createClient()

    // TODO: Refactor to upsert
    const result = await supabase.from('newsletter-list').insert({
      email: UserData.email,
      status: 'subscribed', // TODO: Implement confirmation step
      subscribed: true,
      subscribed_at: new Date().toISOString(),
      subscribed_ip: ip,
      subscribed_ua: ua,
      subscribed_region: geo ? geo.region : undefined,
      subscribed_geo: geo ? JSON.stringify(geo) : undefined,
    })

    if (result.status == 201) {
      return NextResponse.json({ data: 'success' })
    } else {
      console.log(result)
      return NextResponse.json(
        { error: 'Error registering with database. Please try again later.' },
        { status: 400 },
      )
    }
  }
}

async function requestData(request: NextRequest) {
  var reqData
  try {
    reqData = await request.formData()
  } catch (e) {
    reqData = null
  }

  return reqData
}
