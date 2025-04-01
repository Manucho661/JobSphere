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
    <div class="container-fluid bg-light job-listing">
      <div class="row">

           <div class="featured"> Featured Jobs</div>
              <div class="col-md-3">
              
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <h5 class="job-title">{job.title}</h5>
                        <div class="company">Nucho Ltd</div>
                        <p class="location" >Nairobi, Kenya</p>
                        <p class="period">30 days remaining</p>
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
          
              </div>
              <div class="col-md-3">
             
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <h5 class="job-title">{job.title}</h5>
                        <div class="company">Nucho Ltd</div>
                        <p class="location" >Nairobi, Kenya</p>
                        <p class="period" >30 days remaining</p>
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
              </div>
              <div class="col-md-3">
              
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <h5 class="job-title">{job.title}</h5>
                        <div class="company">Nucho Ltd</div>
                        <p class="location">Nairobi, Kenya</p>
                        <p class="period" >30 days remaining</p>
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
          

              </div>
              <div class="col-md-3">
              
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <h5 class="job-title">{job.title}</h5>
                        <div class="company">Nucho Ltd</div>
                        <p class="location">Nairobi, Kenya</p>
                        <p class="period" >30 days remaining</p>
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
          

              </div>

              

      </div>

      <div class="row mt-3">
       <div class="featured-categories ">Featured Categories</div>
        <div class="col-md-3">
        {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="featured-job">
                        <h3> <i className="fas fa-graduation-cap icon"></i> </h3>
                        <p> Education</p>
                        <p class="openings">130 0penings</p>
                       
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
              </div>
              <div class="col-md-3">
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="featured-job">
                        <h3> <i className="fas fa-graduation-cap icon"></i>  </h3>
                        <p>Education</p>
                        <p class="openings" >130 0penings</p>
                       
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
              </div>
              <div class="col-md-3">
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="featured-job">
                        <h3> <i className="fas fa-graduation-cap icon"></i>  </h3>
                        <p>Education</p>
                        <p class="openings" >130 0penings</p>
                       
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
          
              </div>
              <div class="col-md-3">
              {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div key={job.id} className="featured-job">
                        <h3 class="icon"> <i className="fas fa-graduation-cap icon"></i>   </h3>
                        <p>Education</p>
                        <p class="openings" >130 0penings</p>
                       
                      </div>
                    ))
             
              ) : (
                <p>No jobs available</p>

              )}
              </div>

      </div>
      
     
      
    </div>
  );
};

export default Home;
