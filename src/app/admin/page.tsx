'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import ProjectManagement from '@/components/Admin/ProjectManagement'
import ServiceManagement from '@/components/Admin/ServiceManagement'
import SkillManagement from '@/components/Admin/SkillManagement'
import TestimonialManagement from '@/components/Admin/TestimonialManagement'
import AdminInbox from '@/components/Admin/AdminInbox'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('inbox')
  const { isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-neutral">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const tabs = [
    { id: 'inbox', label: 'Inbox' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'testimonials', label: 'Testimonials' },
  ]

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-neutral mb-2">Admin Panel</h1>
            <p className="text-tertiary-content">Manage your portfolio content</p>
          </div>
          <button
            onClick={logout}
            className="bg-secondary text-neutral px-6 py-2 rounded-lg border border-border hover:border-accent transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg border transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-primary border-accent'
                  : 'bg-secondary text-neutral border-border hover:border-accent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-secondary rounded-[20px] border border-border p-8">
          {activeTab === 'inbox' && <AdminInbox />}
          {activeTab === 'projects' && <ProjectManagement />}
          {activeTab === 'services' && <ServiceManagement />}
          {activeTab === 'skills' && <SkillManagement />}
          {activeTab === 'testimonials' && <TestimonialManagement />}
        </div>
      </div>
    </div>
  )
}

export default AdminPage