import { NextResponse } from "next/server";
import { transformWorkflowSummary } from "../../../lib/transforms/workflow";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

export const GET = async () => {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch workflow runs" },
      { status: response.status },
    );
  }

  const data = await response.json();
  const summary = transformWorkflowSummary(data.workflow_runs);

  return NextResponse.json(summary);
};
