import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectHandler() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Checking link...");
  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("shortUrls");
    if (!saved) {
      setMsg("No URLs found in storage");
      setStatus("error");
      return;
    }

    const urls = JSON.parse(saved);
    const found = urls.find((u) => {
      if (u.shortCode) return u.shortCode === shortCode;
      if (u.short) {
        try {
          const code = String(u.short).split("/").pop();
          return code === shortCode;
        } catch (_) {
          return false;
        }
      }
      return false;
    });

    if (!found) {
      setMsg("Short URL not found");
      setStatus("error");
      return;
    }

    setMsg("Redirecting...");
    setStatus("success");

    try {
      const updated = urls.map((u) => {
        const matches = u === found || (u.shortCode && u.shortCode === found.shortCode) || (u.short && u.short === found.short);
        if (!matches) return u;
        return {
          ...u,
          clicks: typeof u.clicks === "number" ? u.clicks + 1 : 1,
        };
      });
      localStorage.setItem("shortUrls", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist click increment", e);
    }

    let p = 0;
    const timer = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        window.location.href = found.original;
      }
    }, 400);
  }, [shortCode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2
          className={`text-2xl font-bold mb-4 ${
            status === "error" ? "text-red-600" : "text-gray-800"
          }`}
        >
          {msg}
        </h2>

        
        {status !== "error" && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className="bg-blue-500 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

  
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go to Home
          </button>

          {status === "error" && (
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RedirectHandler;
