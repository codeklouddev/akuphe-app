'use client'

import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import TestimonialCard from './TestimonialCard'
import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons'

interface TestimonialSectionProps {
  testimonials: any[]
  totalPages: number
  currentPage: number
  total: number
}

const TestimonialSectionWithPagination: React.FC<TestimonialSectionProps> = ({ 
  testimonials, 
  totalPages, 
  currentPage: initialPage,
  total 
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [displayTestimonials, setDisplayTestimonials] = useState(testimonials)
  
  // Map MongoDB data to expected format
  const formatTestimonials = (items: any[]) => {
    return items.map(t => ({
      name: t.name,
      title: t.designation || t.title,
      feedback: t.content || t.feedback,
      stars: t.rating || t.stars || 5,
      createdAt: t.createdAt || new Date().toISOString(),
      image: t.image || ''
    }))
  }

  const [formattedTestimonials, setFormattedTestimonials] = useState(formatTestimonials(testimonials))

  const fetchPage = async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/testimonials?page=${page}`)
      const data = await response.json()
      setDisplayTestimonials(data.testimonials)
      setFormattedTestimonials(formatTestimonials(data.testimonials))
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    fetchPage(page)
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <section id="testimonials">
      <SectionHeading
        title="// Testimonials"
        subtitle="Don't just take our word for it - see what actual users of our service have to say about their experience."
      />

      <div className={`my-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
        loading ? 'opacity-50' : 'opacity-100'
      }`}>
        {formattedTestimonials.map((testimonial, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={testimonial}
            handleActiveCard={() => {}}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Page Info */}
          <p className="text-tertiary-content text-sm">
            Showing {displayTestimonials.length} of {total} testimonials
          </p>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-neutral transition-all hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Previous page"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-tertiary-content">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    disabled={loading}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
                      currentPage === page
                        ? 'border-accent bg-accent text-primary'
                        : 'border-border bg-secondary text-neutral hover:border-accent'
                    } disabled:cursor-not-allowed`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-neutral transition-all hover:border-accent disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Next page"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile-friendly dots indicator */}
          <div className="flex gap-2 md:hidden">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={loading}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentPage === page ? 'bg-accent w-6' : 'bg-border'
                }`}
                aria-label={`Go to page ${page}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default TestimonialSectionWithPagination