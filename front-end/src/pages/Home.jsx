import { useJobs } from '../api/jobs';

const Home = () => {
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <a href={`/job/${job.id}`}>{job.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
