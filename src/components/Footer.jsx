/**
 * Footer
 * Persists across every route because it lives inside the shared
 * Layout rendered by App.jsx (Navbar + <Outlet /> + Footer).
 */
function Footer() {
  return (
    <footer className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} Deekshitha Sanikommu — Built with
        React &amp; React Router
      </p>
      <div className="social-links footer-social">
        <a href="https://github.com/24CSB0B65" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/deekshitha-sanikommu-4739bb373/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="mailto:sd24csb0b65@student.nitw.ac.in">
          <i className="fas fa-envelope"></i> Gmail
        </a>
      </div>
    </footer>
  );
}

export default Footer;
