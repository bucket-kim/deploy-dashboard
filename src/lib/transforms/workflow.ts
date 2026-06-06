import {
  GitHubWorkflowRun,
  WorkflowRun,
  WorkflowSummary,
} from "@/types/workflow";

export const transformWorkflowRun = (raw: GitHubWorkflowRun): WorkflowRun => {
  const start = new Date(raw.created_at).getTime();
  const end = new Date(raw.created_at).getTime();
  const duration =
    raw.status === "completed" ? Math.round((end - start) / 1000) : null;

  return {
    id: raw.id,
    runNumber: raw.run_number,
    name: raw.name,
    status: raw.status as WorkflowRun["status"],
    conclusion: raw.conclusion as WorkflowRun["conclusion"],
    branch: raw.head_branch,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    url: raw.html_url,
    duration,
  };
};

export const transformWorkflowSummary = (
  runs: GitHubWorkflowRun[],
): WorkflowSummary => {
  const transformed = runs.map(transformWorkflowRun);

  const completed = transformed.filter((r) => r.status === "completed");
  const successful = transformed.filter((r) => r.conclusion === "success");

  const successRate =
    completed.length > 0
      ? Math.round((successful.length / completed.length) * 100)
      : 0;

  const durations = transformed
    .map((r) => r.duration)
    .filter((d): d is number => d !== null);

  const averageDuration =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : null;

  return {
    totalRuns: transformed.length,
    successRate,
    averageDuration,
    runs: transformed,
  };
};
