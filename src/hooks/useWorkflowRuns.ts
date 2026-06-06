import { WorkflowSummary } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";

const fetchWorkflowRuns = async (): Promise<WorkflowSummary> => {
  const response = await fetch("/api/workflows");
  if (!response.ok) {
    throw new Error("Failed to fetch workflow runs");
  }
  return response.json();
};

export const useWorkflowRuns = () => {
  return useQuery({
    queryKey: ["workflow-runs"],
    queryFn: fetchWorkflowRuns,
  });
};
