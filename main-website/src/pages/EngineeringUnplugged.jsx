import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const T = {
  bg: '#0a0d0f',
  bg2: '#0f1316',
  surface: '#131820',
  surface2: '#1a2030',
  accent: '#b8cc8a',
  accentDim: '#8fa660',
  accentHov: '#cde09e',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.75)',
  textDim: 'rgba(255,255,255,0.45)',
  border: 'rgba(184,204,138,0.12)',
  borderSub: 'rgba(255,255,255,0.06)',
  d1: '#b8cc8a',
  d2: '#8ab4cc',
  d3: '#cc9e8a',
  d4: '#ccb88a',
  d5: '#b08acc',
};

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const branchOptions = ['Artificial Intelligence & Data Science',
'Chemical Engineering',
'Civil Engineering',
'Computer Engineering',
'Computer Engineering (Software Engineering)',
'Computer Sciences & Engineering (AI)',
'Computer Science and Engineering (AI & ML)',
'Computer Science and Engineering (Data Science)',
'Computer Science & Engineering (IoT and Cyber Security Including Blockchain Technology)',
'Electronics and Telecommunication Engineering', 
'Information Technology',
'Instrumentation Engineering',
'Mechanical Engineering',
'Other'];
const divisionOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const initialForm = {
  fullName: '',
  email: '',
  prn: '',
  year: '',
  branch: '',
  division: '',
};

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: 20, height: 1, background: T.accent }} />
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: T.accent,
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Tag({ label, color }) {
  const c = color || T.accent;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 999,
        border: `1px solid ${c}28`,
        background: `${c}14`,
        color: c,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 12,
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  );
}

function InfoItem({ label, value, hovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={hovered ? 'info-item active' : 'info-item'}
      style={{
        padding: '14px 16px',
        border: `1px solid ${hovered ? T.accent : T.border}`,
        borderRadius: 12,
        background: hovered ? T.accent : T.surface2,
        color: T.text,
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="info-label"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: T.textDim,
          marginBottom: 8,
          fontWeight: 500,
          transition: 'color 0.25s ease, font-weight 0.25s ease',
        }}
      >
        {label}
      </div>
      <div
        className="info-value"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          color: T.text,
          lineHeight: 1.2,
          fontWeight: 600,
          transition: 'color 0.25s ease, font-weight 0.25s ease',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function EngineeringUnpluggedPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });
  const [hoveredCard, setHoveredCard] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    console.log('Submitting form:', formData);

    try {
      const response = await fetch('/api/events/register/engineering-unplugged', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit registration right now.');
      }

      setStatus({
        loading: false,
        success: data.message || 'Registration submitted successfully.',
        error: '',
      });
      setFormData(initialForm);
    } catch (submitError) {
      const message = submitError.message || 'Something went wrong. Please try again.';
      console.error('Registration Error:', submitError);
      setStatus({ loading: false, success: '', error: message });
    }
  };

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        .eu-shell { position: relative; min-height: 100vh; background: ${T.bg}; }
        .eu-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(${T.borderSub} 1px, transparent 1px), linear-gradient(90deg, ${T.borderSub} 1px, transparent 1px);
          background-size: 76px 76px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 80%);
          opacity: 0.4;
          pointer-events: none;
        }
        .eu-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 72px 20px 90px; }
        .eu-hero { margin-bottom: 26px; }
        .eu-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 7vw, 76px);
          font-weight: 300;
          line-height: 0.96;
          margin: 0;
          letter-spacing: 0.01em;
        }
        .eu-sub {
          margin-top: 18px;
          max-width: 760px;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: ${T.textMuted};
          font-weight: 300;
        }
        .eu-back {
          margin-bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${T.accent};
          border: 1px solid ${T.border};
          background: ${T.surface};
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .eu-back:hover {
          background: ${T.surface2};
          border-color: ${T.border};
        }
        .eu-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 28px; }
        .eu-card {
          background: ${T.surface};
          border: 1px solid ${T.border};
          border-radius: 22px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          overflow: hidden;
        }
        .eu-card-inner { padding: 24px; }
        .eu-card h3 {
          margin: 0 0 16px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 600;
          color: ${T.text};
        }
        .eu-raw-copy {
          font-family: 'Montserrat', sans-serif;
          color: ${T.textMuted};
          line-height: 1.8;
          font-size: 14px;
          font-weight: 300;
        }
        .eu-info-grid { display: grid; grid-template-columns: repeat(2, minmax(160px, 1fr)); gap: 14px; margin-top: 20px; }
        .info-item:hover,
        .info-item.active {
          background: ${T.accent} !important;
          border-color: ${T.accent} !important;
        }
        .info-item:hover .info-label,
        .info-item.active .info-label,
        .info-item:hover .info-value,
        .info-item.active .info-value {
          color: #131820 !important;
          font-weight: 700 !important;
        }
        .eu-speaker-wrap { display: grid; grid-template-columns: 220px 1fr; gap: 24px; align-items: center; }
        .eu-speaker-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid ${T.border};
          background: linear-gradient(135deg, ${T.accent}20, ${T.surface2});
        }
        .eu-speaker-name {
          margin: 0 0 8px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          color: ${T.text};
        }
        .eu-speaker-role {
          margin: 0 0 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: ${T.accent};
          text-transform: uppercase;
        }
        .eu-takeaways { display: grid; grid-template-columns: repeat(2, minmax(180px, 1fr)); gap: 14px; list-style: none; padding: 0; margin: 20px 0 0; }
        .eu-takeaways li {
          background: ${T.surface2};
          border: 1px solid ${T.border};
          border-radius: 14px;
          padding: 16px 18px;
          font-family: 'Montserrat', sans-serif;
          color: ${T.textMuted};
          font-size: 14px;
          line-height: 1.7;
          font-weight: 300;
        }
        .eu-form { display: flex; flex-direction: column; gap: 16px; }
        .eu-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${T.textMuted};
        }
        .eu-form input,
        .eu-form select {
          width: 100%;
          border: 1px solid ${T.border};
          background: ${T.surface2};
          color: ${T.text};
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          border-radius: 12px;
          padding: 13px 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .eu-form input:focus,
        .eu-form select:focus {
          border-color: ${T.accent};
          box-shadow: 0 0 0 3px ${T.accent}18;
        }
        .eu-form-button {
          border: none;
          border-radius: 12px;
          background: ${T.accent};
          color: ${T.bg};
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px 20px;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
        }
        .eu-form-button:hover { transform: translateY(-1px); }
        .eu-form-button:disabled { opacity: 0.7; cursor: wait; }
        .eu-banner {
          padding: 14px 16px;
          border-radius: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          border: 1px solid ${T.border};
        }
        .eu-banner.error {
          background: rgba(204, 158, 138, 0.08);
          border-color: rgba(204, 158, 138, 0.35);
          color: #ffdbcf;
        }
        .eu-banner.success {
          background: rgba(184, 204, 138, 0.08);
          border-color: rgba(184, 204, 138, 0.4);
          color: #edf7d8;
        }
        @media (max-width: 860px) {
          .eu-grid { grid-template-columns: 1fr; }
          .eu-speaker-wrap { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="eu-shell">
        <div className="eu-inner">
          <button className="eu-back" type="button" onClick={() => navigate('/events')}>
            ← Back to Events
          </button>

          <div className="eu-hero">
            <SectionLabel>Abhivriddhi · Event Details</SectionLabel>
            <h1 className="eu-title">Engineering Unplugged</h1>
            <p className="eu-sub">
              A breakthrough student experience designed to help freshers understand engineering beyond the classroom —
              through clarity, mentorship, career direction, and a growth mindset built for the future.
            </p>
          </div>

          <div className="eu-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div className="eu-card">
                <div className="eu-card-inner">
                  <h3>Event Overview</h3>
                  <p className="eu-raw-copy">
                    Engineering Unplugged is a purpose-driven initiative that helps first-year students navigate the transition
                    into engineering life with confidence. It brings together inspiring conversations, practical guidance, and
                    deeper reflection on how students can shape a meaningful and fulfilling academic journey beyond just
                    marks, ranks, and conventional expectations.
                  </p>

                  <div className="eu-info-grid">
                    <InfoItem
                      label="Date"
                      value="19th August 2025"
                      hovered={hoveredCard === 'date'}
                      onMouseEnter={() => setHoveredCard('date')}
                      onMouseLeave={() => setHoveredCard('')}
                    />
                    <InfoItem
                      label="Time"
                      value="10:00 AM - 1:00 PM"
                      hovered={hoveredCard === 'time'}
                      onMouseEnter={() => setHoveredCard('time')}
                      onMouseLeave={() => setHoveredCard('')}
                    />
                    <InfoItem
                      label="Venue"
                      value="Sharad Arena"
                      hovered={hoveredCard === 'venue'}
                      onMouseEnter={() => setHoveredCard('venue')}
                      onMouseLeave={() => setHoveredCard('')}
                    />
                    <InfoItem
                      label="Audience"
                      value="All students"
                      hovered={hoveredCard === 'audience'}
                      onMouseEnter={() => setHoveredCard('audience')}
                      onMouseLeave={() => setHoveredCard('')}
                    />
                  </div>
                </div>
              </div>

              <div className="eu-card">
                <div className="eu-card-inner">
                  <h3>Theme</h3>
                  <p className="eu-raw-copy">
                    The theme of Engineering Unplugged focuses on helping students discover their path amid uncertainty,
                    pressure, and rapidly changing opportunities. It explores how to move beyond default expectations,
                    recognise personal strengths, and build a resilient mindset for both personal and professional growth.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
                    <Tag label="Career Clarity" color={T.d1} />
                    <Tag label="Student Growth" color={T.d2} />
                    <Tag label="Mindset Shift" color={T.d3} />
                    <Tag label="Purposeful Learning" color={T.d4} />
                  </div>
                </div>
              </div>

              <div className="eu-card">
                <div className="eu-card-inner">
                  <h3>Keynote speaker</h3>
                  <div className="eu-speaker-wrap">
                    <img className="eu-speaker-image" src="/speaker-eu.png" alt="Speaker portrait for Engineering Unplugged" />
                    <div>
                      <p className="eu-speaker-role">Featured Speaker</p>
                      <h4 className="eu-speaker-name">Dr. ABC</h4>
                      <p className="eu-raw-copy" style={{ margin: 0 }}>
                        Design Lead, Innovation &amp; Career Mentor
                      </p>
                      <p className="eu-raw-copy" style={{ marginTop: 18 }}>
                        Dr. ABC is a multidisciplinary mentor working at the intersection of design, leadership,
                        and education. Her work focuses on empowering students to think beyond conventional career tracks,
                        build confidence in decision-making, and create purpose-driven professional identities rooted in self-awareness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="eu-card">
                <div className="eu-card-inner">
                  <h3>Key takeaways</h3>
                  <ul className="eu-takeaways">
                    <li>Understand how to identify your strengths and align them with future opportunities.</li>
                    <li>Learn how to navigate uncertainty with confidence and a growth-oriented mindset.</li>
                    <li>Explore non-conventional engineering paths and career options beyond traditional expectations.</li>
                    <li>Build practical clarity around academic choices, networking, and personal development.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="eu-card" style={{ alignSelf: 'start' }}>
              <div className="eu-card-inner">
                <h3 style={{ marginBottom: 12 }}>REGISTER NOW</h3>

                {status.error && <div className="eu-banner error">{status.error}</div>}
                {status.success && <div className="eu-banner success">{status.success}</div>}

                <form className="eu-form" onSubmit={handleSubmit} style={{ marginTop: 18 }}>
                  <label>
                    Full Name
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label>
                    Email ID
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="yourname@example.com"
                      required
                    />
                  </label>

                  <label>
                    PRN No.
                    <input
                      name="prn"
                      value={formData.prn}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter PRN number"
                      required
                    />
                  </label>

                  <label>
                    Year
                    <select name="year" value={formData.year} onChange={handleChange} required>
                      <option value="">Select year</option>
                      {yearOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Branch
                    <select name="branch" value={formData.branch} onChange={handleChange} required>
                      <option value="">Select branch</option>
                      {branchOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Division
                    <select name="division" value={formData.division} onChange={handleChange} required>
                      <option value="">Select division</option>
                      {divisionOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <button className="eu-form-button" type="submit" disabled={status.loading}>
                    {status.loading ? 'Submitting...' : 'Submit registration'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
