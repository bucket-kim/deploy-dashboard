import React, { FC } from 'react'

interface StatCardProps {
    label: string;
    value: string | number;
    highlight?: "success" | 'failure' | 'neutral'
}

const StatCard: FC<StatCardProps> = ({ label, value, highlight = "neutral" }) => {
    const highlightColors = {
        success: "text-emerald-400",
        failure: "text-red-400",
        neutral: "text-white",
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-mono font-bold ${highlightColors[highlight]}`}>{value}</p>
        </div>
    )
}

export default StatCard
