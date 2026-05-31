export default function SearchBar({ value, onChange, placeholder = 'Search...', dark = false }) {
  return (
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pl-10 pr-4 py-2.5 rounded-full text-sm w-full focus:outline-none focus:ring-2 transition-all ${
          dark
            ? 'bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:ring-orange-500'
            : 'bg-gray-100 border border-transparent text-gray-900 placeholder-gray-400 focus:ring-orange-400 focus:bg-white'
        }`}
      />
    </div>
  )
}
