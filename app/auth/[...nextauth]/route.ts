import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { senderName, senderEmail, subject, message, type } = body

    const SENDER_EMAIL = process.env.SENDGRID_FROM_EMAIL!
    const RECIPIENT_EMAIL = 'nidhishj100@gmail.com' // Admin email (where you receive alerts)

    const msg = {
      to: RECIPIENT_EMAIL,
      from: SENDER_EMAIL,
      subject: `[CognivistaX Alert] ${subject}`,
      text: `
Type: ${type}
Name: ${senderName}
Email: ${senderEmail}
Message: ${message}
      `,
    }

    await sgMail.send(msg)

    console.log('✅ Email sent successfully!')
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ SendGrid error:', error.response?.body || error.message)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
