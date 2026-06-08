import { CloudWatchMetrics } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";

const fetchCloudWatchMetrics = async (): Promise<CloudWatchMetrics> => {
  const response = await fetch("/api/cloudwatch");
  if (!response.ok) throw new Error("Failed to fetch CloudWatch metrics");
  return response.json();
};

export const useCloudWatchMetrics = () => {
  return useQuery({
    queryKey: ["cloudwatch-metrics"],
    queryFn: fetchCloudWatchMetrics,
    refetchInterval: 5 * 60 * 1000,
  });
};
