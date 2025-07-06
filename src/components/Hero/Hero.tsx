'use client'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import Image from 'next/image'
import { HeroImage } from '../../utils/images'
import Ellipse from './Ellipse'

const Hero = () => {
  const ellipseRef = useRotatingAnimation()
  const role = useRoleSwitcher({ roles: ['DEVOPS ENGINEER', 'DEVSECOPS ENGINEER', 'SRE ENGINEER', 'CLOUD ENGINEER', 'SOLUTIONS ARCHITECT'] })

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="text-neutral mb-2 block text-3xl font-bold">Hi - I'm Akuphe Dieudonne</span>
            <span className="text-accent block text-[1.75rem] font-bold">{role}</span>
          </h1>

          <h2 className="text-neutral mt-3">
            Automating infrastructure, optimizing cloud costs, and building bulletproof CI/CD pipelines. I turn complex deployments into one-click operations and transform "it works on my machine" into "it works everywhere."
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              aria-label="Hire Me"
              className="bg-accent text-primary hover:opacity-90 cursor-pointer rounded-lg px-6 py-2.5 text-center text-sm font-medium transition-all duration-300">
              Hire Me
            </a>
            <a
              href="https://www.linkedin.com/in/akuphe-aws/"
              target="_blank"
              aria-label="View LinkedIn Profile"
              className="text-accent bg-primary border border-accent hover:bg-accent hover:text-primary cursor-pointer rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300">
              LinkedIn
            </a>
            <a
              href="/Akuphe_Dieudonne_DevOps_Engineer_Resume.pdf"
              download="Akuphe_Dieudonne_DevOps_Engineer_Resume.pdf"
              aria-label="Download Resume"
              className="bg-accent text-primary hover:opacity-90 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300">
              Resume
            </a>
          </div>

        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <Image
              src={HeroImage}
              fill={true}
              priority={true}
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              alt="Akuphe Dieudonne - DevOps & Cloud Engineer"
              className="object-contain p-7"
            />
            <Ellipse
              ref={ellipseRef}
              className="absolute top-0 left-0 size-56 transition-transform duration-500 ease-out sm:size-60 md:size-[20rem] lg:size-[25.75rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
