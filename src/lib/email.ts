import nodemailer from 'nodemailer'

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
    },
  })
}

interface EmailOptions {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactNotification(data: EmailOptions) {
  const transporter = createTransporter()

  // Email content
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to yourself
    subject: `🔔 New Contact Form: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #5565e8; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #5565e8;">Name:</strong>
              <p style="margin: 5px 0; color: #666;">${data.name}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #5565e8;">Email:</strong>
              <p style="margin: 5px 0; color: #666;">
                <a href="mailto:${data.email}" style="color: #5565e8; text-decoration: none;">${data.email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #5565e8;">Subject:</strong>
              <p style="margin: 5px 0; color: #666;">${data.subject}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #5565e8;">Message:</strong>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">
                <p style="margin: 0; color: #666; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <div style="text-align: center; color: #999; font-size: 12px;">
              <p>Submitted on ${new Date().toLocaleString()}</p>
              <p>You can reply directly to this email to respond to ${data.name}</p>
            </div>
          </div>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">This email was sent from your portfolio contact form</p>
        </div>
      </div>
    `,
    replyTo: data.email, // Allow direct reply to the sender
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' }
  }
}