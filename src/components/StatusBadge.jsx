function StatusBadge({ status }) {
  const badgeClass =
    status === 'Applied'
      ? 'bg-primary'
      : status === 'Interview'
      ? 'bg-warning text-dark'
      : status === 'Rejected'
      ? 'bg-danger'
      : status === 'Offer'
      ? 'bg-success'
      : 'bg-secondary';

  return <span className={`badge ${badgeClass}`}>{status}</span>;
}

export default StatusBadge;