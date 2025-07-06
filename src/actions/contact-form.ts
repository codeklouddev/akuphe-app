'use server'

import mongoose from 'mongoose'
import dbConnect from '@/lib/db'
import { sendContactNotification } from '@/lib/email'

// Define schema inline
const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

// Get or create model
const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema)

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  try {
    const name = formData.get('name')
    if (!name)
      return {
        success: false,
        message: 'Please provide your name.',
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: 'Please provide your email address.',
      }

    const subject = formData.get('subject')
    if (!subject)
      return {
        success: false,
        message: 'Please provide a subject.',
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: 'Please provide a message.',
      }

    try {
      // Connect to MongoDB
      await dbConnect()
      
      // Create new message
      const contactData = {
        name: name.toString(),
        email: email.toString(),
        subject: subject.toString(),
        message: message.toString()
      }
      
      await ContactMessage.create(contactData)
      
      // Send email notification
      const emailResult = await sendContactNotification(contactData)
      
      if (!emailResult.success) {
        console.error('Failed to send email notification:', emailResult.error)
        // Still return success since the message was saved
      }
      
      return { success: true, message: 'Thanks for your submission!' }
    } catch (dbError) {
      console.error('Database error:', dbError)
      return {
        success: false,
        message: 'Failed to save message. Please try again.',
      }
    }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    return {
      success: false,
      message: 'Oops! There was a problem submitting your form',
    }
  }
}

export default action
