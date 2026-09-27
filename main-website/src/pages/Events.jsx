import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  bg:         "#0a0d0f",
  bg2:        "#0f1316",
  surface:    "#131820",
  surface2:   "#1a2030",
  accent:     "#b8cc8a",
  accentDim:  "#8fa660",
  accentHov:  "#cde09e",
  text:       "#ffffff",
  textMuted:  "rgba(255,255,255,0.75)",
  textDim:    "rgba(255,255,255,0.45)",
  border:     "rgba(184,204,138,0.12)",
  borderSub:  "rgba(255,255,255,0.06)",
  d1: "#b8cc8a",
  d2: "#8ab4cc",
  d3: "#cc9e8a",
  d4: "#ccb88a",
  d5: "#b08acc",
};

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <div style={{ width: 20, height: 1, background: T.accent }} />
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: T.accent,
        fontWeight: 500,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAG PILL
───────────────────────────────────────────── */
function Tag({ label, color }) {
  const c = color || T.accent;
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 12px",
      borderRadius: 999,
      border: `1px solid ${c}28`,
      background: `${c}0d`,
      color: c,
      fontSize: 14,
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED HERO TITLE
───────────────────────────────────────────── */
function AnimTitle() {
  const lines = [
    { text: 'Explore', accent: false },
    { text: 'Events',  accent: true  },
  ];
  let delay = 0.15;
  return (
    <h1 className="ev-hero-title" style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
      lineHeight: 1.02,
      letterSpacing: '0.01em',
      marginBottom: 0,
    }} aria-label="Explore Events">
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.text.split('').map((ch, ci) => {
            delay += 0.055;
            const d = delay;
            return (
              <span
                key={ci}
                className="ev-char"
                style={{
                  animationDelay: `${d}s`,
                  fontSize: 'clamp(64px,10vw,120px)',
                  color: line.accent ? 'transparent' : T.text,
                  WebkitTextStroke: line.accent ? `1px ${T.accent}` : 'none',
                }}
              >{ch}</span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────────
   FEATURED EVENT CARD
───────────────────────────────────────────── */
const eventVisuals = [
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <video
        src="/EU.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.75)' : 'brightness(0.55)',
          transition: 'filter 0.4s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.accent}10 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'Montserrat,sans-serif',
        letterSpacing: '0.12em',
        color: T.accent,
      }}>LIVE EVENT</div>
      <div style={{
        position: 'absolute', bottom: 14, right: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'Montserrat,sans-serif',
        letterSpacing: '0.12em',
        color: T.textMuted,
      }}>FRESHERS 2024</div>
    </div>
  ),
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src="/Edge.png"
        alt="E.D.G.E Student Development Summit"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hovered ? 'brightness(0.8)' : 'brightness(0.6)',
          transition: 'filter 0.4s ease, transform 0.6s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.d2}12 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'Montserrat,sans-serif',
        letterSpacing: '0.12em',
        color: T.d2,
      }}>3-DAY SUMMIT</div>
    </div>
  ),
  () => (
    <div style={{ position: 'absolute', inset: 0, background: T.bg2 }} />
  ),
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.d3}15 0%, ${T.d4}10 100%)`,
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'Montserrat,sans-serif',
        letterSpacing: '0.12em',
        color: T.d3,
      }}>WORKSHOP</div>
    </div>
  ),
  ({ hovered }) => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${T.d5}15 0%, ${T.d1}10 100%)`,
      }} />
      <div style={{
        position: 'absolute', top: 14, left: 16,
        background: T.surface2,
        border: `1px solid ${T.border}`,
        borderRadius: 11,
        padding: '4px 14px',
        fontSize: 9.5,
        fontFamily: 'Montserrat,sans-serif',
        letterSpacing: '0.12em',
        color: T.d5,
      }}>FLAGSHIP EVENT</div>
    </div>
  ),
];

function FeaturedEventCard({ event, index, reverse }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useInView(0.1);
  const Visual = eventVisuals[index];
  const handleExplore = () => {
    if (event.title === 'Engineering Unplugged') {
      navigate('/events/engineering-unplugged');
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        borderRadius: 16,
        border: `1px solid ${hovered ? "rgba(184,204,138,0.22)" : T.border}`,
        background: T.surface,
        overflow: "hidden",
        boxShadow: hovered ? `0 8px 48px rgba(184,204,138,0.07)` : "none",
        transitionProperty: "opacity,transform,box-shadow,border-color",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 340,
      }} className="event-grid">
        <div style={{
          padding: "clamp(28px,5vw,52px) clamp(20px,4vw,48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          order: reverse ? 2 : 1,
        }} className="event-text">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              color: T.textDim,
              letterSpacing: "0.18em",
              fontWeight: 300,
            }}>EVENT</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              color: T.border.replace("0.12","0.35"),
              fontWeight: 300,
              lineHeight: 1,
            }}>{String(index+1).padStart(2,"0")}</span>
            <div style={{ flex:1, height:1, background:`linear-gradient(to right, ${T.border}, transparent)` }} />
          </div>

          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 34,
              fontWeight: 600,
              color: hovered ? T.accentHov : T.text,
              lineHeight: 1.18,
              letterSpacing: "0.01em",
              margin: 0,
              transition: "color 0.4s ease",
            }}>{event.title}</h2>
            <div style={{
              height: 2,
              borderRadius: 2,
              background: T.accent,
              marginTop: 12,
              width: hovered ? 56 : 28,
              transition: "width 0.5s ease",
            }} />
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17,
            fontWeight: 400,
            color: T.accent,
            lineHeight: 1.65,
            fontStyle: "italic",
            borderLeft: `2px solid ${T.accent}40`,
            paddingLeft: 16,
            margin: 0,
          }}>
            "{event.highlight}"
          </p>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: T.textMuted,
            lineHeight: 1.75,
            fontWeight: 300,
            margin: 0,
          }}>
            {event.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {event.tags.map((t,i) => <Tag key={t} label={t} color={[T.d1,T.d2,T.d3,T.d4][i%4]} />)}
          </div>

          <div>
            <button
              type="button"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: '#0a0d0f',
                background: T.accent,
                border: `1px solid ${T.accent}`,
                borderRadius: 8,
                padding: "11px 24px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
              }}
              onClick={handleExplore}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = T.accent;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = T.accent;
                e.currentTarget.style.color = '#0a0d0f';
              }}
            >
              {event.ctaText}
              <span>→</span>
            </button>
          </div>
        </div>

        <div style={{
          position: "relative",
          background: T.bg2,
          borderLeft: reverse ? "none" : `1px solid ${T.borderSub}`,
          borderRight: reverse ? `1px solid ${T.borderSub}` : "none",
          order: reverse ? 1 : 2,
          minHeight: 300,
          overflow: "hidden",
        }} className="event-visual">
          <Visual hovered={hovered} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Events() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

      const featuredEvents = [
    {
      title: "Engineering Unplugged",
      highlight: "An immersive experience designed to help freshers begin their engineering journey with clarity, confidence, and purpose.",
      description: "Engineering Unplugged (EU) helps first-year students navigate the transition into engineering through speaker sessions, panel discussions, and inspiring journeys of individuals who explored diverse paths beyond conventional engineering careers.",
      tags: ["Clarity", "Growth", "Exploration", "Engineering"],
      ctaText: "Explore Engineering Unplugged",
    },
    {
      title: "EDGE",
      highlight: "Abhivriddhi's flagship experience designed to bridge ambition with real-world exposure and professional readiness.",
      description: "EDGE offers students a closer look at industry expectations through technical assessments, interview experiences, and practical exposure that reflect real-world evaluation dynamics beyond classrooms.",
      tags: ["Exposure", "Growth", "Industry", "Professionalism"],
      ctaText: "Explore EDGE",
    },
    {
      title: "EATON",
      highlight: "A collaborative experience focused on building the interpersonal and professional skills essential beyond technical knowledge.",
      description: "Developed in collaboration with Eaton, the program combines interactive sessions and practical activities to strengthen communication, teamwork, adaptability, and confidence in professional environments.",
      tags: ["Communication", "Teamwork", "Adaptability", "Confidence"],
      ctaText: "Explore EATON",
    },
    {
      title: "BRAND YOU",
      highlight: "A workshop focused on helping students discover, shape, and communicate their personal brand with confidence.",
      description: "Brand You encourages self-awareness, communication, leadership, and professional development while helping students align their strengths, values, and aspirations with real-world opportunities.",
      tags: ["Identity", "Leadership", "Confidence", "Growth"],
      ctaText: "Explore BRAND YOU",
    },
    {
      title: "AAVIRBHAV",
      highlight: "An initiative dedicated to promoting emotional well-being and healthier mindsets among students.",
      description: "Aavirbhav creates awareness around mental health through interactive sessions that encourage self-reflection, open dialogue, resilience, and practical approaches towards handling challenges during the college journey.",
      tags: ["Wellbeing", "Awareness", "Resilience", "Growth"],
      ctaText: "Explore AAVIRBHAV",
    },
  ];

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes heroFade { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes grainMove { 0%{transform:translate(0,0)} 25%{transform:translate(-1%,1%)} 50%{transform:translate(1%,-1%)} 75%{transform:translate(-1%,-1%)} 100%{transform:translate(0,0)} }
        @keyframes ev-chin { to { opacity: 1; transform: translateY(0); } }
        @keyframes ev-fup { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ev-pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.65)} }

        .h-anim-1 { animation: heroFade 1s ease 0.1s both; }
        .h-anim-2 { animation: heroFade 1s ease 0.3s both; }
        .h-anim-3 { animation: heroFade 1s ease 0.55s both; }
        .h-anim-4 { animation: heroFade 1s ease 0.75s both; }
        .h-anim-5 { animation: heroFade 1s ease 0.95s both; }
        .scroll-bob { animation: scrollBob 2.5s ease-in-out infinite; }

        .ev-char {
          display: inline-block;
          opacity: 0; transform: translateY(28px);
          animation: ev-chin 0.5s ease forwards;
        }
        .ev-char-space { display: inline-block; width: 0.28em; }
        .ev-badge {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: ${T.accent}; border: 1px solid ${T.accent}38;
          padding: 5px 14px; border-radius: 20px; margin-bottom: 24px;
          background: ${T.accent}12;
          opacity: 0; animation: ev-fup 0.6s ease 0.1s forwards;
        }
        .ev-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: ${T.accent};
          animation: ev-pdot 2s ease-in-out infinite;
        }
        .ev-hero-sub {
          margin-top: 16px; font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem; color: ${T.textDim}; letter-spacing: 0.05em;
          opacity: 0; animation: ev-fup 0.6s ease 1.1s forwards;
        }
        .ev-divider {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, ${T.accent}, transparent);
          margin: 36px auto 0;
          opacity: 0; animation: ev-fup 0.6s ease 1.3s forwards;
        }

        .grain::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 200px 200px;
          opacity: 0.025; z-index: 1; animation: grainMove 8s steps(1) infinite;
        }

        @media (max-width: 900px) {
          .event-grid { grid-template-columns: 1fr !important; }
          .event-visual { order: 1 !important; min-height: 220px !important; border-left: none !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
          .event-text { order: 2 !important; padding: 28px 20px !important; }
          .ev-hero-inner { padding: 0 16px !important; }
          .ev-hero-title { text-align: center !important; }
        }
        @media (max-width: 480px) {
          .event-text { padding: 20px 16px !important; }
          .event-visual { min-height: 180px !important; }
          .ev-hero-inner { padding: 0 12px !important; }
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.accent}30; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.accent}60; }
      `}</style>

      {/* HERO */}
      <section className="grain" style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: T.bg,
        padding: 'clamp(80px,12vw,120px) clamp(16px,4vw,32px)',
      }}>
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          background:`radial-gradient(ellipse 70% 55% at 50% 40%, ${T.accent}08 0%, transparent 70%)`,
          transform: `translateY(${scrollY * 0.25}px)`,
        }} />
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:`linear-gradient(${T.borderSub} 1px, transparent 1px), linear-gradient(90deg, ${T.borderSub} 1px, transparent 1px)`,
          backgroundSize:"80px 80px",
          transform:`translateY(${scrollY * 0.08}px)`,
          maskImage:"radial-gradient(ellipse 80% 80% at center, black 30%, transparent 80%)",
        }} />
        <div style={{ position:"absolute", top:"20%", left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${T.accent}12, transparent)`, zIndex:0 }} />
        <div style={{ position:"absolute", bottom:"20%", left:0, right:0, height:1, background:`linear-gradient(to right, transparent, ${T.accent}12, transparent)`, zIndex:0 }} />

        <div className="ev-hero-inner" style={{ position:"relative", zIndex:2, maxWidth:860, margin:"0 auto", padding:"0 32px", textAlign:"center" }}>
          <div className="ev-badge">
            <span className="ev-badge-dot" />
            Abhivriddhi · Student Training &amp; Development Club
          </div>

          <AnimTitle />

          <p className="ev-hero-sub">
            Our events encompass a wide range of social skills development, career preparation, and leadership experiences essential for student growth.
          </p>

          <div className="ev-divider" />

          <div className="h-anim-5" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginTop:40 }}>
            <button
              onClick={() => document.getElementById("events")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                fontFamily:"'Montserrat',sans-serif",
                fontSize:13, fontWeight:500, letterSpacing:"0.08em",
                color:T.bg, background:T.accent,
                border:"none", borderRadius:8,
                padding:"13px 32px", cursor:"pointer",
                transition:"background 0.3s, transform 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background=T.accentHov; e.target.style.transform="scale(1.03)"; }}
              onMouseLeave={e => { e.target.style.background=T.accent; e.target.style.transform="scale(1)"; }}
            >
              Explore Events
            </button>
            <button style={{
              fontFamily:"'Montserrat',sans-serif",
              fontSize:13, fontWeight:400,
              color:T.textMuted, background:"transparent",
              border:`1px solid ${T.borderSub}`,
              borderRadius:8, padding:"13px 32px", cursor:"pointer",
              transition:"border-color 0.3s, color 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=T.accent+"50"; e.currentTarget.style.color=T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=T.borderSub; e.currentTarget.style.color=T.textMuted; }}
            onClick={() => navigate('/about')}
            >
              About the Club
            </button>
          </div>
        </div>

        <div className="scroll-bob" style={{
          position:"absolute", bottom:90, right:40,
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          opacity:0.35,
        }}>
          <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:10, color:T.textDim, letterSpacing:"0.2em", textTransform:"uppercase", writingMode:"vertical-rl" }}>Scroll</span>
          <div style={{ width:1, height:40, background:`linear-gradient(to bottom, ${T.accent}, transparent)` }} />
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section id="events" style={{ padding:'clamp(3rem,8vw,7.5rem) clamp(1rem,3vw,2rem)', maxWidth:1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel>Featured Events</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:64 }}>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(36px,5vw,56px)",
              fontWeight:300,
              color:T.text,
              lineHeight:1.1,
            }}>
              Landmark Experiences<br />
              <em style={{ color:T.accent, fontStyle:"italic" }}>Built for You</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
          {featuredEvents.map((ev, i) => (
            <FeaturedEventCard key={ev.title} event={ev} index={i} reverse={i%2===1} />
          ))}
        </div>
      </section>

      {/* footer handled by App.jsx */}
    </div>
  );
}

