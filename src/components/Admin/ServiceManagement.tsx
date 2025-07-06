'use client'

import { useState, useEffect } from 'react'
import { getAllServices, createService, updateService, deleteService } from '@/actions/service-actions'

interface ServiceForm {
  icon: string
  title: string
  description: string
  priority: number
}

const ServiceManagement = () => {
  const [services, setServices] = useState<any[]>([])
  const [editingService, setEditingService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ServiceForm>({
    icon: '',
    title: '',
    description: '',
    priority: 1,
  })

  const availableIcons = [
    'AwsIcon', 'DockerIcon', 'KubernetesIcon', 'TerraformIcon', 
    'JenkinsIcon', 'PrometheusIcon', 'GrafanaIcon', 'AnsibleIcon',
    'DevSecOpsIcon', 'CloudSecurityIcon', 'CostOptimizationIcon',
    'GitOpsIcon', 'CloudInfrastructureIcon', 'ApiGatewayIcon',
    'DatabaseIcon', 'LinuxIcon', 'PythonIcon', 'BashIcon'
  ]

  // Fetch services on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const data = await getAllServices()
    setServices(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    if (editingService) {
      // Update existing service
      const result = await updateService(editingService._id, formData)
      if (result.success) {
        await fetchServices()
        setEditingService(null)
        resetForm()
      } else {
        alert(result.message || 'Failed to update service')
      }
    } else {
      // Add new service
      const result = await createService(formData)
      if (result.success) {
        await fetchServices()
        resetForm()
      } else {
        alert(result.message || 'Failed to create service')
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

  const handleEdit = (service: any) => {
    setFormData({
      icon: service.icon || '',
      title: service.title || '',
      description: service.description || '',
      priority: service.priority || 1,
    })
    setEditingService(service)
    
    // Scroll to top of the page (where the form is)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const result = await deleteService(id)
      if (result.success) {
        await fetchServices()
      } else {
        alert(result.message || 'Failed to delete service')
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingService(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      icon: '',
      title: '',
      description: '',
      priority: services.length + 1,
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent mb-6">
        {editingService ? 'Edit Service' : 'Add New Service'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Service Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="e.g., Cloud Infrastructure Design"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Icon *</label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              required
              disabled={saving}
            >
              <option value="">Select an icon</option>
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-accent text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="Describe what this service offers..."
              rows={3}
              required
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
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service')}
          </button>
          {editingService && (
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

      {/* Existing Services */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-accent mb-6">
          Existing Services ({services.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div key={service._id} className="bg-primary border border-border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent font-mono text-sm">{service.icon}</span>
                    <h4 className="text-lg font-semibold text-neutral">{service.title}</h4>
                  </div>
                  <p className="text-tertiary-content text-sm mb-2">{service.description}</p>
                  <p className="text-xs text-gray-500">Priority: {service.priority}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="bg-[#5565e8] text-white px-3 py-1 rounded text-sm hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(service._id, service.title)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-center text-tertiary-content col-span-2 py-8">
              No services yet. Add your first service above.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceManagement