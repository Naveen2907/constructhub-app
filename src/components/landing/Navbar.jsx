import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'
import avatar from '../../assets/avatar.jpg'


export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200/50 shadow-[0_8px_30px_rgb(79,70,229,0.04)] fixed top-0 w-full z-50 flex items-center justify-between px-8 h-20">
      <div className="text-2xl font-light tracking-widest text-slate-900 uppercase">ConstructHub</div>
      <nav className="hidden md:flex gap-8 items-center">
        {[
          { label: 'Home', href: '/' },
          { label: 'Designer', href: ROUTES.aiBuilder },
          { label: 'Marketplace', href: ROUTES.marketplace },
          { label: 'Workforce', href: ROUTES.workforce },
        ].map(({ label, href }) => (
          <a
            key={label}
            onClick={() => navigate(href)}
            className="font-sans tracking-tight text-slate-500 hover:text-indigo-500 transition-colors duration-300 cursor-pointer first:text-indigo-600 first:font-semibold first:border-b-2 first:border-indigo-600"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-slate-600 cursor-pointer hover:text-indigo-600 transition-colors">notifications</button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
          <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  )
}
