'use server'

import mongoose from 'mongoose'
import dbConnect from '@/lib/db'

// Define Project schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  priority: { type: Number, default: 0 },
  cover: { type: String, required: true },
  livePreview: String,
  githubLink: String,
  visitors: String,
  earned: String,
  githubStars: String,
  ratings: String,
  numberOfSales: String,
  type: { type: String, required: true },
  siteAge: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Function to get the Project model
function getProjectModel() {
  return mongoose.models.Project || mongoose.model('Project', ProjectSchema)
}

// Get all projects
export async function getProjects(page = 1, limit = 6) {
  try {
    await dbConnect()
    
    const Project = getProjectModel()
    const skip = (page - 1) * limit
    const total = await Project.countDocuments()
    const projects = await Project.find({})
      .sort({ priority: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    
    return {
      projects: projects.map((p: any) => ({
        ...p,
        _id: p._id.toString()
      })),
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { projects: [], total: 0, pages: 0 }
  }
}

// Get all projects for admin (no pagination)
export async function getAllProjects() {
  try {
    await dbConnect()
    
    const Project = getProjectModel()
    const projects = await Project.find({})
      .sort({ priority: 1, createdAt: -1 })
      .lean()
    
    return projects.map((p: any) => ({
      ...p,
      _id: p._id.toString()
    }))
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

// Create project
export async function createProject(data: any) {
  try {
    await dbConnect()
    
    const Project = getProjectModel()
    const project = await Project.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return { 
      success: true, 
      project: {
        ...project.toObject(),
        _id: project._id.toString()
      }
    }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, message: 'Failed to create project' }
  }
}

// Update project
export async function updateProject(id: string, data: any) {
  try {
    await dbConnect()
    
    const Project = getProjectModel()
    const project = await Project.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    )
    
    if (!project) {
      return { success: false, message: 'Project not found' }
    }
    
    return { 
      success: true,
      project: {
        ...project.toObject(),
        _id: project._id.toString()
      }
    }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, message: 'Failed to update project' }
  }
}

// Delete project
export async function deleteProject(id: string) {
  try {
    await dbConnect()
    
    console.log('Attempting to delete project with ID:', id)
    
    const Project = getProjectModel()
    
    // First check if project exists
    const existingProject = await Project.findById(id)
    if (!existingProject) {
      console.log('Project not found with ID:', id)
      return { success: false, message: 'Project not found' }
    }
    
    console.log('Found project to delete:', existingProject.title)
    
    // Delete the project
    const result = await Project.findByIdAndDelete(id)
    
    if (!result) {
      return { success: false, message: 'Failed to delete project' }
    }
    
    console.log('Successfully deleted project:', result.title)
    
    // Revalidate cache to ensure deletion is reflected
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')
    revalidatePath('/api/projects')
    
    return { success: true, message: `Successfully deleted project: ${result.title}` }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, message: `Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}` }
  }
}