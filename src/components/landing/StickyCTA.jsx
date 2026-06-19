import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/navigation'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <button
        onClick={() => navigate(ROUTES.aiBuilder)}
        className="bg-orange-500 text-white px-8 py-4 rounded-full font-semibold shadow-2xl flex items-center gap-2 hover:scale-105 hover:bg-orange-600 active:scale-95 transition-all"
      >
        Get Started
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  )
}
