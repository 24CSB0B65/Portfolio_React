import { Link, useParams } from "react-router-dom";
import ProjectInfo from "../components/ProjectInfo";
import projects from "../data/projects";

/**
 * ProjectDetails
 * Dynamic route /projects/:projectId. Reads the id from the URL with
 * useParams, looks the project up in the shared data source, and
 * drills the tech list down into <ProjectInfo /> (grandchild).
 */
function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section id="projects">
        <h1>Project Not Found</h1>
        <p style={{ textAlign: "center" }}>
          We couldn't find a project with id "{projectId}".
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
