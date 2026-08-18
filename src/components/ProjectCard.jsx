import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";

/**
 * ProjectCard
 * Fully generic/reusable: every piece of content comes in via props,
 * nothing is hardcoded here. Rendered by mapping over src/data/projects.js
 * on the Projects page.
 *
 * `expanded` is local state scoped to THIS component instance, so
 * clicking "View Details" on one card never affects any other card.
 */
function ProjectCard({ id, title, description, tech, link }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>

      {/* prop-drilling level 2: tech array is handed down to ProjectInfo */}
      {expanded && <ProjectInfo tech={tech} />}

      <div className="project-card-actions">
        <button
          className="view-details-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Hide Details" : "View Details"}
        </button>
        <Link to={`/projects/${id}`} className="project-link-btn">
          Full Page
        </Link>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="project-link-btn">
            <i className="fab fa-github"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
