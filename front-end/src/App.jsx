import { useQuery } from "@tanstack/react-query";
import apiClient from "./api/apiClient";

function App() {
  const { data: jobs, error, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await apiClient.get("/jobs");
      return response.data;
    }
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 my-2">
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p>📍 {job.location}</p>
            <p>💰 {job.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
