import { jobs } from "@/lib/jobs";
import { useQuery } from "@tanstack/react-query";

export const useJobQuery = (jobId: string) =>
  useQuery({ queryKey: ["jobs", jobId], queryFn: () => jobs.get(jobId) });
