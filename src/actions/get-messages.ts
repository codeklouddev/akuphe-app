'use server'

import mongoose from 'mongoose'
import dbConnect from '@/lib/db'

// Define schema inline (same as contact-form.ts)
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

export async function getMessages() {
  try {
    // Connect to MongoDB
    await dbConnect()
    
    // Fetch all messages, newest first
    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .lean()
    
    // Convert _id to string for client-side usage
    return messages.map((msg: any) => ({
      ...msg,
      _id: msg._id.toString(),
      createdAt: msg.createdAt.toISOString()
    }))
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function markAsRead(messageId: string) {
  try {
    // Connect to MongoDB
    await dbConnect()
    
    // Update message
    await ContactMessage.findByIdAndUpdate(messageId, { read: true })
    
    return { success: true }
  } catch (error) {
    console.error('Error marking message as read:', error)
    return { success: false, message: 'Failed to update message' }
  }
}

export async function deleteMessage(messageId: string) {
  try {
    // Connect to MongoDB
    await dbConnect()
    
    // Delete message
    await ContactMessage.findByIdAndDelete(messageId)
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting message:', error)
    return { success: false, message: 'Failed to delete message' }
  }
}