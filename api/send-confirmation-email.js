export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, token } = req.body;
    
    if (!email || !token) {
      return res.status(400).json({ error: 'Email and token are required' });
    }

    const confirmationLink = `https://${req.headers.host}/confirm?token=${token}&email=${encodeURIComponent(email)}`;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // Send real email via Resend
      const emailResult = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Obelisk <onboarding@resend.dev>', // Change to your domain later
          to: [email],
          subject: 'Confirm Your Obelisk Waitlist Spot 🚀',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
                .header { background: #121212; padding: 30px; text-align: center; color: white; }
                .content { padding: 40px 30px; background: #f9f9f9; }
                .button { background: #00A6FF; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: bold; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; background: #ffffff; }
                .link { color: #00A6FF; word-break: break-all; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 28px;">🚀 Welcome to Obelisk</h1>
                </div>
                <div class="content">
                  <h2 style="color: #333; margin-top: 0;">Confirm Your Spot on the Waitlist</h2>
                  <p>Thanks for joining the Obelisk waitlist! We're building the intelligent knowledge organization platform and can't wait to have you onboard.</p>
                  
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="${confirmationLink}" class="button">Confirm My Spot</a>
                  </div>
                  
                  <p>Or copy and paste this link in your browser:</p>
                  <p><a href="${confirmationLink}" class="link">${confirmationLink}</a></p>
                  
                  <p>Once confirmed, you'll be:</p>
                  <ul>
                    <li>First to know when we launch</li>
                    <li>Get early access to features</li>
                    <li>Receive exclusive updates</li>
                  </ul>
                  
                  <p>We're excited to have you on this journey!</p>
                  <p>- The Obelisk Team</p>
                </div>
                <div class="footer">
                  <p>If you didn't request to join the Obelisk waitlist, please ignore this email.</p>
                  <p>© 2025 Obelisk. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        }),
      });

      if (!emailResult.ok) {
        const errorText = await emailResult.text();
        console.error('Resend API error:', errorText);
        throw new Error('Failed to send email via Resend');
      }

      const emailData = await emailResult.json();
      console.log('✅ Real email sent via Resend:', emailData);
      
      res.status(200).json({ 
        success: true, 
        message: 'Confirmation email sent successfully',
        messageId: emailData.id
      });
    } else {
      // No API key - development mode
      console.log('📧 Email would be sent to:', email);
      console.log('🔗 Confirmation link:', confirmationLink);
      
      res.status(200).json({ 
        success: true, 
        message: 'Email queued (RESEND_API_KEY not set)',
        confirmationLink
      });
    }
  } catch (error) {
    console.error('Error in email API:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
