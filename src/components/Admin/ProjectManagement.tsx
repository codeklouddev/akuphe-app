'use client'

import { useState, useEffect } from 'react'
import { getAllProjects, createProject, updateProject, deleteProject } from '@/actions/project-actions'

interface ProjectForm {
  priority: number
  title: string
  shortDescription: string
  cover: string
  livePreview: string
  type: string
  siteAge: string
  visitors: string
  earned: string
  githubLink: string
  githubStars: string
  numberOfSales: string
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ProjectForm>({
    priority: 1,
    title: '',
    shortDescription: '',
    cover: '',
    livePreview: '',
    type: '',
    siteAge: '',
    visitors: '',
    earned: '',
    githubLink: '',
    githubStars: '',
    numberOfSales: '',
  })

  const projectTypes = ['Client Work 🙍‍♂️', 'New 🔥', 'Free 🔥', 'Personal Project']

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const data = await getAllProjects()
    setProjects(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    if (editingProject) {
      // Update existing project
      const result = await updateProject(editingProject._id, formData)
      if (result.success) {
        await fetchProjects()
        setEditingProject(null)
        resetForm()
      } else {
        alert(result.message || 'Failed to update project')
      }
    } else {
      // Add new project
      const result = await createProject(formData)
      if (result.success) {
        await fetchProjects()
        resetForm()
      } else {
        alert(result.message || 'Failed to create project')
      }
    }
    
    setSaving(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'priority' ? parseInt(value) || 1 : value
    }))
  }

  const handleEdit = (project: any) => {
    setFormData({
      priority: project.priority || 1,
      title: project.title || '',
      shortDescription: project.shortDescription || '',
      cover: project.cover || '',
      livePreview: project.livePreview || '',
      type: project.type || '',
      siteAge: project.siteAge || '',
      visitors: project.visitors || '',
      earned: project.earned || '',
      githubLink: project.githubLink || '',
      githubStars: project.githubStars || '',
      numberOfSales: project.numberOfSales || '',
    })
    setEditingProject(project)
    
    // Scroll to top of the page (where the form is)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const result = await deleteProject(id)
      if (result.success) {
        await fetchProjects()
        alert(result.message || 'Project deleted successfully')
      } else {
        alert(result.message || 'Failed to delete project')
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingProject(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      priority: projects.length + 1,
      title: '',
      shortDescription: '',
      cover: '',
      livePreview: '',
      type: '',
      siteAge: '',
      visitors: '',
      earned: '',
      githubLink: '',
      githubStars: '',
      numberOfSales: '',
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent mb-6">
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="Enter project title"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Project Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              required
              disabled={saving}
            >
              <option value="">Select type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-accent text-sm font-medium">Short Description *</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="Brief description of the project"
              rows={3}
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Cover Image URL *</label>
            <input
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="https://example.com/image.jpg"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Live Preview URL</label>
            <input
              type="url"
              name="livePreview"
              value={formData.livePreview}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="https://your-project.com"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="https://github.com/username/repo"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Priority (Order)</label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              min="1"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Visitors</label>
            <input
              type="text"
              name="visitors"
              value={formData.visitors}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="8K Visitors"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Earned</label>
            <input
              type="text"
              name="earned"
              value={formData.earned}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="$400 Earned"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Site Age</label>
            <input
              type="text"
              name="siteAge"
              value={formData.siteAge}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="1 month old"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">GitHub Stars</label>
            <input
              type="text"
              name="githubStars"
              value={formData.githubStars}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="40 Stars"
              disabled={saving}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={saving}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Projects Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-accent mb-6">
          Existing Projects ({projects.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-accent py-3 px-4">Priority</th>
                <th className="text-left text-accent py-3 px-4">Title</th>
                <th className="text-left text-accent py-3 px-4">Type</th>
                <th className="text-left text-accent py-3 px-4">Visitors</th>
                <th className="text-left text-accent py-3 px-4">Earned</th>
                <th className="text-left text-accent py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-border">
                  <td className="py-3 px-4 text-neutral">{project.priority}</td>
                  <td className="py-3 px-4 text-neutral">{project.title}</td>
                  <td className="py-3 px-4 text-neutral">{project.type}</td>
                  <td className="py-3 px-4 text-neutral">{project.visitors || '-'}</td>
                  <td className="py-3 px-4 text-neutral">{project.earned || '-'}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="bg-[#5565e8] text-white px-3 py-1 rounded text-sm hover:opacity-90"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(project._id, project.title)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-tertiary-content">
                    No projects yet. Add your first project above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProjectManagement