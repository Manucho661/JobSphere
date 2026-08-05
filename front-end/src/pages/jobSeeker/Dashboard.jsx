import { useState, useEffect, useMemo } from "react";
import apiClient from "../../api/apiClient";


const API_URL = import.meta.env.VITE_API_URL;


const NAVY = "#002B5B";
const GOLD = "#FFC107";
const storedUser = JSON.parse(localStorage.getItem("user"));
const userName = storedUser?.name;



export default function Dashboard() {
  // states
  const [jobsN, setJobsData] = useState(null); // full paginated response
  const [jobsList, setJobsList] = useState([]);   // just array for renderingG
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUnauthenticated, setIsUnauthenticated] = useState(false);


  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minMatch, setMinMatch] = useState(0);
  const [savedJobs, setSavedJobs] = useState(new Set([2, 6]));
  const [likedJobs, setLikedJobs] = useState(new Set([1, 3]));
  const [appliedJobs, setAppliedJobs] = useState(new Set([4]));
  const [sortBy, setSortBy] = useState("match");

  // Initial fetch
  useEffect(() => {
    const fetchInitialJobs = async () => {
      const token = localStorage.getItem("auth_token");

      console.log(token);
      // No token => unauthenticated (no error)
      if (!token) {
        setIsUnauthenticated(true);
        setError(null);
        setLoading(false);
        return;
      }
      console.log('yoyooy');

      try {
        setLoading(true);
        setIsUnauthenticated(false);
        setError(null);

        const response = await apiClient.get(`${API_URL}/job-seeker-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobsData(response.data);

      } catch (err) {
        console.error(err);

        // ✅ Auth case (NOT an error)
        if (isAuthError(err)) {
          setIsUnauthenticated(true);
          setError(null);
          setJobsList([]);
          setJobsData(null);
          return;
        }

        // ❌ Real error case
        setIsUnauthenticated(false);
        setError("We’re experiencing technical issues. Please try again.");

        if (!err.response) {
          console.log("NETWORK ERROR:", err.message);
          return;
        }

        console.log("BACKEND ERROR");
        console.log("Status:", err.response.status);
        console.log("Message:", err.response.data?.message);
        console.log("Internal:", err.response.data?.error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialJobs();
  }, []);


  const toggleSave = (id) => setSavedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleLike = (id) => setLikedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleApply = (id) => setAppliedJobs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  
  const tabs = [
    { id: "all", label: "All Jobs",  },
    // { id: "personalized", label: "For You", count: jobsData.filter(j => j.personalized).length },
    { id: "saved", label: "Saved",  },
    { id: "liked", label: "Liked",  },
    { id: "applied", label: "Applied", },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F9FC",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Header */}


      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px" }}>
        {/* Welcome + Stats */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ color: NAVY, fontWeight: 800, fontSize: 28, margin: 0, letterSpacing: "-0.03em" }}>
            Good morning, {userName} 👋
          </h1>
          {/* <p style={{ color: "#64748B", marginTop: 6, marginBottom: 24, fontSize: 15 }}>
            You have <strong style={{ color: NAVY }}>{jobsData.filter(j => j.personalized).length} personalized matches</strong> waiting for you today.
          </p> */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {/* {stats.map(s => (
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
            ))} */}
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: "white", borderRadius: 16, padding: "20px 24px",
          border: "0", marginBottom: 24,

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
          </div>
        </div>

        {/* Tabs + Job List */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "white", borderRadius: 12, padding: 4, border: "0", width: "fit-content" }}>
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
              Showing <strong style={{ color: NAVY }}>5</strong> jobs
            </div>

            {/* Cards */}
            {5 === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#94A3B8", border: "0" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#64748B" }}>No jobs found</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                
                
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            
            {/* Top Skills */}
            <div style={{ background: "white", borderRadius: 16, padding: "20px", border: "0" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}