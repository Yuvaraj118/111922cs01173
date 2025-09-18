import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shortUrls");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const normalized = Array.isArray(parsed)
          ? parsed.map((u) => {
              const derivedShort = u.short || (u.shortCode ? `${window.location.origin}/${u.shortCode}` : "");
              return {
                id: u.id || u.shortCode || u.short || u.original,
                original: u.original || "",
                short: derivedShort,
                shortCode: u.shortCode || (typeof u.short === "string" ? u.short.replace(/^.*\//, "") : undefined),
                createdAt: u.createdAt || u.created_at || null,
                clicks: typeof u.clicks === "number" ? u.clicks : 0,
              };
            })
          : [];
        setUrls(normalized);
      } catch (e) {
        console.error("Failed to parse shortUrls from storage", e);
        setUrls([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("shortUrls", JSON.stringify(urls));
  }, [urls, hydrated]);

  const deleteUrl = (identifier) => {
    setUrls((prev) =>
      prev.filter((u) => u.id !== identifier && (u.shortCode ? u.shortCode !== identifier : true))
    );
    showToast("URL deleted!");
  };

  const copyUrl = (item) => {
    const valueToCopy = item.short || (item.shortCode ? `${window.location.origin}/${item.shortCode}` : "");
    if (!valueToCopy) return;
    navigator.clipboard.writeText(valueToCopy);
    showToast("Short URL copied!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const filteredUrls = urls.filter((u) => {
    const q = search.toLowerCase();
    const shortDisplay = u.short || (u.shortCode ? `${window.location.origin}/${u.shortCode}` : "");
    return (
      (u.original || "").toLowerCase().includes(q) ||
      (shortDisplay || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="container my-5">
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
                      <td>{url.short || (url.shortCode ? `${window.location.origin}/${url.shortCode}` : "-")}</td>
                      <td>{
                        url.createdAt
                          ? (isNaN(Date.parse(url.createdAt))
                              ? String(url.createdAt)
                              : new Date(url.createdAt).toLocaleString())
                          : "-"
                      }</td>
                      <td>{typeof url.clicks === "number" ? url.clicks : 0}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => copyUrl(url)}
                        >
                          Copy
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteUrl(url.id || url.shortCode)}
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

      {toast && (
        <div
          className="position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 1050 }}
        >
          <div className="alert alert-dark shadow mb-0">{toast}</div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
