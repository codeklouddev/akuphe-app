import { skillList } from '@/appData'
import AboutSection from '@/components/About/AboutSection'
import ContactSection from '@/components/Contact/ContactSection'
import Hero from '@/components/Hero/Hero'
import ProjectSectionWithPagination from '@/components/Projects/ProjectSectionWithPagination'
import ServiceSectionWithPagination from '@/components/Services/ServiceSectionWithPagination'
import Skills from '@/components/Skills/Skills'
import TestimonialSectionWithPagination from '@/components/Testimonials/TestimonialSectionWithPagination'
import { getProjects } from '@/actions/project-actions'
import { getServices } from '@/actions/service-actions'
import { getTestimonials } from '@/actions/testimonial-actions'

// Force dynamic rendering to ensure fresh data from database
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Get paginated data from MongoDB
  const projectData = await getProjects(1, 6) // Page 1, 6 items per page
  const serviceData = await getServices(1, 9) // Page 1, 9 items per page (3x3 grid)
  const testimonialData = await getTestimonials(1, 6) // Page 1, 6 items per page

  return (
    <main>
      <Hero />
      <Skills skills={skillList} />
      <AboutSection />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ProjectSectionWithPagination 
          projects={projectData.projects}
          totalPages={projectData.pages}
          currentPage={projectData.currentPage || 1}
          total={projectData.total}
        />
        <ServiceSectionWithPagination 
          services={serviceData.services}
          totalPages={serviceData.pages}
          currentPage={serviceData.currentPage || 1}
          total={serviceData.total}
        />
        <TestimonialSectionWithPagination 
          testimonials={testimonialData.testimonials}
          totalPages={testimonialData.pages}
          currentPage={testimonialData.currentPage || 1}
          total={testimonialData.total}
        />
        <ContactSection />
      </div>
    </main>
  )
}
