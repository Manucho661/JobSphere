import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
 import "../styles/Home.css";
 import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

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
    <div className="homeStyle">
      
      <h1 className="text-primary" >JOBSPHERE</h1>
      <ul>
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ${job.salary}</p>
            
            </li>

          ))
        ) : (
          <p>No jobs available</p>

        )}
      </ul>
    </div>
  );
};

export default Home;
