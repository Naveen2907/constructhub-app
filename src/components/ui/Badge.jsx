import { statusBadge, statusLabel } from '../../utils/helpers'

export default function Badge({ status, label, className = '' }) {
  return (
    <span className={`${statusBadge(status)} ${className}`}>
      {label || statusLabel(status)}
    </span>
  )
}
