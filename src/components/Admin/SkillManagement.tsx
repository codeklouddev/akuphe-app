'use client'

import { useState } from 'react'

interface Skill {
  name: string
  icon: string
}

const SkillManagement = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'AWS', icon: 'AwsIcon' },
    { name: 'Docker', icon: 'DockerIcon' },
    { name: 'Kubernetes', icon: 'KubernetesIcon' },
    { name: 'Terraform', icon: 'TerraformIcon' },
    { name: 'Jenkins', icon: 'JenkinsIcon' },
  ])
  
  const [formData, setFormData] = useState<Skill>({
    name: '',
    icon: '',
  })

  const availableIcons = [
    'AwsIcon', 'DockerIcon', 'KubernetesIcon', 'TerraformIcon', 
    'JenkinsIcon', 'PrometheusIcon', 'GrafanaIcon', 'AnsibleIcon',
    'PythonIcon', 'BashIcon', 'JavaScriptIcon', 'GitIcon',
    'GitHubActionsIcon', 'GitOpsIcon', 'LinuxIcon', 'DatabaseIcon',
    'CloudFormationIcon', 'DevSecOpsIcon', 'CloudSecurityIcon',
    'ApiGatewayIcon', 'AwsLambdaIcon', 'ElasticBeanstalkIcon',
    'CloudInfrastructureIcon', 'InfrastructureDesignIcon'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSkills([...skills, formData])
    setFormData({
      name: '',
      icon: '',
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDelete = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index)
    setSkills(newSkills)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newSkills = [...skills]
    const temp = newSkills[index]
    newSkills[index] = newSkills[index - 1]
    newSkills[index - 1] = temp
    setSkills(newSkills)
  }

  const handleMoveDown = (index: number) => {
    if (index === skills.length - 1) return
    const newSkills = [...skills]
    const temp = newSkills[index]
    newSkills[index] = newSkills[index + 1]
    newSkills[index + 1] = temp
    setSkills(newSkills)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-accent mb-6">Add New Skill</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-accent text-sm font-medium">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-primary border border-border rounded-lg px-4 py-3 text-neutral"
              placeholder="e.g., Docker"
              required
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
            >
              <option value="">Select an icon</option>
              {availableIcons.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Add Skill
        </button>
      </form>

      {/* Existing Skills */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-accent mb-6">Current Skills ({skills.length})</h3>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="bg-primary border border-border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-accent text-sm font-medium bg-secondary px-3 py-1 rounded">{skill.icon}</span>
                <h4 className="text-neutral font-semibold">{skill.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className={`px-3 py-1 rounded text-sm ${
                    index === 0 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-[#5565e8] text-white hover:opacity-90'
                  }`}
                >
                  ↑
                </button>
                <button 
                  onClick={() => handleMoveDown(index)}
                  disabled={index === skills.length - 1}
                  className={`px-3 py-1 rounded text-sm ${
                    index === skills.length - 1 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-[#5565e8] text-white hover:opacity-90'
                  }`}
                >
                  ↓
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="text-tertiary-content text-center py-8">No skills added yet. Add your first skill above.</p>
        )}
      </div>
    </div>
  )
}

export default SkillManagement