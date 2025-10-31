import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { email, token } = await req.json()
    
    if (!email || !token) {
      return new Response(
        JSON.stringify({ error: 'Email and token are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const confirmationLink = `https://your-vercel-app.vercel.app/confirm?token=${token}&email=${encodeURIComponent(email)}`

    // If RESEND_API_KEY is set, send actual email. Otherwise, log it.
    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Obelisk <welcome@getobelisk.com>',
          to: [email],
          subject: 'Confirm Your Obelisk Waitlist Spot 🚀',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #121212; padding: 20px; text-align: center; color: white; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { background: #00A6FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🚀 Welcome to Obelisk</h1>
                </div>
                <div class="content">
                  <h2>Confirm Your Spot on the Waitlist</h2>
                  <p>Thanks for joining the Obelisk waitlist! We're building the intelligent knowledge organization platform and can't wait to have you onboard.</p>
                  
                  <p style="text-align: center; margin: 30px 0;">
                    <a href="${confirmationLink}" class="button">Confirm My Spot</a>
                  </p>
                  
                  <p>Or copy and paste this link in your browser:</p>
                  <p><a href="${confirmationLink}">${confirmationLink}</a></p>
                  
                  <p>Once confirmed, you'll be the first to know when we launch and get early access.</p>
                </div>
                <div class="footer">
                  <p>If you didn't request this, please ignore this email.</p>
                  <p>© 2025 Obelisk. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      })

      if (!res.ok) {
        throw new Error(`Resend API error: ${await res.text()}`)
      }

      const data = await res.json()
      return new Response(JSON.stringify({ success: true, messageId: data.id }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      // No API key - just log the email (for development)
      console.log('📧 Email would be sent to:', email)
      console.log('🔗 Confirmation link:', confirmationLink)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email logged (no RESEND_API_KEY set)', 
          confirmationLink 
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
