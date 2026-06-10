'use client'

import CDNStats from "@/components/dashboard/CDNStats";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RunRow from "@/components/dashboard/RunRow";
import CDNSkeleton from "@/components/Skeleton/CDNSkeleton";
import ChartSkeleton from "@/components/Skeleton/ChartSkeleton";
import RunListSkeleton from "@/components/Skeleton/RunListSkeleton";
import StatCardsSkeleton from "@/components/Skeleton/StatCardsSkeleton";
import StatCard from "@/components/dashboard/StatCard";
import { useCloudWatchMetrics } from "@/hooks/useCloudWatchMetrics";
import { useLighthouseScores } from "@/hooks/useLighthouseScores";
import { useWorkflowRuns } from "@/hooks/useWorkflowRuns";
import { formatDuration } from "@/lib/utils/format";
import { Fragment, useCallback, useState } from "react";
import ErrorState from "@/components/ErrorState/ErrorState";

export default function Home() {

  const { data, isLoading, isError } = useWorkflowRuns();
  const { data: scores, isLoading: lighthouseLoading, isError: lighthouseError } = useLighthouseScores();
  const { data: cloudWatchData, isLoading: cloudeMetricLoading, isError: cloudMetricError } = useCloudWatchMetrics()
  const [rollingBackId, setRollingBackId] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  } | null>(null);


  const getScoresForRun = (runNumber: number) => scores?.find(s => s.run_number === runNumber)

  const lastRun = data?.runs[0];

  const handleRollback = useCallback(async (runId: number) => {

    const run = data?.runs.find((r) => r.id === runId)

    try {
      setRollingBackId(runId)

      const response = await fetch('/api/rollback', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ run_id: runId })
      })

      if (!response.ok) {
        setToast({
          visible: true,
          message: `Run #${run?.runNumber} failed to rollback`,
          type: "error"
        })
        return;
      }

      setToast({
        visible: true,
        message: `Run #${run?.runNumber} triggered successfully`,
        type: "success"
      })

    } catch (error) {
      if (error) {
        setToast({
          visible: true,
          message: `Run #${run?.runNumber} failed to trigger`,
          type: "error"
        })
      }
    } finally {
      setRollingBackId(null)
      setTimeout(() => {
        setToast(null)
      }, 3000)
    }
  }, [data])

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      {toast && (
        <div className={`fixed top-1/2 left-1/2 px-4 py-3 rounded-lg font-mono text-sm transition-all ${toast.type === "success"
          ? "bg-emerald-900 border border-emerald-700 text-emerald-300"
          : "bg-red-900 border border-red-700 text-red-300"
          }`}>
          {toast.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-mono font-bold text-white">
            Deploy Pipeline Dashboard
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            monitoring {process.env.NEXT_PUBLIC_GITHUB_REPO}
          </p>
        </div>

        {lighthouseError ? <ErrorState message="Failed to load the chart" /> : lighthouseLoading ? <ChartSkeleton /> : (

          <PerformanceChart score={scores} />
        )}
        {cloudMetricError ? <ErrorState message="Failed to load Cloud Metrics" /> : cloudeMetricLoading ? <CDNSkeleton /> : (

          <CDNStats metrics={cloudWatchData} />
        )}

        {isError ? <ErrorState message="Failed to load deploy Data" /> : isLoading ? <Fragment>
          <StatCardsSkeleton />
          <RunListSkeleton />
        </Fragment>
          : (
            <Fragment>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Runs" value={data?.totalRuns ?? 0} />
                <StatCard label="Success Rate" value={`${data?.successRate ?? 0}%`} highlight={(data?.successRate ?? 0) >= 80 ? "success" : "failure"} />
                <StatCard label="Avg Build Time" value={formatDuration(data?.averageDuration ?? null)} />
                <StatCard label="Last Deploy" value={lastRun?.conclusion ?? "-"} highlight={lastRun?.conclusion === 'success' ? "success" : "failure"} />
              </div>
              <div className="flex flex-col gap-4">
                {data?.runs.map((run) => (
                  <RunRow key={run.id} run={run} score={getScoresForRun(run.runNumber)} onRollback={handleRollback} isRollingBack={rollingBackId === run.id} />
                ))}
              </div>
            </Fragment>
          )}
      </div>
    </main >
  );
}
