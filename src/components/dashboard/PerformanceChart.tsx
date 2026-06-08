import { LighthouseScoresType } from '@/types/workflow'
import { RechartsDevtools } from '@recharts/devtools';
import React, { FC, Fragment } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PerformanceChartProps {
    score: LighthouseScoresType[] | undefined
}

const PerformanceChart: FC<PerformanceChartProps> = ({ score }) => {

    const chartData = [...(score ?? [])].reverse()

    return (
        <Fragment>
            {score && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-8">
                    <div className="px-4 py-3 border-b border-zinc-800">
                        <p className="text-zinc-400 text-sm font-mono">
                            Performance Score Over Time
                        </p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="run_number" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip
                                cursor={{
                                    stroke: 'var(--color-border-2)',
                                }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-surface-raised)',
                                    borderColor: 'var(--color-border-2)',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="performance_score"
                                stroke="#10b981"
                                dot={{ fill: '#10b981' }}
                                activeDot={{ r: 8 }}
                            />
                            <ReferenceLine y={90} label={{
                                value: 'Good (90)',
                                fill: '#10b981',    // green — matches the "good" color
                                position: 'insideTopRight',
                                fontSize: 12
                            }}
                                stroke="#10b981" strokeDasharray="3 3" />
                            <RechartsDevtools />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Fragment>
    )
}

export default PerformanceChart
