'use client'

import { useState, useEffect } from 'react'
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/actions/testimonial-actions'
import { StarIcon } from '@/utils/icons'

interface TestimonialForm {
  name: string
  designation: string
  content: string
  rating: number
  priority: number
}

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<TestimonialForm>({
    name: '',
    designation: '',
    content: '',
    rating: 5,
    priority: 1,
  })

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setLoading(true)
    const data = await getAllTestimonials()
    setTestimonials(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    if (editingTestimonial) {
      // Update existing testimonial
      const result = await updateTestimonial(editingTestimonial._id, formData)
      if (result.success) {
        await fetchTestimonials()
        setEditingTestimonial(null)
        resetForm()
      } else {
        alert(result.message || 'Failed to update testimonial')
      }
    } else {
      // Add new testimonial
      const result = await createTestimonial(formData)
      if (result.success) {
        await fetchTestimonials()
        resetForm()
      } else {
        alert(result.message || 'Failed to create testimonial')
      }
    }
    
    setSaving(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'priority' ? parseInt(value) || 1 : value
    }))
  }

  const handleEdit = (testimonial: any) => {
    setFormData({
      name: testimonial.name || '',
      designation: testimonial.designation || '',
      content: testimonial.content || '',
      rating: testimonial.rating || 5,
      priority: testimonial.priority || 1,
    })
    setEditingTestimonial(testimonial)
    
    // Scroll to top of the page (where the form is)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete testimonial from "${name}"?`)) {
      const result = await deleteTestimonial(id)
      if (result.success) {
        await fetchTestimonials()
      } else {
        alert(result.message || 'Failed to delete testimonial')
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingTestimonial(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      content: '',
      rating: 5,
      priority: testimonials.length + 1,
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
      />
    ))
  }

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent mb-6">
        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="John Doe"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Designation *</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="CTO at TechCorp"
              required
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Rating *</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              required
              disabled={saving}
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
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

          <div className="space-y-2 md:col-span-2">
            <label className="text-accent text-sm font-medium">Testimonial Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="Write the testimonial content..."
              rows={4}
              required
              disabled={saving}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {saving ? 'Saving...' : (editingTestimonial ? 'Update Testimonial' : 'Add Testimonial')}
          </button>
          {editingTestimonial && (
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

      {/* Existing Testimonials */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-accent mb-6">
          Existing Testimonials ({testimonials.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-primary border border-border rounded-lg p-4">
              <div className="mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-neutral">{testimonial.name}</h4>
                    <p className="text-sm text-tertiary-content">{testimonial.designation}</p>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="text-sm text-gray-300 line-clamp-3">{testimonial.content}</p>
                <p className="text-xs text-gray-500 mt-2">Priority: {testimonial.priority}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(testimonial)}
                  className="bg-[#5565e8] text-white px-3 py-1 rounded text-sm hover:opacity-90"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(testimonial._id, testimonial.name)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-center text-tertiary-content col-span-2 py-8">
              No testimonials yet. Add your first testimonial above.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestimonialManagement