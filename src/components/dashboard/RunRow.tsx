import { formatDuration, formatRelativeTime } from "@/lib/utils/format"
import { LighthouseScoresType, WorkflowRun } from "@/types/workflow"
import Link from "next/link"
import { FC } from "react"
import ScoreBadge from "./ScoreBadge";

interface RunRowProps {
    run: WorkflowRun;
    score: LighthouseScoresType | undefined;
    onRollback: (runId: number) => void;
}

const RunRow: FC<RunRowProps> = ({ run, score, onRollback }) => {

    const isSuccess = run.conclusion === 'success'
    const isInProgress = run.status === 'in_progress';

    const dotColor = isInProgress ? 'bg-yellow-400 animate-pulse' : isSuccess ? "bg-emerald-400" : 'bg-red-400';

    const conclusionLabel = isInProgress ? 'running' : run.conclusion ?? "-"

    return (
        <div className="flex items-center justify-between py-3 px-4 border border-zinc-800 hover:bg-zinc-900 transition-colors">
            {/* Left side */}
            <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-zinc-300 font-mono text-sm">
                    #{run.runNumber}
                </span>
                <span className="text-zinc-500 text-sm">{conclusionLabel}</span>
            </div>

            <div>
                {score ? (
                    <div>
                        <ScoreBadge
                            label="LCP"
                            value={score.lcp}
                            unit="s"
                            thresholds={{ good: 2.5, bad: 4 }}
                            lowerIsBetter={true}
                        />
                        <ScoreBadge
                            label="FID"
                            value={score.fid}
                            unit="ms"
                            thresholds={{ good: 100, bad: 300 }}
                            lowerIsBetter={true}
                        />
                        <ScoreBadge
                            label="CLS"
                            value={score.cls}
                            unit=""
                            thresholds={{ good: 0.1, bad: 0.25 }}
                            lowerIsBetter={true}
                        />
                        <ScoreBadge
                            label="Score"
                            value={score.performance_score}
                            unit=""
                            thresholds={{ good: 90, bad: 49 }}
                            lowerIsBetter={false}
                        />
                    </div>
                ) : (
                    <span className="text-zinc-700 text-xs font-mono">no scores</span>)}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6 text-sm">
                <span className="text-zinc-500 font-mono">{run.branch}</span>
                <span className="text-zinc-600">
                    {formatRelativeTime(run.createdAt)}
                </span>
                <span className="text-zinc-500 font-mono">
                    {formatDuration(run.duration)}
                </span>
                <button className="cursor-pointer" onClick={() => onRollback(run.id)}>
                    Rollback
                </button>
                <Link
                    href={run.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-300 transition-colors text-xs"
                >
                    ↗
                </Link>
            </div>
        </div >
    )
}

export default RunRow
