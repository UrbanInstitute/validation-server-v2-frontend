import { jobs } from "@/lib/jobs";
import Config from "@/services/config";
import { useQuery } from "@tanstack/react-query";

const config = new Config().config;
const refreshRate = config.JOB_REFRESH_RATE;

export const useJobsQuery = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: jobs.listWResults,
    refetchInterval: refreshRate ? refreshRate : 0,
  }); // Refetch based on config. Default is no refetch
