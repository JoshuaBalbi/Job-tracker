import { useMemo, useState } from 'react';
import StatusBadge from '../components/StatusBadge';

function Applications({
  applications,
  addApplication,
  deleteApplication,
  editApplication,
}) {
  const emptyForm = {
    company: '',
    role: '',
    status: 'Applied',
    dateApplied: '',
    location: '',
    notes: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 2500);
  };

  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const searchableText = `${app.company} ${app.role} ${app.location} ${app.notes}`.toLowerCase();
        const matchesSearch = searchableText.includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === 'All' || app.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dateApplied || 0);
        const dateB = new Date(b.dateApplied || 0);

        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [applications, searchTerm, statusFilter, sortOrder]);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowFormModal(true);
  };

  const openEditModal = (app) => {
    setEditingId(app.id);

    setFormData({
      company: app.company,
      role: app.role,
      status: app.status,
      dateApplied: app.dateApplied,
      location: app.location,
      notes: app.notes || '',
    });

    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      editApplication({
        ...formData,
        id: editingId,
      });

      showToast('Application updated successfully.');
    } else {
      addApplication(formData);
      showToast('Application added successfully.');
    }

    closeFormModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (confirmed) {
      deleteApplication(id);
      showToast('Application deleted successfully.', 'danger');
    }
  };

  return (
    <div className="applications-page">
      <div className="app-hero card border-0 shadow-sm mb-4">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <p className="text-uppercase text-primary fw-semibold small mb-1">
              Job Search Dashboard
            </p>
            <h1 className="fw-bold text-dark mb-1">Applications</h1>
            <p className="text-secondary mb-0">
              Manage, filter, and track every job opportunity in one clean view.
            </p>
          </div>

          <button className="btn btn-primary btn-lg px-4 shadow-sm" onClick={openAddModal}>
            + Add Application
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Search</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search company, role, location, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select form-select-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
                <option>Offer</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Sort</label>
              <select
                className="form-select form-select-lg"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="alert alert-info shadow-sm border-0">
          No applications match your current search or filter.
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="table-responsive application-table-wrapper">
            <table className="table table-hover align-middle mb-0 application-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Location</th>
                  <th>Notes</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="fw-bold text-dark">{app.company}</div>
                    </td>

                    <td>
                      <span className="text-secondary">{app.role}</span>
                    </td>

                    <td>
                      <StatusBadge status={app.status} />
                    </td>

                    <td>{app.dateApplied || 'N/A'}</td>

                    <td>{app.location || 'N/A'}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-light border notes-btn"
                        onClick={() =>
                          setSelectedNotes({
                            company: app.company,
                            role: app.role,
                            notes: app.notes || 'No notes added for this application.',
                          })
                        }
                      >
                        View Notes
                      </button>
                    </td>

                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary action-btn"
                          onClick={() => openEditModal(app)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger action-btn"
                          onClick={() => handleDelete(app.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showFormModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {editingId ? 'Edit Application' : 'Add Application'}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeFormModal}
                  ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Company</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <input
                          type="text"
                          className="form-control"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option>Applied</option>
                          <option>Interview</option>
                          <option>Rejected</option>
                          <option>Offer</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Date Applied</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dateApplied"
                          value={formData.dateApplied}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Notes</label>
                        <textarea
                          className="form-control"
                          name="notes"
                          rows="4"
                          placeholder="Recruiter name, interview notes, follow-up reminders..."
                          value={formData.notes}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={closeFormModal}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-primary px-4">
                      {editingId ? 'Save Changes' : 'Add Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}

      {selectedNotes && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <div>
                    <h5 className="modal-title fw-bold">Application Notes</h5>
                    <small className="text-secondary">
                      {selectedNotes.company} — {selectedNotes.role}
                    </small>
                  </div>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedNotes(null)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p className="notes-text mb-0">{selectedNotes.notes}</p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedNotes(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}

      {toast.show && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1100 }}
        >
          <div className={`toast show text-bg-${toast.type} border-0 shadow`}>
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>

              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() =>
                  setToast({ show: false, message: '', type: 'success' })
                }
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;