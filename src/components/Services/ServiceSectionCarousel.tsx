'use client'

import { useState, useRef, useEffect } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ServiceCard from './ServiceCard'
import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons'

interface ServiceSectionProps {
  services?: any[]
}

const ServiceSectionCarousel: React.FC<ServiceSectionProps> = ({ services = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [itemsPerView, setItemsPerView] = useState(3)
  const totalSlides = Math.ceil(services.length / itemsPerView)

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

  if (services.length === 0) {
    return (
      <section id="services" className="my-14">
        <SectionHeading
          title="// Services / Offers:"
          subtitle="Loading services..."
        />
      </section>
    )
  }

  return (
    <section id="services" className="my-14">
      <SectionHeading
        title="// Services / Offers:"
        subtitle="I offer a wide range of services to ensure you have the best infrastructure and stay ahead in the competition."
      />

      <div className="relative mt-8 md:mt-[3.75rem]">
        {/* Desktop Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-neutral hover:border-accent transition-all z-10"
              aria-label="Previous services"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-neutral hover:border-accent transition-all z-10"
              aria-label="Next services"
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
            {services.map((service, index) => (
              <div
                key={service._id || index}
                className={`w-full flex-shrink-0 px-4 ${
                  itemsPerView === 1 ? 'w-full' : itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
                }`}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  shortDescription={service.description || service.shortDescription}
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
            Swipe to see more services
          </p>
        )}
      </div>
    </section>
  )
}

export default ServiceSectionCarousel