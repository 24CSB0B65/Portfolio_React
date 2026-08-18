import ContactForm from "../components/ContactForm";

/**
 * Contact
 * Content carried over from contact.html, with the static form replaced
 * by the controlled <ContactForm /> component.
 */
function Contact() {
  return (
    <>
      <section id="social">
        <h2>Connect With Me</h2>
        <p>📧 Email: sd24csb0b65@student.nitw.ac.in</p>
        <p>📱 Phone: +91 7981238773</p>
        <p>📍 Location: Vijayawada, Andhra Pradesh, India</p>

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

      <div className="container1">
        <div className="title">Send Me a Message</div>
        <ContactForm />
      </div>
    </>
  );
}

export default Contact;
