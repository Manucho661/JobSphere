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

      <h1 class="text-white">Your Future Starts Here — Find the Job You Deserve.</h1>


              

      </div>

      
     
      
    </div>
  );
};

export default Home;
