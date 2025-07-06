import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
 import "./styles/mainfile.css";
 import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
 import "@fortawesome/fontawesome-free/css/all.min.css";
 import { Heart } from 'lucide-react'; // install with `npm install lucide-react`
import Footer from "./Footer";

console.log("🏡 Home Component Loaded"); // ✅ Check if Home is rendering

const fetchJobs = async () => {
  console.log("📡 Fetching jobs..."); // ✅ Check if fetch function runs
  const response = await apiClient.get("/jobs");
  console.log("✅ Fetched Jobs:", response.data); // ✅ See API response
  return response.data;
};
const fetchAds = async () => {
  console.log("📡 Fetching ads..."); // ✅ Check if fetch function runs
  const response = await apiClient.get("/ads");
  console.log("✅ Fetched ads:", response.data); // ✅ See API response
  return response.data;
};


const Home = () => {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  const {
  data: ads,
  isLoading: adsLoading,
  error: adsError,
} = useQuery({
  queryKey: ["ads"],
  queryFn: fetchAds,
});

  console.log("🛠 Jobs in Component:", jobs); // ✅ Check if data is stored

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;


  return (
    <div>
    <div class="container-fluid job-listing">
      <div class="row">

      <h1 class=" landing-header mt-5">Your Future Starts Here — Find the Job You Deserve.</h1>
              
      </div>
      {/* start row */}
      <div class="row ">

        <div class="col-md-8">

        </div>

        <div class="col-md-4  d-flex justify-content-between">

      {/* Start Card */}
           <div className="search-card">
      <div className="search-card-header">
        Search For Your Dream Job
      </div>

      <div className="search-card-body">
        <form>
          <div className="form-group">
            <label>Job</label>
            <input type="text" className="search-input" placeholder="Search for a job..." />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>Job Category</label>
              <select className="search-select">
                <option value="">-- Select Category --</option>
                <option value="all">All</option>
                <option value="manucho">Manucho</option>
                <option value="ebenezer">Ebenezer</option>
                <option value="crownz">Crown Z</option>
              </select>
            </div>

            <div className="form-group half-width">
              <label>Job Type</label>
              <select className="search-select">
                <option value="">-- Select Type --</option>
                <option value="all">All</option>
                <option value="manucho">Manucho</option>
                <option value="ebenezer">Ebenezer</option>
                <option value="crownz">Crown Z</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>Job Level</label>
              <select className="search-select">
                <option value="">-- Select Level --</option>
                <option value="all">All</option>
                <option value="manucho">Manucho</option>
                <option value="ebenezer">Ebenezer</option>
                <option value="crownz">Crown Z</option>
              </select>
            </div>

            <div className="form-group half-width">
              <label>Experience</label>
              <select className="search-select">
                <option value="">-- Select Experience --</option>
                <option value="all">All</option>
                <option value="manucho">Manucho</option>
                <option value="ebenezer">Ebenezer</option>
                <option value="crownz">Crown Z</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Expected Salary</label>
            <select className="search-select">
              <option value="">-- Select Salary Range --</option>
              <option value="all">All</option>
              <option value="manucho">Manucho</option>
              <option value="ebenezer">Ebenezer</option>
              <option value="crownz">Crown Z</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn-search">Search</button>
          </div>
        </form>
      </div>
    </div>
         </div>

      </div>

      <div class="row">
    
      </div>    
      
    </div>
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Main Content Area */}
          <div className="col-md-9">
            <h2 className="featured-heading mb-4">🌟 Featured Jobs</h2>
            <div className="row">
                  {jobs.length === 0 ? (
                    <p>No featured jobs found.</p>
                  ) : (
                    jobs.map((job) => (
                <div key={job.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title fw-bold text-primary">{job.title}</h5>
                        <Heart className="w-6 h-6 text-red-500 fill-red-500 cursor-pointer" />
                      </div>  
                      <h6 className="card-subtitle mb-2 text-muted">{job.company} Nucho Ltd</h6>
                      <p className="card-text">
                        <i className="bi bi-geo-alt-fill me-1 text-secondary"></i>
                        {job.location} 
                      </p>
                       {/* Remaining Days Calculation */}
                      <p className="text-danger fw-semibold mt-2">
                        {/* {getRemainingDays(job.deadline)}  */}
                       4 days remaining
                      </p>
                      <a href="#" className="btn btn-outline-primary btn-sm mt-3">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
                  ))
                )}
            </div>

            <div className="row">
              <h2 className="featured-heading mb-4">🌟Featured Categories</h2>
              <div class="col-md-4 col-sm-6 mb-4">
                <div class="card shadow-sm h-100 border-0">
                  <div class="card-body d-flex align-items-center">
                    <div class="me-3">
                      <i class="fas fa-calculator fa-2x text-primary"></i> 
                    </div>
                    <div>
                      <h5 class="card-title mb-1">Accounting</h5>
                      <p class="card-text text-muted mb-0">12 Active Jobs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4 mb-4">
                <div class="card shadow-sm h-100 border-0">
                  <div class="card-body d-flex align-items-center">
                    <div class="me-3">
                      <i class="fas fa-calculator fa-2x text-primary"></i> 
                    </div>
                    <div>
                      <h5 class="card-title mb-1">Accounting</h5>
                      <p class="card-text text-muted mb-0">12 Active Jobs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6 mb-4">
                <div class="card shadow-sm h-100 border-0">
                  <div class="card-body d-flex align-items-center">
                    <div class="me-3">
                      <i class="fas fa-calculator fa-2x text-primary"></i> 
                    </div>
                    <div>
                      <h5 class="card-title mb-1">Accounting</h5>
                      <p class="card-text text-muted mb-0">12 Active Jobs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="col-md-3">
            {/* Add ads content here */}
            <div className="ads-section">
             
              {adsLoading ? (
              <p>Loading ads...</p>
              ) : adsError ? (
              <p>Error loading ads: {adsError.message}</p>
              ) : ads.length === 0 ? (
              <p>No ads available.</p>
              ) : (
              ads.map((ad) => (
              <div key={ad.id} className="card mb-3 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">{ad.title}</h5>
                  <p className="card-text small">{ad.description}</p>
                  <p className="card-subtitle text-muted text-end">{ad.company}</p>
                </div>
              </div>
              ))
              )}
              </div>

          </div>
        </div>
      </div>
       <Footer />

    </div>
  );
};

export default Home;
