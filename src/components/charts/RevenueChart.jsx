import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatINRShort } from '../../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg px-4 py-3">
        <p className="text-xs font-bold text-gray-500 uppercase mb-1">{label}</p>
        <p className="text-lg font-black text-orange-600">{formatINRShort(payload[0].value)}</p>
        {payload[1] && <p className="text-sm text-gray-500">{payload[1].value} orders</p>}
      </div>
    )
  }
  return null
}

export default function RevenueChart({ data, dark = false }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f2711c" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f2711c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#2a2a2a' : '#f3f4f6'} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: dark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatINRShort} tick={{ fontSize: 11, fill: dark ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="revenue" stroke="#f2711c" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#f2711c' }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
