import { useState } from 'react';

export default function StatusUnavailable({
  title,
  description,
  formTitle,
  formDesc,
  buttonText,
  successMessage,
  children,
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="status-unavailable-card">
      <div className="status-badge">
        <span className="status-badge-dot" />
        NOT AVAILABLE RIGHT NOW
      </div>
      <h2 className="status-card-title">{title}</h2>
      <p className="status-card-desc">{description}</p>

      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          padding: '1.5rem',
          textAlign: 'left',
          marginBottom: '2rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            color: 'var(--accent-gold)',
            marginBottom: '0.5rem',
          }}
        >
          {formTitle}
        </h3>
        <p className="body-copy" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          {formDesc}
        </p>

        {submitted ? (
          <div
            style={{
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              fontSize: '0.875rem',
              padding: '0.75rem 0',
            }}
          >
            ✓ {successMessage}
          </div>
        ) : (
          <form className="fan-club-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="fan-club-input"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-gold">
              {buttonText}
            </button>
          </form>
        )}
      </div>

      {children}
    </div>
  );
}
