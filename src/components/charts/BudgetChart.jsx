import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatINRShort } from '../../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg px-4 py-3 text-sm">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {formatINRShort(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function BudgetChart({ data, dark = false }) {
  const textColor = dark ? '#9ca3af' : '#6b7280'
  const gridColor = dark ? '#2a2a2a' : '#f3f4f6'
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatINRShort} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, color: textColor }} />
        <Bar dataKey="homeowners" name="Homeowners" fill="#f2711c" radius={[6, 6, 0, 0]} />
        <Bar dataKey="vendors" name="Vendors" fill="#4f46e5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
