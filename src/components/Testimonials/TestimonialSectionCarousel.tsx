'use client'

import { useState, useRef, useEffect } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import TestimonialCard from './TestimonialCard'
import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons'

interface TestimonialSectionProps {
  testimonials: any[]
}

const TestimonialSectionCarousel: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Map MongoDB data to expected format
  const formattedTestimonials = testimonials.map(t => ({
    name: t.name,
    title: t.designation || t.title,
    feedback: t.content || t.feedback,
    image: t.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200',
    stars: t.rating || t.stars || 5,
    createdAt: t.createdAt || new Date().toISOString()
  }))

  // Calculate items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 2
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [itemsPerView, setItemsPerView] = useState(2)
  const totalSlides = Math.ceil(formattedTestimonials.length / itemsPerView)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current!.offsetLeft)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current!.offsetLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current!.offsetLeft
    const walk = (startX - x) * 2
    setTranslateX(-walk)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - carouselRef.current!.offsetLeft
    const walk = (startX - x) * 2
    setTranslateX(-walk)
  }

  const handleEnd = () => {
    setIsDragging(false)
    
    // Determine swipe direction
    if (translateX > 100) {
      handlePrevious()
    } else if (translateX < -100) {
      handleNext()
    }
    
    setTranslateX(0)
  }

  if (formattedTestimonials.length === 0) {
    return (
      <section id="testimonials">
        <SectionHeading
          title="// Testimonials"
          subtitle="No testimonials yet."
        />
      </section>
    )
  }

  return (
    <section id="testimonials">
      <SectionHeading
        title="// Testimonials"
        subtitle="Don't just take our word for it - see what actual users of our service have to say about their experience."
      />

      <div className="relative my-8">
        {/* Desktop Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-neutral hover:border-accent transition-all z-10"
              aria-label="Previous testimonials"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-neutral hover:border-accent transition-all z-10"
              aria-label="Next testimonials"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            }}
          >
            {formattedTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 px-4 ${
                  itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                }`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  handleActiveCard={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 transition-all ${
                  currentIndex === i ? 'bg-accent w-6' : 'bg-border w-2'
                } rounded-full`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile Swipe Hint */}
        {totalSlides > 1 && (
          <p className="mt-4 text-center text-sm text-tertiary-content md:hidden">
            Swipe to see more testimonials
          </p>
        )}
      </div>
    </section>
  )
}

export default TestimonialSectionCarousel