import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Navbar
 * - Receives the lifted theme state + setter as props from App.jsx
 *   (state is lifted to the top level and shared down via props).
 * - useEffect + window resize listener demonstrates a subscription
 *   that is cleaned up on unmount to avoid memory leaks.
 * - Header is a two-row flex layout (identity row + hero title row)
 *   instead of absolute positioning, so long text never overlaps.
 * - Images fall back gracefully (hidden) if the asset hasn't been
 *   copied into /public yet, instead of showing a broken-image box.
 */
function Navbar({ theme, toggleTheme }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    // cleanup: remove listener when Navbar unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);
  const hideOnError = (e) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <>
      <div className="header">
        <div className="header-identity">
          <img src="/14.jpg" alt="Deekshitha profile" onError={hideOnError} />
          <h5>
            Deekshitha Sanikommu
            <br />
            BTech, Computer Science and Engineering
            <br />
            National Institute of Technology, Warangal
          </h5>
        </div>
        <div className="right-al">
          <img src="/12.png" alt="logo" onError={hideOnError} />
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark and light theme"
          >
            {theme === "dark" ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>
        </div>
      </div>

      <div className="hero-title">
        <h1>PortFolio WebPage</h1>
      </div>

      <div className="marquee">
        <div className="scroll-text">
          <span className="arrow">🔥</span>
          OPEN TO WORK • WEB DEVELOPER • AVAILABLE FOR INTERNSHIPS •
        </div>
      </div>

      <nav>
        {isMobile && (
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        )}
        <div className={isMobile ? (menuOpen ? "nav-links open" : "nav-links") : "nav-links"}>
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/projects" className={linkClass} onClick={() => setMenuOpen(false)}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
            Contact Info
          </NavLink>
          <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="login">
            CV/Resume
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
