import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';

function Dashboard({ applications = [] }) {
  const total = applications.length;
  const applied = applications.filter((app) => app.status === 'Applied').length;
  const interviews = applications.filter((app) => app.status === 'Interview').length;
  const rejected = applications.filter((app) => app.status === 'Rejected').length;
  const offers = applications.filter((app) => app.status === 'Offer').length;

  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.dateApplied || 0) - new Date(a.dateApplied || 0))
    .slice(0, 5);

  return (
    <div>
      <div className="dashboard-hero card border-0 shadow-sm mb-4">
        <div className="card-body">
          <p className="text-uppercase text-primary fw-semibold small mb-1">
            Job Search Overview
          </p>
          <h1 className="fw-bold text-dark mb-1">Dashboard</h1>
          <p className="text-secondary mb-0">
            Track your progress, interviews, offers, and recent activity.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <DashboardCard title="Total Applications" value={total} />
        <DashboardCard title="Applied" value={applied} />
        <DashboardCard title="Interviews" value={interviews} />
        <DashboardCard title="Rejected" value={rejected} />
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-3">Performance Snapshot</h5>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-secondary">Interview Rate</span>
                  <span className="fw-bold">{interviewRate}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${interviewRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-secondary">Offer Rate</span>
                  <span className="fw-bold">{offerRate}%</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${offerRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="alert alert-light border mt-4 mb-0">
                <strong>Quick Insight:</strong>{' '}
                {interviews > 0
                  ? `You have ${interviews} interview-stage application${
                      interviews > 1 ? 's' : ''
                    }.`
                  : 'No interviews yet. Keep applying consistently.'}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-3">Recent Applications</h5>

              {recentApplications.length === 0 ? (
                <p className="text-secondary mb-0">No applications yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id}>
                          <td className="fw-semibold">{app.company}</td>
                          <td className="text-secondary">{app.role}</td>
                          <td>
                            <StatusBadge status={app.status} />
                          </td>
                          <td>{app.dateApplied || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;