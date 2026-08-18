/**
 * ProjectInfo (grandchild component)
 * Receives just the `tech` slice of the project object, drilled down
 * from Projects (page) -> ProjectCard (child) -> ProjectInfo (grandchild).
 * This is level 2 of the prop drilling required by the assignment.
 */
function ProjectInfo({ tech }) {
  return (
    <ul className="project-tech-list">
      {tech.map((item) => (
        <li key={item} className="project-tech-pill">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ProjectInfo;
