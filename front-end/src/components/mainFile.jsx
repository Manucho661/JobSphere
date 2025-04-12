import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
 import "./styles/mainfile.css";
 import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
 import "@fortawesome/fontawesome-free/css/all.min.css";


console.log("🏡 Home Component Loaded"); // ✅ Check if Home is rendering

const fetchJobs = async () => {
  console.log("📡 Fetching jobs..."); // ✅ Check if fetch function runs
  const response = await apiClient.get("/jobs");
  console.log("✅ Fetched Jobs:", response.data); // ✅ See API response
  return response.data;
};

const Home = () => {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  console.log("🛠 Jobs in Component:", jobs); // ✅ Check if data is stored

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  return (
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
          <div class="card">
            <div class="card-header search-header-label">
            Search For Your Dream Job
            </div>
            <div class="card-body">
              <form action="">
                {/* row */}
                <div class="row mb-2">
                  <div class="col-md-12">
                    <label htmlFor="">Job</label>
                    <input type="text" class="search-input job" placeholder="Search Tenant..."/>
                  
                  </div>
                </div>
                {/* End row */}

                {/* row */}
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label htmlFor="">Job Category</label>
                    <select id="categoryFilter" class="categoryFilter">
                      <option value="">-- Select Building--</option>
                      <option value="technology">All</option>
                      <option value="health">Manucho</option>
                      <option value="business">Ebenezer</option>
                      <option value="education">Crown Z</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label htmlFor="">Job Type</label>
                    <select id="categoryFilter" class="categoryFilter">
                      <option value="">-- Select Building--</option>
                      <option value="technology">All</option>
                      <option value="health">Manucho</option>
                      <option value="business">Ebenezer</option>
                      <option value="education">Crown Z</option>
                    </select>
                  </div>
                </div>
               {/* End row */}

                {/* row */}
                <div class="row mb-2 ">
                  <div class="col-md-6">
                    <label htmlFor="">Job Level</label>
                    <select id="categoryFilter" class="categoryFilter">
                      <option value="">-- Select Building--</option>
                      <option value="technology">All</option>
                      <option value="health">Manucho</option>
                      <option value="business">Ebenezer</option>
                      <option value="education">Crown Z</option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label htmlFor="">Experience</label>
                    <select id="categoryFilter" class="categoryFilter">
                      <option value="">-- Select Building--</option>
                      <option value="technology">All</option>
                      <option value="health">Manucho</option>
                      <option value="business">Ebenezer</option>
                      <option value="education">Crown Z</option>
                    </select>
                  </div>
                </div>
                 {/* End row */}

                  {/* row */}
                <div class="row mb-2">
                  <div class="col-md-12">
                    <label htmlFor="">Expected Salary</label>
                    <select id="categoryFilter" class="categoryFilter">
                                <option value="">-- Select Building--</option>
                                <option value="technology">All</option>
                                <option value="health">Manucho</option>
                                <option value="business">Ebenezer</option>
                                <option value="education">Crown Z</option>
                    </select>

                  </div>
                </div>
                {/* End row */}

                  {/* row */}
                  <div class="row">
                    <div class="col-md-12">
                    <button class="btn search">Search</button>
                    </div>
                 
                  </div>
                  {/* End row */}
                </form>
                
                              

              
         
                 </div>
            

          </div>
         </div>

      </div>    
      
    </div>
  );
};

export default Home;
