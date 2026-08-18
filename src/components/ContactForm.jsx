import { useState } from "react";

const initialForm = { name: "", email: "", message: "" };

/**
 * ContactForm
 * Fully controlled: every input's value comes from state and every
 * change goes through onChange. `errors` tracks per-field validation
 * and is used to disable the submit button until the form is valid.
 */
function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values) {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Name is required.";
    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) newErrors.message = "Message can't be empty.";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setErrors(validate(updated));
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
    }
  }

  const isValid =
    form.name.trim() && form.email.trim() && form.message.trim() &&
    Object.keys(validate(form)).length === 0;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="input-box1">
        <span className="details1">Name</span>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="input-box1">
        <span className="details1">Email</span>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="input-box1">
        <span className="details1">Message</span>
        <textarea
          name="message"
          rows="4"
          placeholder="Write your message"
          value={form.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      <div className="button1">
        <input type="submit" value="Send Message" disabled={!isValid} />
      </div>

      {submitted && <p className="form-success">Thanks! Your message has been noted.</p>}
    </form>
  );
}

export default ContactForm;
