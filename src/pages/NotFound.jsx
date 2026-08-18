import { Link } from "react-router-dom";

/**
 * NotFound
 * Catch-all route (path="*") for any unmatched URL.
 */
function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Sorry, that page doesn't exist.</p>
      <Link to="/" className="resume-btn">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
