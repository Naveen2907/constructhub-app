import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

export function FinalCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-600 rounded-[48px] p-16 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <h2 className="font-headline text-4xl font-bold mb-4 relative z-10">
            Ready to build your dream home?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto relative z-10">
            Join thousands of architects, builders and homeowners redefining the Tamil Nadu landscape.
          </p>
          <button
            onClick={() => navigate(ROUTES.aiBuilder)}
            className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all active:scale-95 relative z-10 inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            Launch AI Home Builder
          </button>
          <p className="text-white/50 text-xs mt-4 relative z-10">Free to design · No credit card required</p>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <div>
          <div className="text-lg font-light tracking-widest text-slate-900 uppercase mb-1">ConstructHub</div>
          <p className="text-xs text-slate-400">© 2024 ConstructHub. Atmospheric precision for Tamil Nadu's next architectural era.</p>
        </div>
        <div className="flex gap-8">
          {[
            { label: 'Support', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="text-xs uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
