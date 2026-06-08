import { FC } from "react";

interface ScoreBadgeProps {
    label: string;
    value: number | null;
    unit?: string;
    thresholds: {
        good: number;
        bad: number;
    };
    lowerIsBetter?: boolean;
}

const ScoreBadge: FC<ScoreBadgeProps> = ({ label, value, unit, thresholds, lowerIsBetter }) => {

    if (!value) return null

    const getColor = () => {
        if (lowerIsBetter) {
            if (value <= thresholds.good) return 'text-emerald-400';
            if (value >= thresholds.bad) return 'text-red-400';
            return 'text-yellow-400'
        } else {
            if (value >= thresholds.good) return "text-emerald-400";
            if (value <= thresholds.bad) return "text-red-400";
            return "text-yellow-400";
        }
    }

    return (
        <div className="flex flex-col items-center">
            <span className={`text-xs font-mono font-bold ${getColor()}`}>
                {Math.round(value)}{unit}
            </span>
            <span className="text-zinc-600 text-xs">{label}</span>
        </div>
    )
}

export default ScoreBadge
