import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { run_id } = body;

    if (!run_id) {
      return NextResponse.json(
        {
          error: "run_id is required",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/runs/${run_id}/rerun`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Request Error: ", error);

    return NextResponse.json(
      {
        error: "Invalid Request",
      },
      { status: 400 },
    );
  }
};
