import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PulsePreloader from "../../components/PulsePreloader"; // ✅ default import
import { useOutletContext } from "react-router-dom";



const API_URL = import.meta.env.VITE_API_URL;


const HomePage = () => {
  const { filters, shouldFetch, setShouldFetch } = useOutletContext();

  // State
  const [jobs, setJobs] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Initial fetch on page load
    const fetchInitialJobs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`${API_URL}/jobs`, {
          params: { page } // no filters yet
        });
        setJobs(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialJobs();
  }, []); // run once on mount



  useEffect(() => {
    if (!shouldFetch) return;
    console.log(filters);
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`${API_URL}/jobs`, {
          params: { page, ...filters } // now latest filters
        });
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
        setShouldFetch(false);
      }
    };

    fetchFilteredJobs();
  }, [shouldFetch, filters, page, setShouldFetch]);




  const handleLike = async (jobId) => {
    const res = await axios.post(`/api/jobs/like/${jobId}`);
    setLikesMap((prev) => ({
      ...prev,
      [jobId]: res.data.likes,
    }));
  };

  // subscribe
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(`/subscribe`, { email });
      return response.data;
    }
    catch (err) {

    }
  }
  // 🔹 Conditional rendering
  if (loading) return <PulsePreloader loading={loading} />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <>
      <div className="py-3">
        <div className="mt-2 rounded-xl p-8 mb-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left content */}
            <div className="md:col-span-2">
              {/* Tabs */}
              <ul className="flex flex-wrap gap-3 border-b border-gray-300 mb-4" role="tablist">
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium border-b-2 border-gray-500 hover:text-yellow-600"
                    role="tab"
                  >
                    <b>Find a Job</b>
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600"
                    role="tab"
                  >
                    <b>Featured Jobs</b>

                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600"
                    role="tab"
                  >
                    <b>Saved Jobs</b>

                  </button>
                </li>

              </ul>

              {/* Job list */}
              <div className="tab-content">
                <h2 className="text-gray-600 text-sm mb-4"><b> <i>Latest Jobs</i></b></h2>
                {jobs?.data?.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg p-2 mb-4"
                  >
                    <div className="job-card flex gap-3 p-2">
                      <div className="job-logo-section flex-shrink-0">
                        <img
                          src={
                            job.employer?.logoUrl
                              ? job.employer.logoUrl
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                job.employer?.user?.name || "Unknown"
                              )}&background=random&size=50`
                          }
                          alt={`${job.employer?.user?.name || "Employer"} Logo`}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="job-title  text-gray-900 cursor-pointer">
                            <b>
                              <Link
                                to={`jobDetails/${job.id}`}
                                className=" text-gray-9 hover:text-yellow-600"
                              >
                                {job.jobTitle} at {job.employer.user.name}
                              </Link>
                            </b>

                          </div>
                          <button
                            className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 whitespace-nowrap"
                            onClick={() => handleLike(job.id)}
                          >
                            👍 {likesMap[job.id] ?? job.likes}
                          </button>

                        </div>
                        <div className="text-gray-500 text-sm mb-2">
                          Posted:{" "}
                          {new Date(job.created_at).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          • Salary range: KSH  {job.minSalary} - KSH {job.maxSalary}
                          {" "} • Onsite
                        </div>
                        <p
                          className="text-gray-700 leading-relaxed"
                        >
                          {job.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                {/* Previous Button */}
                <button
                  disabled={!jobs?.prev_page_url}
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
               bg-yellow-600  text-white hover:bg-yellow-900 hover:text-dark
               disabled:cursor-not-allowed "
                >
                  <ArrowLeft className="w-4 h-4" />
                  <b>Previous</b>
                </button>

                {/* Page Info */}
                <span className="text-[#002B5B] font-medium">
                  Page {jobs?.current_page} of {jobs?.last_page}
                </span>

                {/* Next Button */}
                <button
                  disabled={!jobs?.next_page_url}
                  onClick={() =>
                    setPage((old) => (jobs?.next_page_url ? old + 1 : old))
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
               bg-yellow-600 text-white hover:bg-yellow-900
                disabled:cursor-not-allowed"
                >
                  <b>Next</b>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="md:col-span-1 space-y-4">
              {/* Subscribe */}


              {/* Featured Service */}
              <div className="bg-white p-4 rounded-lg">
                <h6 className="font-bold mb-2 text-[#002B5B]">
                  💼 Featured Service: TalentLink Recruiters
                </h6>
                <p className="text-sm text-gray-700 mb-2">
                  Looking to grow your team? <strong>TalentLink</strong> connects you
                  with top professionals in finance, tech, marketing, and more.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900 cursor-pointer">
                    <b>Verified Candidates</b>
                  </span>
                  <span className="bg-gray-100 border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded flex items-center">
                    Industry Experts
                  </span>
                </div>
                <a
                  href="#"
                  className="block text-center border border-gray-300 text-dark-600 text-sm py-2 rounded hover:bg-gray-50"
                >
                  Find Talent with TalentLink
                </a>
              </div>

              {/* Jobs by Category */}
              <div className="bg-white p-4 rounded-lg">
                <h6 className="font-bold mb-2">🗂 Jobs by Category</h6>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "Accounting",
                    "Finance",
                    "Marketing",
                    "Human Resources (HR)",
                    "Information Technology (IT)",
                    "Customer Service",
                    "Sales",
                    "Operations Management",
                  ].map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              {/* Jobs by Location */}
              <div className="bg-white p-4 rounded-lg">
                <h6 className="font-bold mb-2">📍 Jobs by Location</h6>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "Nairobi",
                    "Mombasa",
                    "Kisumu",
                    "Eldoret",
                    "Nakuru",
                    "Thika",
                    "Kitale",
                    "Machakos",
                  ].map((loc) => (
                    <a
                      key={loc}
                      href="#"
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      {loc}
                    </a>
                  ))}
                </div>
                <button className="mt-3 bg-yellow-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-yellow-900">
                  <b>View All Locations</b>
                </button>
              </div>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 class="font-semibold text-primary mb-3 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                  <b>Note</b>
                </h4>
                <p className="space-y-2 text-sm text-gray-700"> <i>JobSphere relies on <b>Donations</b> to run its activities and keep you updated about new opportunities, you can channel your contribution of any amount by clicking the  donate button below :-</i> </p>
                <div className='Donation flex'>
                  <div className='flex items-center'> Your yearly donations <span className='mx-4'><b style={{ whiteSpace: 'nowrap' }}>KSH 0</b></span></div>
                  {""} {""}
                  <button className='mx-4 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900'> <b>Donate</b> </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomePage;
