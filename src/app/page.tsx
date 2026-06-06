'use client'

import { useWorkflowRuns } from "@/hooks/useWorkflowRuns";

export default function Home() {

  const { data, isLoading, isError } = useWorkflowRuns();

  if (isLoading) return <p>Loading deploys...</p>
  if (isError) return <p>Error to load deploys</p>

  return (
    <main >
      <h1>Deploy Dashboard</h1>
      <p>Total runs: {data?.totalRuns}</p>
      {data?.runs.map((run) => (
        <div key={run.id}>
          <p>Run #{run.runNumber} - {run.status} - {run.conclusion}</p>
          <p>{run.createdAt}</p>
        </div>
      ))}
    </main>
  );
}
