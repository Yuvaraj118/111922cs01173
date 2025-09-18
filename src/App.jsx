import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import AdminPanel from './components/AdminPanel';
import RedirectHandler from './components/RedirectHandler';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              URL Shortener
            </Link>
            <div className="navbar-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<UrlShortener />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/:shortCode" element={<RedirectHandler />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
