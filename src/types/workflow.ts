export interface WorkflowRun {
  id: number;
  runNumber: number;
  name: string;
  status: "completed" | "in_progress" | "queued";
  conclusion: "success" | "failure" | "cancelled" | null;
  branch: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  duration: number | null; // in seconds, calculated from start/end
}

export interface WorkflowSummary {
  totalRuns: number;
  successRate: number; // percentage
  averageDuration: number | null; // in seconds
  runs: WorkflowRun[];
}

export interface GitHubWorkflowRun {
  id: number;
  run_number: number;
  name: string;
  status: string;
  conclusion: string | null;
  head_branch: string;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface LighthouseScoresType {
  id: string;
  run_id: number;
  run_number: number;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  performance_score: number | null;
  created_at: string;
}
