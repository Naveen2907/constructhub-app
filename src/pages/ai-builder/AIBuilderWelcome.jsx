import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AIBuilderWelcome() {
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [voiceText, setVoiceText] = useState('')

  const EXAMPLES = [
    '3BHK house with modular kitchen and solar panels',
    '2BHK apartment with open living area',
    'Villa with 4 bedrooms and swimming pool',
    'Commercial space with open floor plan',
  ]

  const startVoice = () => {
    setListening(true)
    setVoiceText('Listening...')
    setTimeout(() => {
      setVoiceText(EXAMPLES[0])
      setTimeout(() => { setListening(false); navigate('/ai-builder/canvas') }, 1200)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-luxe-surface blueprint-grid flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative lines */}
      <div className="fixed top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent via-indigo-200/50 to-transparent pointer-events-none" />
      <div className="fixed top-0 bottom-0 right-4 w-px bg-gradient-to-b from-transparent via-indigo-200/50 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">architecture</span>
          <span className="text-xl font-bold text-gray-900 font-headline tracking-tight">AI Home Builder</span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">PRO</span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-gray-500">close</span>
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center mt-16">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 font-headline tracking-tight leading-tight mb-4">
            Design your dream home<br />
            <span className="text-indigo-600">using simple voice commands.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Speak your vision and watch AI render high-fidelity blueprints in seconds. Tamil Nadu's smartest home design tool.
          </p>
        </div>

        {/* Voice Button */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <button
            onClick={startVoice}
            className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
              listening
                ? 'bg-red-500 shadow-[0_20px_50px_rgba(239,68,68,0.4)]'
                : 'bg-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.45)]'
            }`}
          >
            {listening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-indigo-400/40 animate-ping" />
                <div className="absolute inset-4 rounded-full border-2 border-indigo-400/20 animate-[ping_2s_linear_infinite]" />
              </>
            )}
            <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            <span className="text-white text-sm font-bold">{listening ? 'Listening...' : 'Start with Voice'}</span>
          </button>

          {voiceText && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-4 max-w-md">
              <p className="text-indigo-800 font-medium italic text-sm">"{voiceText}"</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
            <button
              onClick={() => navigate('/ai-builder/canvas')}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-2xl transition-all font-semibold text-gray-700"
            >
              <span className="material-symbols-outlined text-indigo-600">edit_note</span>
              Build Manually
            </button>
          </div>
        </div>

        {/* Example prompts */}
        <div className="w-full">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Try these examples</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => { setVoiceText(ex); setTimeout(() => navigate('/ai-builder/canvas'), 600) }}
                className="text-left p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all shadow-sm group">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-indigo-400 text-sm mt-0.5 group-hover:text-indigo-600">auto_awesome</span>
                  <p className="text-sm text-gray-700 font-medium leading-snug">"{ex}"</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature hints */}
        <div className="grid grid-cols-3 gap-4 mt-10 w-full">
          {[
            { icon: 'auto_awesome', label: 'AI Optimized', color: 'text-green-500' },
            { icon: 'view_in_ar',   label: 'Real-time 3D',  color: 'text-indigo-500' },
            { icon: 'architecture', label: 'Pro Blueprints', color: 'text-orange-500' },
          ].map(({ icon, label, color }) => (
            <div key={label} className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2">
              <span className={`material-symbols-outlined text-2xl ${color}`}>{icon}</span>
              <span className="text-xs font-semibold text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer status */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">AI Engine Active v2.4</span>
      </div>
    </div>
  )
}
