import { NavLink } from 'react-router-dom'

import BrandLogo from './BrandLogo'

const quickLinks = [
  { label: 'Legacy', to: '/legacy' },
  { label: 'Services', to: '/services' },
  { label: 'Our Diamonds', to: '/our-diamonds' },
  { label: 'Contact', to: '/contact' },
]

function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_48%),linear-gradient(135deg,#3a3a3a_0%,#2b2b2b_40%,#383838_100%)]"
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_auto_1fr] lg:px-14 xl:px-20 2xl:px-24">
        <div className="text-center lg:text-left">
          <h3 className="font-copy text-[13px] font-medium tracking-[0.02em] text-stone-100">Contact</h3>
          <div className="mt-4 space-y-2 font-copy text-[12px] leading-relaxed text-stone-300">
            <p>+97144390374</p>
            <p>dubai@samirgems.com</p>
            <p>
              14 A, Almas Tower, Level 14,
              <br />
              Jumeriah Lake Towers,
              <br />
              Dubai, UAE
            </p>
          </div>
        </div>

        <div className="grid justify-items-center gap-5">
          <BrandLogo className="h-[70px] w-[114px] md:h-[78px] md:w-[126px]" />
          <div className="flex items-center gap-4 font-sans text-[15px] text-stone-300">
            <span>ig</span>
            <span>f</span>
            <span>x</span>
            <span>in</span>
          </div>
        </div>

        <div className="text-center lg:text-right">
          <h3 className="font-copy text-[13px] font-medium tracking-[0.02em] text-stone-100">Quick Links</h3>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 font-copy text-[12px] leading-relaxed text-stone-300 lg:justify-items-end">
            {quickLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className="transition hover:text-white">
                {item.label}
              </NavLink>
            ))}
            <a href="/" className="transition hover:text-white">
              Terms & Conditions
            </a>
            <a href="/" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8 py-3 text-center font-copy text-[11px] text-stone-400">
        © 2025 Sameer Gems DMCC. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
