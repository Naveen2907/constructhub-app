const signals = [
  {
    icon: 'map',
    accent: 'border-orange-400',
    iconColor: 'text-orange-500',
    title: 'Regional Precision',
    desc: 'Dynamic pricing and material standards specific to individual Tamil Nadu districts, from Chennai to Kanyakumari.',
  },
  {
    icon: 'receipt_long',
    accent: 'border-indigo-600',
    iconColor: 'text-indigo-600',
    title: 'GST Transparency',
    desc: 'Seamless invoicing and complete legal compliance for every transaction, ensuring tax efficiency and audit-ready records.',
  },
  {
    icon: 'security',
    accent: 'border-emerald-500',
    iconColor: 'text-emerald-600',
    title: 'AI Validation',
    desc: 'Automatic placement logic for appliances and structural safety audits — every design is both beautiful and resilient.',
  },
]

export default function TrustSignals() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {signals.map(({ icon, accent, iconColor, title, desc }) => (
            <div key={title} className={`p-8 border-l-4 bg-slate-50 rounded-r-2xl ${accent}`}>
              <span className={`material-symbols-outlined mb-4 block text-3xl ${iconColor}`}>{icon}</span>
              <h3 className="font-headline font-semibold text-xl mb-3">{title}</h3>
              <p className="text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
