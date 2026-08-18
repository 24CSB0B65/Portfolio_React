import { useEffect, useState } from "react";

/**
 * Home
 * useEffect with an empty dependency array simulates a ~1s loading
 * sequence on mount, showing a loading state until it completes.
 */
function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading portfolio…</p>
      </div>
    );
  }

  return (
    <>
      <div className="intro-box">
        <p>
          Hello! I'm <strong>Deekshitha Sanikommu</strong>, an aspiring
          Software Developer and Computer Science student at NIT Warangal.
          My interests include Web Development, Java Programming, Database
          Management Systems, and Software Engineering. I enjoy designing and
          developing applications that are efficient, user-friendly, and
          visually appealing.
        </p>
      </div>

      <div className="info-container">
        <div className="goal">
          <h2>Career Goal</h2>
          <p>
            Seeking an opportunity in software development to enhance my
            technical skills, gain hands-on experience, and contribute to
            real-time projects in a growth-oriented organization.
          </p>
        </div>

        <div className="facts">
          <h2>Quick Facts</h2>
          <ul>
            <li>🎓 B.Tech CSE, NIT Warangal (2024–2028)</li>
            <li>💻 Languages: C++, Java, JavaScript, SQL</li>
            <li>🌐 Focus: Web Development &amp; DSA</li>
            <li>📍 Based in Vijayawada, Andhra Pradesh</li>
          </ul>
        </div>
      </div>

      <div className="quote">
        <h2>"Code is the closest thing we have to magic."</h2>
      </div>
    </>
  );
}

export default Home;
