// Full-page fallback for /projects (direct URL / SEO).
export const metadata = {
  title: "Projects",
  description: "Projects by Saviour Ibok across full-stack development, data analysis, and digital marketing.",
};

const PROJECTS = [
  { emoji:"♟",  title:"Chess App with Minimax AI",          description:"A fully playable chess engine with Minimax + alpha-beta pruning, Elo tracking, and mobile-first architecture.", tech:["JavaScript","Canvas API","HTML/CSS"],  category:"development", liveUrl:"#", githubUrl:"#"  },
  { emoji:"📊", title:"Nigeria Tech Talent Data Analysis",   description:"Mapping the mismatch between technical training programmes and employer demand across six Nigerian states.",     tech:["Python","Pandas","Matplotlib","SQL"],  category:"data",        liveUrl:"#", githubUrl:"#"  },
  { emoji:"🌱", title:"AgroSpan GTM Strategy",               description:"A 23-page go-to-market strategy for a fictional B2B agri-tech platform covering positioning, channels, and messaging.", tech:["Market Research","Content Strategy","Figma"], category:"marketing", liveUrl:"#", githubUrl:null },
  { emoji:"🎮", title:"NOVA STRIKE — Space Shooter",         description:"A Canvas-based 2D space shooter with wave progression, power-ups, and a high-score system.",                      tech:["JavaScript","Canvas API","Web Audio"], category:"development", liveUrl:"#", githubUrl:"#"  },
  { emoji:"📝", title:"JAMB CBT Simulator",                  description:"A full exam simulator with 320+ questions, practice and exam modes, and a timer — all in a single HTML file.",    tech:["HTML","CSS","JavaScript"],             category:"development", liveUrl:"#", githubUrl:"#"  },
];

const CATEGORY_CLASS:  Record<string,string> = { development:"tag-dev", data:"tag-data", marketing:"tag-marketing" };
const CATEGORY_LABEL:  Record<string,string> = { development:"Development", data:"Data Analysis", marketing:"Marketing" };

export default function ProjectsPage() {
  return (
    <div style={{ backgroundColor:"var(--light)", minHeight:"calc(100vh - 64px)" }}>
      <div style={{ maxWidth:"780px", margin:"0 auto", padding:"3rem 2rem 4rem", display:"flex", flexDirection:"column", gap:"2rem" }}>
        <div>
          <h1 style={{ fontFamily:"var(--font-serif)", fontSize:"1.6rem", fontWeight:400, color:"var(--ink)", margin:"0 0 0.5rem" }}>
            Things I've built, <em style={{ fontStyle:"italic", color:"var(--ink-2)" }}>analysed, and shipped.</em>
          </h1>
          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.9rem", color:"var(--ink-3)", margin:0 }}>A collection of projects across development, data, and marketing.</p>
        </div>
        <ul style={{ listStyle:"none", margin:0, padding:0 }}>
          {PROJECTS.map((p) => (
            <li key={p.title} style={{ display:"flex", gap:"1.25rem", padding:"1.5rem 0", borderBottom:"1px solid var(--light-3)" }}>
              <div style={{ width:52, height:52, borderRadius:10, backgroundColor:"var(--light-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0 }}>{p.emoji}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem", flex:1 }}>
                <span className={CATEGORY_CLASS[p.category]} style={{ alignSelf:"flex-start" }}>{CATEGORY_LABEL[p.category]}</span>
                <h2 style={{ fontFamily:"var(--font-serif)", fontSize:"1.1rem", fontWeight:400, color:"var(--ink)", margin:0 }}>{p.title}</h2>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.875rem", lineHeight:1.7, color:"var(--ink-2)", margin:0 }}>{p.description}</p>
                <div style={{ display:"flex", gap:"0.35rem", flexWrap:"wrap" }}>
                  {p.tech.map((t) => <span key={t} style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"var(--ink-3)", backgroundColor:"var(--light-2)", padding:"0.15rem 0.5rem", borderRadius:4 }}>{t}</span>)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}