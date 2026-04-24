function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body text-center">
          <p className="text-muted mb-1">{title}</p>
          <h2 className="fw-bold text-dark">{value}</h2>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </div>
    </div>
  );
}


export default DashboardCard;