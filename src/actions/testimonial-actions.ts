'use server'

import mongoose from 'mongoose'
import dbConnect from '@/lib/db'

// Define Testimonial schema
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Get or create model
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)

// Get all testimonials (for admin)
export async function getAllTestimonials() {
  try {
    await dbConnect()
    
    const testimonials = await Testimonial.find({})
      .sort({ priority: 1, createdAt: -1 })
      .lean()
    
    return testimonials.map((t: any) => ({
      ...t,
      _id: t._id.toString()
    }))
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Get paginated testimonials
export async function getTestimonials(page = 1, limit = 6) {
  try {
    await dbConnect()
    
    const skip = (page - 1) * limit
    const total = await Testimonial.countDocuments()
    const testimonials = await Testimonial.find({})
      .sort({ priority: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    return {
      testimonials: testimonials.map((t: any) => ({
        ...t,
        _id: t._id.toString()
      })),
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return { testimonials: [], total: 0, pages: 0 }
  }
}

// Create testimonial
export async function createTestimonial(data: any) {
  try {
    await dbConnect()
    
    const testimonial = await Testimonial.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return { 
      success: true, 
      testimonial: {
        ...testimonial.toObject(),
        _id: testimonial._id.toString()
      }
    }
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return { success: false, message: 'Failed to create testimonial' }
  }
}

// Update testimonial
export async function updateTestimonial(id: string, data: any) {
  try {
    await dbConnect()
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    )
    
    if (!testimonial) {
      return { success: false, message: 'Testimonial not found' }
    }
    
    return { 
      success: true,
      testimonial: {
        ...testimonial.toObject(),
        _id: testimonial._id.toString()
      }
    }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return { success: false, message: 'Failed to update testimonial' }
  }
}

// Delete testimonial
export async function deleteTestimonial(id: string) {
  try {
    await dbConnect()
    
    const result = await Testimonial.findByIdAndDelete(id)
    
    if (!result) {
      return { success: false, message: 'Testimonial not found' }
    }
    
    // Revalidate cache to ensure deletion is reflected
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')
    revalidatePath('/api/testimonials')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return { success: false, message: 'Failed to delete testimonial' }
  }
}