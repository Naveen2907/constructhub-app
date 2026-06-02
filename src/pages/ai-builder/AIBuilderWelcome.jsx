import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { samplePrompt, tamilPrompt } from './aiHomeBuilderData'

export default function AIBuilderWelcome() {
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [prompt, setPrompt] = useState(samplePrompt)
  const [language, setLanguage] = useState('English')

  const EXAMPLES = [
    samplePrompt,
    'Create a duplex villa in Coimbatore with lift, terrace garden, rainwater harvesting, budget Rs.80 Lakhs',
    'Build a compact 2BHK house in Madurai with open kitchen, pooja niche, and low maintenance finishes',
    tamilPrompt,
  ]

  const startVoice = () => {
    setListening(true)
    setPrompt('Listening...')
    setTimeout(() => {
      setPrompt(language === 'Tamil' ? tamilPrompt : samplePrompt)
      setTimeout(() => { setListening(false); navigate('/ai-builder/canvas') }, 900)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-luxe-surface blueprint-grid flex flex-col items-center justify-center p-5 md:p-8 relative overflow-hidden">
      <div className="fixed top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent via-indigo-200/50 to-transparent pointer-events-none" />
      <div className="fixed top-0 bottom-0 right-4 w-px bg-gradient-to-b from-transparent via-indigo-200/50 to-transparent pointer-events-none" />

      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600">architecture</span>
          <span className="text-xl font-bold text-gray-900 font-headline tracking-tight">ConstructHub AI Home Builder</span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">TN READY</span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-gray-500">close</span>
        </button>
      </div>

      <div className="relative z-10 max-w-6xl w-full grid lg:grid-cols-[1fr_420px] gap-8 items-center mt-20">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-3 py-1 mb-5 shadow-sm">
            <span className="material-symbols-outlined text-indigo-600 text-base">auto_awesome</span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Flagship AI Design Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 font-headline tracking-tight leading-tight mb-5">
            Design, estimate, buy, build, and maintain a home from one prompt.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Generate floor plans, room dimensions, 3D visualization, localized INR costs, material carts, workforce plans, energy intelligence, compliance checks, and export-ready reports for Indian homes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              ['Floor Plan', 'architecture'],
              ['3D Viewer', 'view_in_ar'],
              ['Cost + BOM', 'receipt_long'],
              ['Marketplace', 'shopping_cart'],
            ].map(([label, icon]) => (
              <div key={label} className="bg-white/80 border border-white rounded-2xl p-4 shadow-sm">
                <span className="material-symbols-outlined text-indigo-600 mb-3">{icon}</span>
                <p className="font-bold text-sm text-gray-900">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-white shadow-ambient-lg rounded-3xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-black text-gray-900">Tell AI what to build</h2>
              <p className="text-xs text-gray-500 mt-1">Voice and text prompts support English and Tamil.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['English', 'Tamil'].map(item => (
                <button
                  key={item}
                  onClick={() => {
                    setLanguage(item)
                    setPrompt(item === 'Tamil' ? tamilPrompt : samplePrompt)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${language === item ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={prompt}
            onChange={event => setPrompt(event.target.value)}
            rows={6}
            className="w-full resize-none bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={startVoice}
              className={`flex-1 py-3 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95 ${listening ? 'bg-red-500 shadow-lg shadow-red-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}
            >
              <span className="material-symbols-outlined text-lg">mic</span>
              {listening ? 'Listening...' : 'Use Voice'}
            </button>
            <button
              onClick={() => navigate('/ai-builder/canvas')}
              className="flex-1 py-3 rounded-2xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Generate Plan
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-3">Try these examples</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setPrompt(ex)}
                className="text-left p-3 bg-slate-50 rounded-2xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-indigo-400 text-sm mt-0.5 group-hover:text-indigo-600">auto_awesome</span>
                  <p className="text-xs text-gray-700 font-medium leading-snug">"{ex}"</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">AI Engine Active - Chennai rates loaded</span>
      </div>
    </div>
  )
}
