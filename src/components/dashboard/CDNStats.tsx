import { CloudWatchMetrics } from '@/types/workflow'
import React, { FC } from 'react'
import StatCard from './StatCard';

interface CDNStatsProps {
    metrics: CloudWatchMetrics | undefined
}

const CDNStats: FC<CDNStatsProps> = ({ metrics }) => {

    const totalRequests = metrics?.requests.reduce(
        (sum, point) => sum + (point.Sum ?? 0), 0
    ) ?? 0;

    const avgCacheHitRate = metrics?.cacheHitRate.length ? Math.round(metrics.cacheHitRate.reduce((sum, point) => sum + (point.Average ?? 0), 0) / metrics.cacheHitRate.length) : null;

    return (
        <div className="mb-8">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3 font-mono">
                CDN Metrics — Last 7 Days
            </p>
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    label="Total CDN Requests"
                    value={totalRequests.toLocaleString()}
                />
                <StatCard
                    label="Cache Hit Rate"
                    value={avgCacheHitRate !== null ? `${avgCacheHitRate}%` : "No data yet"}
                    highlight={
                        avgCacheHitRate === null
                            ? "neutral"
                            : avgCacheHitRate >= 80
                                ? "success"
                                : "failure"
                    }
                />
            </div>
        </div>
    )
}

export default CDNStats
