import React, { useState, useEffect } from "react";

function UrlShortener() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shortUrls");
    if (saved) setUrls(JSON.parse(saved));
  }, []);

  const makeCode = () => Math.random().toString(36).slice(2, 8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;

    let original = url.trim();
    if (!original.startsWith("http://") && !original.startsWith("https://")) {
      original = "https://" + original;
    }

    try {
      new URL(original);
    } catch {
      showMsg("⚠️ Enter a valid URL (like https://example.com)", "danger");
      return;
    }

    if (urls.some((u) => u.original === original)) {
      showMsg("⚠️ This URL is already shortened.", "warning");
      return;
    }

    let code = makeCode();
    while (urls.some((u) => u.shortCode === code)) {
      code = makeCode();
    }

    const short = window.location.origin + "/" + code;
    const newUrl = {
      id: Date.now(),
      original,
      short,
      shortCode: code,
      createdAt: new Date().toLocaleString(),
      clicks: 0,
    };

    const updated = [newUrl, ...urls];
    setUrls(updated);
    localStorage.setItem("shortUrls", JSON.stringify(updated));
    setUrl("");
    showMsg("✅ URL shortened successfully!", "success");
  };

  const copy = (txt) => {
    navigator.clipboard.writeText(txt);
    showMsg("📋 Copied to clipboard!", "info");
  };

  const showMsg = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">🔗 URL Shortener</h1>

      {msg && (
        <div
          className={`alert alert-${msg.type} alert-dismissible fade show`}
          role="alert"
        >
          {msg.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="card shadow-sm mb-4 p-3 bg-light"
      >
        <div className="input-group">
          <input
            type="url"
            className="form-control"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Shorten
          </button>
        </div>
      </form>

      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Your Shortened Links</h5>
          <span className="badge bg-primary">
            Total: {urls.length}
          </span>
        </div>

        <div className="card-body p-0">
          {urls.length === 0 ? (
            <p className="text-muted text-center p-4 mb-0">
              No URLs shortened yet.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
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
                  {urls.map((u) => (
                    <tr key={u.id}>
                      <td style={{ maxWidth: "250px" }}>
                        <a
                          href={u.original}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none text-primary"
                        >
                          {u.original}
                        </a>
                      </td>
                      <td>{u.short}</td>
                      <td>{u.createdAt}</td>
                      <td>{u.clicks}</td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-success"
                            onClick={() => copy(u.short)}
                          >
                            Copy
                          </button>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => window.open(u.short, "_blank")}
                          >
                            Open
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrlShortener;
