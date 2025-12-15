import apiClient from "../../api/apiClient";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PulsePreloader from "../../components/PulsePreloader"; // ✅ default import
import { useOutletContext } from "react-router-dom";



const API_URL = import.meta.env.VITE_API_URL;


const HomePage = () => {
  const { filters, shouldFetch, setShouldFetch } = useOutletContext();

  // states
  const [jobs, setJobs] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals states
  const [isUploadCvOpen, setUploadCvOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Initial fetch on page load
    const fetchInitialJobs = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(`${API_URL}/jobs`, {
          params: { page }
        });

        setJobs(response.data);

      } catch (err) {
        console.error(err);
        setError("Failed to fetch job listings.");

        // NETWORK ERROR (no response received)
        if (!err.response) {
          console.log("NETWORK ERROR:", err.message);
          return;
        }

        // BACKEND ERROR (Laravel returned a status code)
        console.log("BACKEND ERROR");
        console.log("Status:", err.response.status);
        console.log("Message:", err.response.data.message);
        console.log("Internal:", err.response.data.error);

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
        // setError("Failed to fetch job listings.");

        // NETWORK ERROR (no response received)
        if (!err.response) {
          console.log("NETWORK ERROR:", err.message);
          return;
        }

        // BACKEND ERROR (Laravel returned a status code)
        console.log("BACKEND ERROR");
        console.log("Status:", err.response.status);
        console.log("Message:", err.response.data.message);
        console.log("Internal:", err.response.data.error);

      } finally {
        setLoading(false);
        setShouldFetch(false);
      }
    };

    fetchFilteredJobs();
  }, [shouldFetch, filters, page, setShouldFetch]);

  // Update openCvModal to clear localStorage when re-uploading
  const openCvModal = () => {
    if (selectedFile) {
      // Clear from localStorage when re-uploading
      localStorage.removeItem('uploadedCV');
      setSelectedFile(null);
    }
    setUploadCvOpen(true);
  };
  const closeModal = () => {
    setUploadCvOpen(false);
    // Don't clear selectedFile here anymore since it's stored in localStorage
    // setSelectedFile(null);
    setUploading(false);
  };
  // useEffect to load file from localStorage on mount
  useEffect(() => {
    const storedFile = localStorage.getItem('uploadedCV');
    if (storedFile) {
      const fileData = JSON.parse(storedFile);
      // Reconstruct a File-like object for display purposes
      setSelectedFile({
        name: fileData.name,
        size: fileData.size,
        type: fileData.type
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };



  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        // Store file metadata in localStorage
        const fileData = {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          uploadedAt: new Date().toISOString()
        };
        localStorage.setItem('uploadedCV', JSON.stringify(fileData));

        setNotification({
          type: 'success',
          message: `File uploaded successfully!`,
          fileName: selectedFile.name,
          fileSize: (selectedFile.size / 1024).toFixed(2)
        });
        closeModal();
        setUploading(false); // Move this here since we removed it from closeModal effect
        // Auto-hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      }, 1500);
    }
  };




  const handleLike = async (jobId) => {
    const res = await axios.post(`/api/jobs/like/${jobId}`);
    setLikesMap((prev) => ({
      ...prev,
      [jobId]: res.data.likes,
    }));
  };

  // 🔹 Conditional rendering
  if (loading) return <PulsePreloader loading={loading} />;
  if (error) return (
    <div className="px-8">
      <div className="grid w-full p-4 my-6 rounded-2xl bg-red-50 border border-red-200 shadow-sm">
        <h2 className="text-red-700 font-semibold text-lg mb-1">
          We’re experiencing technical issues
        </h2>
        <p className="text-red-600 text-sm">
          Please stay patient — our technical team is already working to restore the service as soon as possible.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-sm bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

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
                    <b>Latest Jobs</b>
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
                <h2 className="text-gray-600 text-sm mb-4">
                  <b><i>Latest Jobs</i></b>
                </h2>

                {jobs?.data?.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                    <div className="mb-4">
                      <svg
                        className="mx-auto h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Jobs Available
                    </h3>
                    <p className="text-gray-500 mb-4">
                      There are currently no such job postings. Check back later for new opportunities!
                    </p>
                    <button className="bg-yellow-600 hover:bg-yellow-900 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                      Get Notified
                    </button>
                  </div>

                ) : (
                  jobs?.data?.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg p-2 mb-4">
                      <div className="job-card flex gap-3 p-2">
                        <div className="job-logo-section flex-shrink-0">
                          <img
                            src={
                              job.employer?.logoUrl
                                ? job.employer.logoUrl
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  job.employer?.companyName || "Unknown"
                                )}&background=random&size=50`
                            }
                            alt={`${job.employer?.companyName || "Employer"} Logo`}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="job-title text-gray-900 cursor-pointer">
                              <b>
                                <Link
                                  to={`jobDetails/${job.id}`}
                                  className="text-gray-9 hover:text-yellow-600"
                                >
                                  {job.job_title} at {job.employer.companyName}
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
                            • Salary range: KSH {job.salary_min} - KSH {job.salary_max} • Onsite
                          </div>
                          <p className="text-gray-700 leading-relaxed">{job.employer.companyDescription}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>


              <div className="flex justify-center items-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                  disabled={!jobs?.prev_page_url}
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
      bg-yellow-600 text-white hover:bg-yellow-900
      disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {(() => {
                    const currentPage = jobs?.current_page || 1;
                    const lastPage = jobs?.last_page || 1;
                    const pages = [];

                    // Always show first page
                    if (currentPage > 3) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => setPage(1)}
                          className="px-4 py-2 rounded-lg font-medium transition-all duration-200
              bg-white text-[#002B5B] hover:bg-yellow-100 border border-gray-200"
                        >
                          1
                        </button>
                      );

                      if (currentPage > 4) {
                        pages.push(
                          <span key="dots1" className="px-2 py-2 text-[#002B5B]">
                            ...
                          </span>
                        );
                      }
                    }

                    // Show pages around current page
                    const startPage = Math.max(1, currentPage - 2);
                    const endPage = Math.min(lastPage, currentPage + 2);

                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setPage(i)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${i === currentPage
                              ? 'bg-yellow-600 text-white'
                              : 'bg-white text-[#002B5B] hover:bg-yellow-100 border border-gray-200'
                            }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    // Always show last page
                    if (currentPage < lastPage - 2) {
                      if (currentPage < lastPage - 3) {
                        pages.push(
                          <span key="dots2" className="px-2 py-2 text-[#002B5B]">
                            ...
                          </span>
                        );
                      }

                      pages.push(
                        <button
                          key={lastPage}
                          onClick={() => setPage(lastPage)}
                          className="px-4 py-2 rounded-lg font-medium transition-all duration-200
              bg-white text-[#002B5B] hover:bg-yellow-100 border border-gray-200"
                        >
                          {lastPage}
                        </button>
                      );
                    }

                    return pages;
                  })()}
                </div>

                {/* Next Button */}
                <button
                  disabled={!jobs?.next_page_url}
                  onClick={() => setPage((old) => (jobs?.next_page_url ? old + 1 : old))}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    bg-yellow-600 text-white hover:bg-yellow-900
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="md:col-span-1 space-y-4">
              {/* upload CV */}
              {selectedFile ? (
                <div className="rounded-lg p-4">
                  <i><b>CV uploaded successfully! Ready to check alignment with jobs.</b></i>
                  <button
                    onClick={openCvModal}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900 mt-2">
                    <b>Re-upload CV</b>
                  </button>
                </div>
              ) : (
                <div className="rounded-lg p-4">
                  <i><b>Upload your CV to check how it aligns with Jobs</b></i>
                  <button
                    onClick={openCvModal}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-900 mt-2">
                    <b>Upload your CV</b>
                  </button>
                </div>
              )}

              {/* Featured Service */}
              <div className="bg-white p-4 rounded-lg" >
                <h6 className="font-bold mb-2 text-[#002B5B]">
                  💼 Featured Service: TalentLink Recruiters
                </h6>
                <div className="rounded-lg p-4" style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}>
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
              </div>

              {/* Jobs by Category */}
              <div className="bg-white p-4 rounded-lg">
                <h6 className="font-bold mb-2">🗂 Jobs by Category</h6>
                <div className="flex flex-wrap gap-2 text-sm p-4 rounded-lg" style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}>
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
                <div className="flex flex-wrap gap-2 text-sm rounded-lg p-4" style={{ borderColor: 'rgba(0, 43, 91, 0.2)', borderWidth: '1px' }}>
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
              <div className="mt-6 p-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
      </div>

      {/*Modals*/}
      {isUploadCvOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold" style={{ color: '#002B5B' }}>
                Upload File
              </h2>
              <p className="text-gray-600 mt-1">
                Select a file to upload
              </p>
            </div>

            {/* Modal Body */}
            <div>
              <div className="space-y-4">
                {/* File Upload Area */}
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-gray-400"
                  style={{ borderColor: selectedFile ? '#FFC107' : '#d1d5db' }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="*/*"
                  />

                  {!selectedFile ? (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        Click to browse or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Any file type accepted
                      </p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="h-8 w-8" style={{ color: '#FFC107' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-sm font-medium" style={{ color: '#002B5B' }}>
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedFile && (
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      document.getElementById('fileInput').value = '';
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Remove file
                  </button>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border-2 rounded-lg font-semibold transition-colors"
                  style={{
                    borderColor: '#002B5B',
                    color: '#002B5B',
                  }}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: selectedFile && !uploading ? '#FFC107' : '#d1d5db',
                    color: selectedFile && !uploading ? '#002B5B' : '#6b7280'
                  }}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Custom Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-2000 animate-slide-in">
          <div
            className="bg-white rounded-lg shadow-2xl p-4 max-w-sm border-l-4 flex items-start gap-3"
            style={{ borderColor: notification.type === 'success' ? '#FFC107' : '#ef4444' }}
          >
            {/* Icon */}
            <div
              className="rounded-full p-1 flex-shrink-0"
              style={{ backgroundColor: notification.type === 'success' ? '#d1fae5' : '#fee2e2' }}
            >
              {notification.type === 'success' ? (
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold" style={{ color: '#002B5B' }}>
                {notification.message}
              </p>
              {notification.fileName && (
                <p className="text-sm text-gray-600 mt-1">
                  {notification.fileName} ({notification.fileSize} KB)
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
