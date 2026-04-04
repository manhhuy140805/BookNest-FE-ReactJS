import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./Contact.module.css";

const INFO_CARDS = [
  {
    id: "contact-location",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="9"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
    label: "Address",
    value: "123 Nguyen Hue, District 1\nHo Chi Minh City, Vietnam",
  },
  {
    id: "contact-phone",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Phone",
    value: "+84 (028) 3822 4455\n+84 909 123 456",
  },
  {
    id: "contact-email",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M2 8l10 6 10-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Email",
    value: "hello@booknest.vn\nsupport@booknest.vn",
  },
  {
    id: "contact-hours",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Fri: 8:00 – 18:00\nSat: 9:00 – 14:00",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your full name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!form.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!form.message.trim()) newErrors.message = "Please enter your message.";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1400));
    setSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* ── Hero Banner ── */}
      <section className={styles.hero} aria-label="Contact Hero">
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Contact Us</span>
          <h1 className={styles.heroTitle}>
            We'd love to hear
            <br />
            <span className={styles.heroAccent}>from you</span>
          </h1>
          <p className={styles.heroSub}>
            Have any questions or need support? Send us a message and we'll respond within 24 hours.
          </p>
        </div>
        <div className={styles.heroShapes}>
          <div className={styles.shape1} />
          <div className={styles.shape2} />
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection} aria-label="Contact Info">
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {INFO_CARDS.map((card, i) => (
              <div
                key={card.id}
                id={card.id}
                className={styles.infoCard}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.infoIcon}>{card.icon}</div>
                <h3 className={styles.infoLabel}>{card.label}</h3>
                <p className={styles.infoValue}>
                  {card.value.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < card.value.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Form + Map ── */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {/* Contact Form */}
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSub}>
                  Fill out the form below or reach out directly using the information provided.
                </p>
              </div>

              {submitted ? (
                <div className={styles.successState} role="status" aria-live="polite">
                  <div className={styles.successIcon}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#22c55e"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M8 12l3 3 5-5"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>
                    Thank you for reaching out!
                  </h3>
                  <p className={styles.successText}>
                    We have received your message and will respond as soon as possible.
                  </p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className={styles.form}
                >
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-name" className={styles.label}>
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                      />
                      {errors.name && (
                        <span className={styles.errorMsg} role="alert" aria-live="polite">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-email" className={styles.label}>
                        Email <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={handleChange}
                        spellCheck={false}
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                      />
                      {errors.email && (
                        <span className={styles.errorMsg} role="alert" aria-live="polite">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-subject" className={styles.label}>
                      Subject <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      autoComplete="off"
                      placeholder="I want to ask about…"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
                    />
                    {errors.subject && (
                      <span className={styles.errorMsg} role="alert" aria-live="polite">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      autoComplete="off"
                      placeholder="Your message content…"
                      value={form.message}
                      onChange={handleChange}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                    />
                    {errors.message && (
                      <span className={styles.errorMsg} role="alert" aria-live="polite">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className={styles.submitBtn}
                  >
                    {submitting ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map + Social */}
            <div className={styles.mapWrapper}>
              <div className={styles.mapContainer}>
                <iframe
                  title="BookNest Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.494786716566!2d106.7003814!3d10.7729783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d8c77%3A0xde7af0d6af52adad!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldCBOYW0!5e0!3m2!1sen!2s!4v1712000000000!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                />
              </div>

              {/* Social Links */}
              <div className={styles.socialBox}>
                <h3 className={styles.socialTitle}>Follow Us</h3>
                <div className={styles.socialLinks}>
                  {[
                    {
                      id: "social-facebook",
                      name: "Facebook",
                      color: "#1877f2",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      ),
                    },
                    {
                      id: "social-instagram",
                      name: "Instagram",
                      color: "#e1306c",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                      ),
                    },
                    {
                      id: "social-tiktok",
                      name: "TikTok",
                      color: "#010101",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.72a8.16 8.16 0 004.77 1.53V6.81a4.85 4.85 0 01-1-.12z" />
                        </svg>
                      ),
                    },
                    {
                      id: "social-youtube",
                      name: "YouTube",
                      color: "#ff0000",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.id}
                      id={s.id}
                      href="#"
                      className={styles.socialLink}
                      style={{ "--social-color": s.color }}
                      aria-label={s.name}
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className={styles.socialIcon}>{s.icon}</span>
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
