import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shortUrls");
    if (saved) setUrls(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }, [urls]);

  const deleteUrl = (id) => {
    setUrls((prev) => prev.filter((u) => u.id !== id));
    showToast("URL deleted!");
  };

  const copyUrl = (short) => {
    navigator.clipboard.writeText(short);
    showToast("Short URL copied!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const filteredUrls = urls.filter(
    (u) =>
      u.original.toLowerCase().includes(search.toLowerCase()) ||
      u.short.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h1 className="mb-3 mb-md-0 text-primary">Admin Panel</h1>
        <input
          type="text"
          placeholder="Search URLs..."
          className="form-control w-100 w-md-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">Total URLs</h6>
              <h3 className="text-primary">{urls.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Clicks</h6>
              <h3 className="text-success">
                {urls.reduce((sum, u) => sum + (u.clicks || 0), 0)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          {filteredUrls.length === 0 ? (
            <p className="p-4 text-center text-muted">No URLs found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Original URL</th>
                    <th>Short URL</th>
                    <th>Created At</th>
                    <th>Clicks</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrls.map((url) => (
                    <tr key={url.id}>
                      <td className="text-truncate" style={{ maxWidth: "250px" }}>
                        <a
                          href={url.original}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none text-primary"
                        >
                          {url.original}
                        </a>
                      </td>
                      <td>{url.short}</td>
                      <td>{new Date(url.createdAt).toLocaleString()}</td>
                      <td>{url.clicks}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => copyUrl(url.short)}
                        >
                          Copy
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteUrl(url.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-4"
          role="alert"
        >
          <div className="toast-body bg-dark text-white rounded shadow">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
