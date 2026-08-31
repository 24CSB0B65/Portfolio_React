import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate(values) {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!values.message.trim()) {
      newErrors.message = "Message can't be empty.";
    }

    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    setForm(updated);
    setErrors(validate(updated));

    // Remove old success/error messages when user starts typing again
    setSubmitted(false);
    setServerError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);

    setErrors(validationErrors);

    // Stop if client-side validation fails
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    try {
      setSubmitting(true);
      setServerError("");
      setSubmitted(false);

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Show the error returned by the server
        throw new Error(
          data.error ||
          data.message ||
          "Failed to send message."
        );
      }

      // Success
      setSubmitted(true);

      // Reset form fields
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      console.error("Contact form error:", err);

      setServerError(
        err.message ||
        "Unable to send message. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.message.trim() &&
    Object.keys(validate(form)).length === 0;

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="input-box1">
        <span className="details1">Name</span>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />

        {errors.name && (
          <span className="field-error">
            {errors.name}
          </span>
        )}
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

        {errors.email && (
          <span className="field-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="input-box1">
        <span className="details1">Message</span>

        <textarea
          name="message"
          rows="4"
          placeholder="Write your message"
          value={form.message}
          onChange={handleChange}
        />

        {errors.message && (
          <span className="field-error">
            {errors.message}
          </span>
        )}
      </div>

      <div className="button1">
        <input
          type="submit"
          value={submitting ? "Sending..." : "Send Message"}
          disabled={!isValid || submitting}
        />
      </div>

      {submitted && (
        <p className="form-success">
          Thanks! Your message has been sent successfully.
        </p>
      )}

      {serverError && (
        <p className="field-error">
          {serverError}
        </p>
      )}
    </form>
  );
}

export default ContactForm;