const stats = [
  { value: '50k+', label: 'Verified Workers', delay: '0s' },
  { value: '100+', label: 'Material Partners', delay: '1s' },
  { value: '25+', label: 'Districts Covered in TN', delay: '2s' },
  { value: '10k+', label: 'Homes Designed', delay: '3s' },
]

export default function StatsBanner() {
  return (
    <section className="py-16 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 grid grid-cols-10 h-full w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="border-r border-white/20 h-full" />
        ))}
      </div>
      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map(({ value, label, delay }) => (
            <div key={label} className="floating-anim" style={{ animationDelay: delay }}>
              <div className="text-5xl font-bold text-indigo-400 mb-2">{value}</div>
              <div className="text-xs font-semibold text-slate-400 tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
