export default function EmptyState({ icon = 'inbox', title = 'Nothing here yet', description = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl text-gray-400">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-700 font-headline mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-400 max-w-xs mb-6">{description}</p>}
      {action && action}
    </div>
  )
}
