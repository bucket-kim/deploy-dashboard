'use client'

import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RunRow from "@/components/dashboard/RunRow";
import StatCard from "@/components/dashboard/StatCard";
import { useLighthouseScores } from "@/hooks/useLighthouseScores";
import { useWorkflowRuns } from "@/hooks/useWorkflowRuns";
import { formatDuration } from "@/lib/utils/format";

export default function Home() {

  const { data, isLoading, isError } = useWorkflowRuns();
  const { data: scores } = useLighthouseScores();

  const getScoresForRun = (runNumber: number) => scores?.find(s => s.run_number === runNumber)

  const lastRun = data?.runs[0];

  if (isLoading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <p className="text-zinc-500 font-mono text-sm">fetching deploys...</p>
    </div>
  )
  if (isError) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <p className="text-red-400 font-mono text-sm">failed to load deploys</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-mono font-bold text-white">
            Deploy Pipeline
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            monitoring {process.env.NEXT_PUBLIC_GITHUB_REPO}
          </p>
        </div>

        <PerformanceChart score={scores} />

        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Runs" value={data?.totalRuns ?? 0} />
          <StatCard label="Success Rate" value={`${data?.successRate ?? 0}%`} highlight={(data?.successRate ?? 0) >= 80 ? "success" : "failure"} />
          <StatCard label="Avg Build Time" value={formatDuration(data?.averageDuration ?? null)} />
          <StatCard label="Last Deploy" value={lastRun?.conclusion ?? "-"} highlight={lastRun?.conclusion === 'success' ? "success" : "failure"} />
        </div>

        <div className="flex flex-col gap-4">
          {data?.runs.map((run) => (
            <RunRow key={run.id} run={run} score={getScoresForRun(run.runNumber)} />
          ))}
        </div>
      </div>
    </main>
  );
}
