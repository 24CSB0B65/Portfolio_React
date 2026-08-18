// Central project data source.
// Each object is passed entirely via props into <ProjectCard />
// (no content is hardcoded inside the component itself).
const projects = [
  {
    id: "pips",
    title: "PIPS - Personal Income Prediction System",
    description:
      "Personal Income Prediction System that predicts income levels using Machine Learning algorithms based on user attributes and demographic data.",
    tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    image: "project-pips.jpg",
    link: "https://github.com/24CSB0B65",
  },
  {
    id: "portfolio-website",
    title: "Single Page Portfolio Website",
    description:
      "Responsive personal portfolio website developed using HTML and CSS to showcase skills, projects, and contact information.",
    tech: ["HTML5", "CSS3", "Responsive Design"],
    image: "project-portfolio.jpg",
    link: "https://github.com/24CSB0B65",
  },
  {
    id: "library-management",
    title: "Library Management System",
    description:
      "System for managing books, issue and return records, and member details using Java and MySQL.",
    tech: ["Java", "MySQL", "JDBC"],
    image: "project-library.jpg",
    link: "https://github.com/24CSB0B65",
  },
  {
    id: "student-record",
    title: "Student Record Management",
    description:
      "Application for storing and managing student details, marks, attendance, and academic records.",
    tech: ["Java", "MySQL"],
    image: "project-student.jpg",
    link: "https://github.com/24CSB0B65",
  },
];

export default projects;
