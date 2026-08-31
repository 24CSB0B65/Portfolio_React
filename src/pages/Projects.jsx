import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/projects"
        );

        if (!response.ok) {
          throw new Error("Failed to load projects.");
        }

        const data = await response.json();

        console.log("Projects received:", data);

        setProjects(data.data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load projects. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects">
        <h1>My Projects</h1>
        <p style={{ textAlign: "center" }}>
          Loading projects...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects">
        <h1>My Projects</h1>
        <p style={{ textAlign: "center" }}>
          {error}
        </p>
      </section>
    );
  }

  return (
    <section id="projects">
      <h1>My Projects</h1>

      <div className="project-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;