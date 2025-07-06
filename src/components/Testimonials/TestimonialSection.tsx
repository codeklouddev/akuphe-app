'use client'

import { useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import TestimonialCard from './TestimonialCard'

interface TestimonialSectionProps {
  testimonials: any[]
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [activeCard, setActiveCard] = useState(0)
  
  // Map MongoDB data to expected format
  const formattedTestimonials = testimonials.map(t => ({
    name: t.name,
    title: t.designation || t.title,
    feedback: t.content || t.feedback,
    stars: t.rating || t.stars || 5,
    createdAt: t.createdAt || new Date().toISOString(),
    image: t.image || ''
  }))

  return (
    <section id="testimonials">
      <SectionHeading
        title="// Testimonials"
        subtitle="Don't just take our word for it - see what actual users of our service have to say about their experience."
      />

      <div className="hide-scrollbar -mx-4 my-8 flex gap-8 overflow-x-auto px-4 pb-4">
        {formattedTestimonials.map((testimonial, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={testimonial}
            handleActiveCard={() => {
              setActiveCard(idx)
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 sm:hidden">
        {formattedTestimonials.map((_, idx) => (
          <div
            key={idx}
            className={`${idx === activeCard ? 'bg-accent size-[12px]' : 'size-[10px] bg-white/50'} rounded-full`}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection
