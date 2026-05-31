export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button' }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    dark: 'btn-dark',
    indigo: 'btn-indigo',
    outline: 'btn-outline',
    ghost: 'text-gray-600 hover:bg-gray-100 font-medium px-4 py-2 rounded-xl transition-all',
    danger: 'bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl transition-all active:scale-95',
  }
  const sizes = { sm: 'text-xs px-3 py-2', md: '', lg: 'text-base px-8 py-4' }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
