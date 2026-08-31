import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectInfo from "../components/ProjectInfo";

function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/projects/${projectId}`
        );

        if (response.status === 404) {
          setError("Project not found.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load project.");
        }

        const data = await response.json();

        console.log("Project received:", data);

        setProject(data.data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load project. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <section id="projects">
        <h1>Loading project...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects">
        <h1>Project Not Found</h1>

        <p style={{ textAlign: "center" }}>
          {error}
        </p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/projects" className="resume-btn">
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="projects">
      <h1>{project.title}</h1>

      <div className="project-detail-card">
        <p>{project.description}</p>

        <h3>Tech Stack</h3>

        <ProjectInfo tech={project.tech} />

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
          >
            View on GitHub
          </a>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/projects" className="project-link-btn">
          &larr; Back to Projects
        </Link>
      </div>
    </section>
  );
}

export default ProjectDetails;