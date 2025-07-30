import Header from "../../components/common/Header";
import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


import "../../styles/Home.css";

const fetchJobs = async () => {
    console.log("📡 Fetching jobs..."); // ✅ Check if fetch function runs
    const response = await apiClient.get("/jobs");
    console.log("✅ Fetched Jobs:", response.data); // ✅ See API response
    return response.data;
};

const HomePage = () => {
    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ["jobs"],
        queryFn: fetchJobs,
    });
    // hooks
    const [likesMap, setLikesMap] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleLike = async (jobId) => {
        const res = await axios.post(`/api/jobs/like/${jobId}`);
        setLikesMap((prev) => ({
            ...prev,
            [jobId]: res.data.likes,
        }));
    }

    return (
        <>
            <div className="container-fluid py-3">
                <div className="container">
                    <h4 className=" landing-header text-white">Your Future Starts Here — Find the Job You Deserve.</h4>
                    <form className="d-flex justify-content-center" role="search" action="">
                        <input
                            className="form-control me-2 w-50"
                            type="search" placeholder="Search Jobs"
                            aria-label="Search"
                            style={{ borderRadius: '8px' }}
                        />
                        <button className="btn" type="submit" style={{ backgroundColor: '#FFC107', color: '#00192D', fontWeight: 600 }}>Search</button>
                    </form>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9">
                            <ul className="nav nav-tabs mb-3 gap-3" id="jobTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active " id="find-tab" data-bs-toggle="tab" data-bs-target="#find" type="button" role="tab"> <span>Find a Job</span> </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="find-tab" data-bs-toggle="tab" data-bs-target="#find" type="button" role="tab"> <span>Featured Jobs</span> </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button class="nav-link" id="apps-tab" data-bs-toggle="tab" data-bs-target="#applications" type="button" role="tab"><span>Your Applications</span> </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab"><span>Previous Jobs</span></button>
                                </li>
                            </ul>
                            <div className="tab-content bg-light rounded-2" id="jobTabsContent">
                                <div className="tab-pane fade show active" id="find" role="tabpanel">
                                    <div className="section-title text-mute">Latest Jobs</div>
                                </div>
                                <div className="" style={{ paddingRight: '10px' }}>
                                    {
                                        jobs &&
                                        jobs.map((job) => (

                                            <div key={job.id} className="job-card mb-3 p-3 bg-white shadow-sm rounded">
                                                <div className="d-flex justify-content-between">
                                                    <div className="px-2">
                                                        <img
                                                            src={
                                                                job.employer.logoUrl
                                                                    ? job.employer.logoUrl
                                                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(job.employer.companyName)}&background=random&size=50`
                                                            }
                                                            alt={`${job.employer.companyName} Logo`}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                                        />
                                                    </div>
                                                    <div className="" style={{ width: '100%' }}>
                                                        <div className="title" style={{ fontWeight: 'bold', color: '#00192D' }}>
                                                            {job.title} At {job.employer.companyName}
                                                        </div>
                                                        <div className="text-muted mb-2">
                                                            Posted: {new Date(job.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })} •
                                                            Salary: {job.salary}
                                                        </div>
                                                        <p style={{ color: 'rgb(0 28 63 / 60%)' }}>{job.employer.companyDescription}</p>
                                                    </div>

                                                    <div className="text-end d-flex flex-column align-items-end" style={{ whiteSpace: 'nowrap' }}>
                                                        <button
                                                            className="btn btn-outline-warning apply-btn text-dark mb-2"
                                                            onClick={openModal}
                                                        >
                                                            Apply
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-light border text-muted"
                                                            onClick={() => handleLike(job.id)}
                                                        >
                                                            👍 {likesMap[job.id] ?? job.likes}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="position-sticky" style={{ top: '80px', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
                                <div class="p-4 mb-4 shadow-sm bg-white rounded border">
                                    <h5 className="fw-bold">📬 Subscribe to Job Alert</h5>
                                    <p className="small text-muted">Join thousands getting job updates weekly</p>
                                    <input type="email" class="form-control mb-2" placeholder="Enter your email here!" />
                                    <button className="btn btn-dark w-100" style={{ backgroundColor: '#00192D' }}>Subscribe</button>
                                </div>
                                <div className="p-4 mb-4 shadow-sm bg-white border border-primary rounded">
                                    <h6 className="fw-bold mb-2" style={{ color: '#002B5B' }}>💼 Featured Service: TalentLink Recruiters</h6>
                                    <p className="text-dark small mb-1">
                                        Looking to grow your team? <strong>TalentLink</strong> connects you with top professionals in finance, tech, marketing, and more.
                                    </p>
                                    <div className="mb-2">
                                        <span className="badge text-white me-1" style={{ background: '#002B5B' }}>Verified Candidates</span>
                                        <span className="badge bg-light text-dark border">Industry Experts</span>
                                    </div>
                                    <a href="#" className="btn btn-sm btn-outline-warning text-dark w-100">Find Talent with TalentLink</a>
                                </div>
                                {/* <!-- Category --> */}
                                <div className="p-3 mb-4 shadow-sm bg-white rounded border">
                                    <h6 className="fw-bold">🗂 Jobs by Category</h6>
                                    <div className="d-flex flex-column gap-2 small">
                                        <a href="#" className="text-decoration-none text-dark">Accounting</a>
                                        <a href="#" className="text-decoration-none text-dark">Finance</a>
                                        <a href="#" className="text-decoration-none text-dark">Marketing</a>
                                        <a href="#" className="text-decoration-none text-dark">Human Resources (HR)</a>
                                        <a href="#" className="text-decoration-none text-dark">Information Technology (IT)</a>
                                        <a href="#" className="text-decoration-none text-dark">Customer Service</a>
                                        <a href="#" className="text-decoration-none text-dark">Sales</a>
                                        <a href="#" className="text-decoration-none text-dark">Operations Management</a>
                                    </div>
                                </div>
                                {/* <!-- Location --> */}
                                <div className="p-3 shadow-sm bg-white rounded border">
                                    <h6 className="fw-bold">📍 Jobs by Location</h6>
                                    <div className="d-flex flex-wrap gap-2 small">
                                        <a href="#" className="text-decoration-none text-dark">Nairobi</a>
                                        <a href="#" className="text-decoration-none text-dark">Mombasa</a>
                                        <a href="#" className="text-decoration-none text-dark">Kisumu</a>
                                        <a href="#" className="text-decoration-none text-dark">Eldoret</a>
                                        <a href="#" className="text-decoration-none text-dark">Nakuru</a>
                                        <a href="#" className="text-decoration-none text-dark">Thika</a>
                                        <a href="#" className="text-decoration-none text-dark">Kitale</a>
                                        <a href="#" className="text-decoration-none text-dark">Machakos</a>
                                    </div>
                                    <button class="btn btn-warning btn-sm mt-2">View All Locations</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Modal and overlay */}
            {isOpen && (
                <>

                </>
            )}
        </>

    );
};

export default HomePage;