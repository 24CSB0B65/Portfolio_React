import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

/**
 * Projects
 * Maps over the projects array (src/data/projects.js) and passes each
 * object's fields down as props to <ProjectCard /> -- prop-drilling
 * level 1 of the required 2-level chain (Projects -> ProjectCard -> ProjectInfo).
 */
function Projects() {
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
