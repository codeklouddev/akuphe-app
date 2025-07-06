import SectionHeading from '../SectionHeading/SectionHeading'
import ServiceCard from './ServiceCard'

interface ServiceSectionProps {
  services?: any[]
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ services = [] }) => {
  // If no services from props, fallback to static data
  const displayServices = services.length > 0 ? services : []
  
  return (
    <section id="services" className="my-14">
      <SectionHeading
        title="// Services / Offers:"
        subtitle="I offer a wide range of services to ensure you have the best written code and stay ahead in the competition."
      />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
        {displayServices.map((service) => (
          <ServiceCard
            key={service._id || service.title}
            icon={service.icon}
            title={service.title}
            shortDescription={service.description || service.shortDescription}
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceSection
