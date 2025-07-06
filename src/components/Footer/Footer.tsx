import { footerLinks } from '@/appData'
import { socials } from '@/appData/personal'
import Logo from '../Navbar/Logo'

const Footer = () => {
  return (
    <footer className="bg-secondary relative flex flex-col gap-8 overflow-hidden px-4 py-8 md:p-10">
      <div className="relative z-20 grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-12">
        <div>
          <h5 className="mb-3 flex items-center gap-2">
            <Logo width={30} height={24} />
            <span className="text-neutral text-lg font-medium">akuphe_dieudonne</span>
          </h5>
          <div className="flex gap-3">
            {socials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110">
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 md:justify-center">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className="text-tertiary-content hover:text-neutral text-sm transition-colors duration-300">
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-tertiary-content md:justify-end">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"/>
          </svg>
          <span>Carbon neutral hosting</span>
        </div>
      </div>

      <div className="relative z-20 border-t border-border pt-4 text-center">
        <p className="text-tertiary-content text-xs">
          © 2025 Akuphe Dieudonne. All Rights Reserved.
        </p>
      </div>

      <div className="bg-neutral/4 absolute top-1/2 -right-[40%] z-0 h-[120dvw] w-[120dvw] -translate-y-1/2 rounded-full p-14 md:top-0 md:-right-[255px] md:-bottom-[450px] md:size-[1030px] md:-translate-y-0 md:p-20">
        <div className="bg-neutral/4 size-full rounded-full p-14 md:p-20">
          <div className="bg-neutral/5 size-full rounded-full" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
