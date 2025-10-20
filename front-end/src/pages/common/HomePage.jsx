import Header from "../../components/common/Header";
import apiClient from "../../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import "./Home.css";

const fetchJobs = async (page = 1) => {
  const response = await apiClient.get(`/jobs?page=${page}`);
  return response.data;
};






const HomePage = () => {
  const [page, setPage] = useState(1);

  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs", page], // ✅ React Query refetches when page changes
    queryFn: () => fetchJobs(page),
    keepPreviousData: true, // ✅ smooth transition when switching pages
  });
  // hooks
  const [likesMap, setLikesMap] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // controls the 'active' class
  // set email for subscribe
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setShowModal(true), 10); // triggers the transition
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setIsOpen(false), 300); // wait for animation to finish
  };

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
  return (
    <>
      <div className="w-full bg-gray-100 py-0">
        <div className="max-w-5xl mx-auto text-center px-2">
          {/* Heading */}
          <h4 className="text-xl md:text-2xl font-semibold text-[#002B5B] mb-6">
            Your Tech Future Starts Here — Find the Job You Deserve.
          </h4>

          {/* Search Form */}
          <form className="flex justify-center items-center space-x-3" role="search">
            <input
              type="search"
              placeholder="Search Jobs"
              aria-label="Search"
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold bg-yellow-400 text-[#00192D] hover:bg-yellow-500 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left content */}
            <div className="lg:col-span-9">
              {/* Tabs */}
              <ul className="flex flex-wrap gap-3 border-b mb-4" role="tablist">
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
                    role="tab"
                  >
                    Find a Job
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                    role="tab"
                  >
                    Featured Jobs
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                    role="tab"
                  >
                    Your Applications
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                    role="tab"
                  >
                    Previous Jobs
                  </button>
                </li>
              </ul>

              {/* Job list */}
              <div className="tab-content">
                <h2 className="text-gray-600 text-sm mb-4">Latest Jobs</h2>
                {jobs?.data?.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm p-4 mb-4"
                  >
                    <div className="job-card flex gap-3">
                      <div className="logo-section flex-shrink-0">
                        <img
                          src={
                            job.employer.logoUrl
                              ? job.employer.logoUrl
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                job.employer.companyName
                              )}&background=random&size=50`
                          }
                          alt={`${job.employer.companyName} Logo`}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div
                            className="job-title font-semibold text-gray-900 cursor-pointer"
                            onClick={openModal}
                          >
                            {job.title} at {job.employer.companyName}
                          </div>
                          <button
                            className="text-sm text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
                            onClick={() => handleLike(job.id)}
                          >
                            👍 {likesMap[job.id] ?? job.likes}
                          </button>
                        </div>
                        <div className="text-gray-500 text-sm mb-2">
                          Posted:{" "}
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          • Salary: {job.salary}
                        </div>
                        <p
                          className="text-gray-600 text-sm"
                          onClick={openModal}
                        >
                          {job.employer.companyDescription}
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
               bg-[#002B5B] text-white hover:bg-[#FFC107] hover:text-[#002B5B]
               disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
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
               bg-[#002B5B] text-white hover:bg-[#FFC107] hover:text-[#002B5B]
               disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-3 space-y-4">
              {/* Subscribe */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h5 className="font-bold">📬 Subscribe to Job Alert</h5>
                <p className="text-sm text-gray-500">
                  Join thousands getting job updates weekly
                </p>
                <form onSubmit={handleSubscribe} action="">
                  <input
                    type="email"
                    placeholder="Enter your email here!"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full bg-[#00192D] text-white rounded py-2 text-sm cursor-pointer">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Featured Service */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h6 className="font-bold mb-2 text-[#002B5B]">
                  💼 Featured Service: TalentLink Recruiters
                </h6>
                <p className="text-sm text-gray-700 mb-2">
                  Looking to grow your team? <strong>TalentLink</strong> connects you
                  with top professionals in finance, tech, marketing, and more.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-[#002B5B] text-white text-xs px-2 py-1 rounded">
                    Verified Candidates
                  </span>
                  <span className="bg-gray-100 border text-gray-700 text-xs px-2 py-1 rounded">
                    Industry Experts
                  </span>
                </div>
                <a
                  href="#"
                  className="block text-center border border-yellow-500 text-yellow-600 text-sm py-2 rounded hover:bg-yellow-50"
                >
                  Find Talent with TalentLink
                </a>
              </div>

              {/* Jobs by Category */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h6 className="font-bold mb-2">🗂 Jobs by Category</h6>
                <div className="flex flex-col gap-2 text-sm">
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
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              {/* Jobs by Location */}
              <div className="bg-white p-4 rounded-lg shadow">
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
                <button className="mt-3 bg-yellow-500 text-white text-sm px-3 py-2 rounded hover:bg-yellow-600">
                  View All Locations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal and overlay */}
      {isOpen && (
        <>
          {isOpen && (
            <>
              {/* Overlay */}
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                onClick={closeModal}
              />

              {/* Modal */}
              <div
                className={`job-modal fixed top-1/2 left-1/2 w-full max-w-2xl bg-white rounded-lg shadow-lg transform transition-all p-6 overflow-y-auto max-h-[90vh] ${showModal ? "-translate-x-1/2 -translate-y-1/2 scale-100 opacity-100" : "-translate-x-1/2 -translate-y-1/2 scale-95 opacity-0 pointer-events-none"
                  }`}
              >
                {/* Close / Back button */}
                <button
                  className="flex items-center gap-2 text-[#00192D] font-bold text-base hover:text-[#0057b8]"
                  onClick={closeModal}
                >
                  <span className="text-lg">←</span> Back
                </button>

                {/* Header */}
                <div className="flex gap-2 mt-4">
                  <h3 className="font-bold text-lg">Front-End Developer</h3>
                  <span>at</span>
                  <h3 className="font-bold text-lg">Elytica</h3>
                </div>

                {/* Company description */}
                <div className="mt-2 text-gray-700">
                  Pixelyte Tech is a fast-growing software company that helps startups and
                  enterprises deliver beautiful, scalable digital experiences. With a
                  collaborative team and remote-friendly culture, we prioritize innovation
                  and employee growth.
                </div>

                {/* Job details */}
                <div className="mt-4 space-y-1 text-gray-800">
                  <div><span className="font-semibold">Job Type:</span> Full-Time</div>
                  <div><span className="font-semibold">Qualification:</span> Diploma in Computer Science</div>
                  <div><span className="font-semibold">Experience:</span> 2+ Years</div>
                  <div><span className="font-semibold">Location:</span> Nairobi, Kenya</div>
                  <div><span className="font-semibold">Field:</span> Software Development</div>
                </div>

                {/* Duties & Responsibilities */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <div className="font-semibold mb-2">Duties & Responsibilities</div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Develop responsive web interfaces using HTML, CSS, and JavaScript.</li>
                    <li>Collaborate with UI/UX designers to implement modern user experiences.</li>
                    <li>Consume REST APIs and integrate backend services seamlessly.</li>
                    <li>Maintain code quality through code reviews and testing.</li>
                    <li>Stay updated with emerging front-end trends and technologies.</li>
                  </ul>
                </div>

                {/* Required Qualifications */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <div className="font-semibold mb-2">Required Qualifications</div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Diploma or higher in Computer Science or related field.</li>
                    <li>Strong understanding of HTML5, CSS3, and JavaScript (ES6+).</li>
                    <li>Familiarity with frameworks like React, Vue, or Angular.</li>
                    <li>Good grasp of version control (Git) and build tools (Webpack, Vite).</li>
                    <li>Excellent communication and teamwork skills.</li>
                  </ul>
                </div>

                {/* How to Apply */}
                <div className="mt-6">
                  <div className="font-semibold mb-2">How to Apply</div>
                  <p className="text-gray-700 leading-relaxed">
                    Interested candidates should send their CV and portfolio to{" "}
                    <a
                      href="mailto:careers@pixelytetech.com"
                      className="text-blue-600 hover:underline"
                    >
                      careers@pixelytetech.com
                    </a>{" "}
                    with the subject line{" "}
                    <strong>"Application for Front-End Developer – Nairobi"</strong>. Applications will be reviewed on a rolling basis. Early applicants will be given priority.
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
