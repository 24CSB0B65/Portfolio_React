/**
 * About
 * Content carried over directly from the original about.html static page.
 */
function About() {
  return (
    <>
      <div className="about-section">
        <img
          src="/a4.jpg"
          alt="Profile"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            Hello! I am an aspiring Software Developer and Computer Science
            student. My interests include Web Development, Java Programming,
            Database Management Systems, and Software Engineering. I enjoy
            designing and developing applications that are efficient,
            user-friendly, and visually appealing. I am currently expanding
            my skills through academic projects and hands-on learning
            experiences while seeking opportunities to grow as a developer.
          </p>
        </div>
      </div>

      <section id="skills">
        <h2>My Skills</h2>
        <div className="skills-container">
          {["HTML", "CSS", "JavaScript", "Java", "MySQL", "Git & GitHub"].map(
            (skill) => (
              <div className="skill-card" key={skill}>
                {skill}
              </div>
            )
          )}
        </div>
      </section>

      <section id="education">
        <h1>Education</h1>
        <div className="edu-card">
          <h3>Bachelor of Technology (B.Tech)</h3>
          <h4>Computer Science and Engineering</h4>
          <p>National Institute of Technology, Warangal</p>
          <p>2024 – 2028</p>
        </div>
      </section>

      <section id="social">
        <h2>Connect With Me</h2>
        <div className="social-links">
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
          <a href="https://wa.me/917981238773" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

export default About;
