import { useState, useMemo } from "react";

const NAVY = "#002B5B";
const GOLD = "#FFC107";

const jobsData = [
  {
    id: 1, title: "Senior Product Designer", company: "Stripe", location: "San Francisco, CA", type: "Full-time",
    salary: "$130k – $160k", tags: ["Figma", "Design Systems", "UX Research"], logo: "S", color: "#635BFF",
    posted: "2d ago", match: 97, remote: true, personalized: true,
    description: "Lead design for Stripe's next-gen dashboard products. Own design systems and partner with eng.",
  },
  {
    id: 2, title: "UX/UI Designer", company: "Notion", location: "Remote", type: "Full-time",
    salary: "$110k – $140k", tags: ["Figma", "Prototyping", "User Testing"], logo: "N", color: "#000000",
    posted: "5d ago", match: 91, remote: true, personalized: true,
    description: "Shape the future of how millions of people organize their work and lives.",
  },
  {
    id: 3, title: "Product Designer", company: "Linear", location: "Remote", type: "Full-time",
    salary: "$120k – $150k", tags: ["Figma", "Motion", "B2B SaaS"], logo: "L", color: "#5E6AD2",
    posted: "1d ago", match: 88, remote: true, personalized: true,
    description: "Work on Linear's product design, helping engineering teams move faster.",
  },
  {
    id: 4, title: "UI Designer", company: "Airbnb", location: "New York, NY", type: "Contract",
    salary: "$90k – $120k", tags: ["Sketch", "HTML/CSS", "Motion"], logo: "A", color: "#FF5A5F",
    posted: "1w ago", match: 78, remote: false, personalized: false,
    description: "Create delightful UI for Airbnb's host and guest experiences.",
  },
  {
    id: 5, title: "Brand Designer", company: "Figma", location: "San Francisco, CA", type: "Full-time",
    salary: "$115k – $145k", tags: ["Brand", "Illustration", "Marketing"], logo: "F", color: "#F24E1E",
    posted: "3d ago", match: 74, remote: false, personalized: false,
    description: "Define and evolve Figma's visual identity across all brand touchpoints.",
  },
  {
    id: 6, title: "Design Engineer", company: "Vercel", location: "Remote", type: "Full-time",
    salary: "$140k – $180k", tags: ["React", "CSS", "Design Systems"], logo: "V", color: "#000000",
    posted: "6d ago", match: 85, remote: true, personalized: true,
    description: "Bridge the gap between design and engineering at Vercel.",
  },
  {
    id: 7, title: "Product Designer", company: "GitHub", location: "Remote", type: "Full-time",
    salary: "$125k – $155k", tags: ["Figma", "Developer Tools", "Accessibility"], logo: "G", color: "#24292F",
    posted: "2w ago", match: 70, remote: true, personalized: false,
    description: "Design tools that developers use to collaborate and ship software.",
  },
  {
    id: 8, title: "UX Researcher", company: "Spotify", location: "Stockholm, Sweden", type: "Full-time",
    salary: "$100k – $130k", tags: ["User Research", "Data Analysis", "Interviews"], logo: "Sp", color: "#1DB954",
    posted: "4d ago", match: 65, remote: false, personalized: false,
    description: "Uncover deep user insights to shape Spotify's product strategy.",
  },
];

const stats = [
  { label: "Applications", value: "12", sub: "+3 this week", icon: "📋" },
  { label: "Profile Views", value: "48", sub: "+12 this week", icon: "👁" },
  { label: "Interviews", value: "3", sub: "2 upcoming", icon: "🗓" },
  { label: "Match Score", value: "94%", sub: "Top 5% of seekers", icon: "⚡" },
];

const JobCard = ({ job, saved, liked, onSave, onLike, onApply, applied }) => {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      padding: "24px",
      border: "1.5px solid #E8EDF5",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      transition: "all 0.2s",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,43,91,0.12)"; e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#E8EDF5"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {job.match >= 90 && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: `linear-gradient(135deg, ${GOLD}, #FFB300)`,
          color: NAVY, fontSize: 10, fontWeight: 800,
          padding: "4px 12px", borderRadius: "0 16px 0 12px",
          letterSpacing: "0.05em",
        }}>TOP MATCH</div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: job.color, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 16, flexShrink: 0,
          fontFamily: "'DM Mono', monospace",
        }}>{job.logo}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: NAVY, lineHeight: 1.3 }}>{job.title}</div>
          <div style={{ color: "#64748B", fontSize: 13, marginTop: 2 }}>{job.company} · {job.location}</div>
        </div>
        <div style={{
          background: `${NAVY}10`, color: NAVY,
          borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700,
          whiteSpace: "nowrap", alignSelf: "flex-start",
        }}>{job.match}% match</div>
      </div>

      <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{job.description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {job.tags.map(t => (
          <span key={t} style={{
            background: "#F1F5FE", color: NAVY,
            borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600,
          }}>{t}</span>
        ))}
        {job.remote && <span style={{
          background: "#ECFDF5", color: "#059669",
          borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600,
        }}>Remote</span>}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>{job.salary}</span>
          <span style={{ color: "#94A3B8", fontSize: 11 }}>{job.type} · {job.posted}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => onLike(job.id)} style={{
            width: 36, height: 36, borderRadius: 8, border: "1.5px solid #E8EDF5",
            background: liked ? "#FEF3C7" : "white", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            transition: "all 0.15s",
          }} title="Like">{liked ? "❤️" : "🤍"}</button>
          <button onClick={() => onSave(job.id)} style={{
            width: 36, height: 36, borderRadius: 8, border: "1.5px solid #E8EDF5",
            background: saved ? "#EFF6FF" : "white", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            transition: "all 0.15s",
          }} title="Save">{saved ? "🔖" : "📌"}</button>
          <button onClick={() => onApply(job.id)} style={{
            background: applied ? "#E8EDF5" : `linear-gradient(135deg, ${NAVY}, #003f85)`,
            color: applied ? "#94A3B8" : "white",
            border: "none", borderRadius: 8, padding: "8px 18px",
            fontWeight: 700, fontSize: 12, cursor: applied ? "default" : "pointer",
            transition: "all 0.15s", letterSpacing: "0.02em",
          }}>
            {applied ? "Applied ✓" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minMatch, setMinMatch] = useState(0);
  const [savedJobs, setSavedJobs] = useState(new Set([2, 6]));
  const [likedJobs, setLikedJobs] = useState(new Set([1, 3]));
  const [appliedJobs, setAppliedJobs] = useState(new Set([4]));
  const [sortBy, setSortBy] = useState("match");

  const toggleSave = (id) => setSavedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleLike = (id) => setLikedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleApply = (id) => setAppliedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = useMemo(() => {
    let jobs = [...jobsData];
    if (activeTab === "personalized") jobs = jobs.filter(j => j.personalized);
    if (activeTab === "saved") jobs = jobs.filter(j => savedJobs.has(j.id));
    if (activeTab === "liked") jobs = jobs.filter(j => likedJobs.has(j.id));
    if (activeTab === "applied") jobs = jobs.filter(j => appliedJobs.has(j.id));
    if (search) jobs = jobs.filter(j =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (jobType !== "all") jobs = jobs.filter(j => j.type === jobType);
    if (remoteOnly) jobs = jobs.filter(j => j.remote);
    if (minMatch > 0) jobs = jobs.filter(j => j.match >= minMatch);
    if (sortBy === "match") jobs.sort((a, b) => b.match - a.match);
    else if (sortBy === "recent") jobs.sort((a, b) => a.posted.localeCompare(b.posted));
    else if (sortBy === "salary") jobs.sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
    return jobs;
  }, [activeTab, search, jobType, remoteOnly, minMatch, sortBy, savedJobs, likedJobs, appliedJobs]);

  const tabs = [
    { id: "all", label: "All Jobs", count: jobsData.length },
    { id: "personalized", label: "For You", count: jobsData.filter(j => j.personalized).length },
    { id: "saved", label: "Saved", count: savedJobs.size },
    { id: "liked", label: "Liked", count: likedJobs.size },
    { id: "applied", label: "Applied", count: appliedJobs.size },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F9FC",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: NAVY,
        padding: "0 32px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 24px rgba(0,43,91,0.2)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: GOLD, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: NAVY }}>J</div>
            <span style={{ color: "white", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>JobBoard</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>🔔 Alerts</button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: NAVY, fontSize: 14, cursor: "pointer" }}>AJ</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>
        {/* Welcome + Stats */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ color: NAVY, fontWeight: 800, fontSize: 28, margin: 0, letterSpacing: "-0.03em" }}>
            Good morning, Alex 👋
          </h1>
          <p style={{ color: "#64748B", marginTop: 6, marginBottom: 24, fontSize: 15 }}>
            You have <strong style={{ color: NAVY }}>{jobsData.filter(j => j.personalized).length} personalized matches</strong> waiting for you today.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: "white", borderRadius: 14, padding: "20px 22px",
                border: "1.5px solid #E8EDF5",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: NAVY, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#059669", fontWeight: 600, marginTop: 2 }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: "white", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #E8EDF5", marginBottom: 24,
          boxShadow: "0 2px 8px rgba(0,43,91,0.04)",
        }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {/* Search */}
            <div style={{ flex: "1 1 280px", position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94A3B8" }}>🔍</span>
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px 10px 40px",
                  border: "1.5px solid #E8EDF5", borderRadius: 10,
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                  color: NAVY, fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = "#E8EDF5"}
              />
            </div>

            {/* Type Filter */}
            <select value={jobType} onChange={e => setJobType(e.target.value)} style={{
              padding: "10px 14px", border: "1.5px solid #E8EDF5", borderRadius: 10,
              fontSize: 13, color: NAVY, fontFamily: "inherit", background: "white",
              cursor: "pointer", outline: "none", fontWeight: 600,
            }}>
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              padding: "10px 14px", border: "1.5px solid #E8EDF5", borderRadius: 10,
              fontSize: 13, color: NAVY, fontFamily: "inherit", background: "white",
              cursor: "pointer", outline: "none", fontWeight: 600,
            }}>
              <option value="match">Sort: Best Match</option>
              <option value="recent">Sort: Most Recent</option>
              <option value="salary">Sort: Salary</option>
            </select>

            {/* Match Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600, whiteSpace: "nowrap" }}>Min match</span>
              <select value={minMatch} onChange={e => setMinMatch(+e.target.value)} style={{
                padding: "10px 12px", border: "1.5px solid #E8EDF5", borderRadius: 10,
                fontSize: 13, color: NAVY, fontFamily: "inherit", background: "white",
                cursor: "pointer", outline: "none", fontWeight: 600,
              }}>
                <option value={0}>Any</option>
                <option value={70}>70%+</option>
                <option value={80}>80%+</option>
                <option value={90}>90%+</option>
              </select>
            </div>

            {/* Remote Toggle */}
            <button
              onClick={() => setRemoteOnly(v => !v)}
              style={{
                padding: "10px 16px", borderRadius: 10, fontWeight: 700, fontSize: 13,
                cursor: "pointer", transition: "all 0.15s",
                border: `1.5px solid ${remoteOnly ? GOLD : "#E8EDF5"}`,
                background: remoteOnly ? `${GOLD}20` : "white",
                color: remoteOnly ? NAVY : "#64748B",
              }}
            >
              🌐 Remote Only
            </button>
          </div>
        </div>

        {/* Tabs + Job List */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "white", borderRadius: 12, padding: 4, border: "1.5px solid #E8EDF5", width: "fit-content" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                  padding: "8px 16px", borderRadius: 8, border: "none",
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  transition: "all 0.15s",
                  background: activeTab === t.id ? NAVY : "transparent",
                  color: activeTab === t.id ? "white" : "#64748B",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {t.label}
                  <span style={{
                    background: activeTab === t.id ? GOLD : "#F1F5FE",
                    color: activeTab === t.id ? NAVY : "#64748B",
                    borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 800,
                  }}>{t.id === "saved" ? savedJobs.size : t.id === "liked" ? likedJobs.size : t.id === "applied" ? appliedJobs.size : t.count}</span>
                </button>
              ))}
            </div>

            {/* Result count */}
            <div style={{ marginBottom: 16, color: "#64748B", fontSize: 13 }}>
              Showing <strong style={{ color: NAVY }}>{filtered.length}</strong> jobs
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#94A3B8" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#64748B" }}>No jobs found</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filtered.map(job => (
                  <JobCard
                    key={job.id} job={job}
                    saved={savedJobs.has(job.id)}
                    liked={likedJobs.has(job.id)}
                    applied={appliedJobs.has(job.id)}
                    onSave={toggleSave} onLike={toggleLike} onApply={toggleApply}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Profile Completion */}
            <div style={{ background: "white", borderRadius: 16, padding: "20px", border: "1.5px solid #E8EDF5" }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 14, marginBottom: 14 }}>Profile Strength</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: NAVY, fontSize: 18 }}>AJ</div>
                <div>
                  <div style={{ fontWeight: 700, color: NAVY, fontSize: 14 }}>Alex Johnson</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Product Designer</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#64748B" }}>Profile complete</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>78%</span>
              </div>
              <div style={{ background: "#E8EDF5", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{ width: "78%", height: "100%", background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`, borderRadius: 99 }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "#64748B" }}>
                Add a portfolio link to boost your matches!
              </div>
              <button style={{
                marginTop: 10, width: "100%", padding: "9px 0",
                background: NAVY, color: "white", border: "none", borderRadius: 9,
                fontWeight: 700, fontSize: 12, cursor: "pointer",
              }}>Complete Profile →</button>
            </div>

            {/* Job Alerts */}
            <div style={{ background: `linear-gradient(135deg, ${NAVY}, #003f85)`, borderRadius: 16, padding: "20px", color: "white" }}>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>⚡ Job Alerts</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Get notified instantly when new jobs match your profile.
              </div>
              <button style={{
                marginTop: 14, width: "100%", padding: "9px 0",
                background: GOLD, color: NAVY, border: "none", borderRadius: 9,
                fontWeight: 800, fontSize: 12, cursor: "pointer",
              }}>Enable Alerts</button>
            </div>

            {/* Top Skills */}
            <div style={{ background: "white", borderRadius: 16, padding: "20px", border: "1.5px solid #E8EDF5" }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 14, marginBottom: 14 }}>Your Top Skills</div>
              {["Figma", "Design Systems", "UX Research", "Prototyping", "React"].map((skill, i) => (
                <div key={skill} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: "#64748B" }}>{skill}</span>
                  <div style={{ width: 100, height: 5, background: "#E8EDF5", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: `${[95, 88, 80, 75, 60][i]}%`, height: "100%", background: GOLD, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{ background: "white", borderRadius: 16, padding: "20px", border: "1.5px solid #E8EDF5" }}>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 14, marginBottom: 14 }}>Recent Activity</div>
              {[
                { icon: "✅", text: "Applied to Airbnb UI Designer", time: "1d ago" },
                { icon: "🔖", text: "Saved Notion UX/UI Designer", time: "2d ago" },
                { icon: "❤️", text: "Liked Linear Product Designer", time: "3d ago" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#334155", fontWeight: 600, lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}