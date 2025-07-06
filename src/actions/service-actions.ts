'use server'

import mongoose from 'mongoose'
import dbConnect from '@/lib/db'

// Define Service schema
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Get or create model
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

// Get all services (for admin)
export async function getAllServices() {
  try {
    await dbConnect()
    
    const services = await Service.find({})
      .sort({ priority: 1, createdAt: -1 })
      .lean()
    
    return services.map((s: any) => ({
      ...s,
      _id: s._id.toString()
    }))
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

// Get paginated services
export async function getServices(page = 1, limit = 9) {
  try {
    await dbConnect()
    
    const skip = (page - 1) * limit
    const total = await Service.countDocuments()
    const services = await Service.find({})
      .sort({ priority: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    return {
      services: services.map((s: any) => ({
        ...s,
        _id: s._id.toString()
      })),
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    console.error('Error fetching services:', error)
    return { services: [], total: 0, pages: 0 }
  }
}

// Create service
export async function createService(data: any) {
  try {
    await dbConnect()
    
    const service = await Service.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return { 
      success: true, 
      service: {
        ...service.toObject(),
        _id: service._id.toString()
      }
    }
  } catch (error) {
    console.error('Error creating service:', error)
    return { success: false, message: 'Failed to create service' }
  }
}

// Update service
export async function updateService(id: string, data: any) {
  try {
    await dbConnect()
    
    const service = await Service.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    )
    
    if (!service) {
      return { success: false, message: 'Service not found' }
    }
    
    return { 
      success: true,
      service: {
        ...service.toObject(),
        _id: service._id.toString()
      }
    }
  } catch (error) {
    console.error('Error updating service:', error)
    return { success: false, message: 'Failed to update service' }
  }
}

// Delete service
export async function deleteService(id: string) {
  try {
    await dbConnect()
    
    const result = await Service.findByIdAndDelete(id)
    
    if (!result) {
      return { success: false, message: 'Service not found' }
    }
    
    // Revalidate cache to ensure deletion is reflected
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')
    revalidatePath('/api/services')
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting service:', error)
    return { success: false, message: 'Failed to delete service' }
  }
}