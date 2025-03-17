import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';

// Function to fetch jobs
const fetchJobs = async () => {
  const { data } = await apiClient.get('/jobs'); // Calls backend /api/jobs
  return data;
};

// Custom hook for job listings
export const useJobs = () => useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });
