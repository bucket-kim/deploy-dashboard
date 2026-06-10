import { WorkflowRun } from "@/types/workflow";
import { transformWorkflowRun } from "./workflow";

const mockRun = {
  id: 12314123,
  run_number: 1,
  name: "cms_repo",
  status: "completed",
  conclusion: "success",
  head_branch: "main",
  created_at: "2026-06-07T10:00:00Z",
  updated_at: "2026-06-07T10:01:00Z",
  run_started_at: "2026-06-07T10:00:00Z",
  html_url: "git_link_to_specific_id",
};

describe("transformWorkflowRun", () => {
  let result: WorkflowRun;
  beforeEach(() => {
    result = transformWorkflowRun(mockRun);
  });

  it("should rename run_number to runNumber", () => {
    expect(result.runNumber).toBe(1);
  });

  it("should rename head_branch to branch", () => {
    expect(result.branch).toBe("main");
  });

  it("should rename html_url to url", () => {
    expect(result.url).toBe("git_link_to_specific_id");
  });

  it("should calculate duration in seconds", () => {
    expect(result.duration).toBe(60);
  });

  it("should return null duration for in_progress runs", () => {
    const inProgressRun = {
      ...mockRun,
      status: "in_progress",
      conclusion: null,
    };
    const result = transformWorkflowRun(inProgressRun);
    expect(result.duration).toBeNull();
  });
});
