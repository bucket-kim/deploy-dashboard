import React from 'react'
import Skeleton from './Skeleton'

const ChartSkeleton = () => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-3 border-b border-zinc-800">
                <Skeleton className="h-3 w-48" />
            </div>
            <div className="p-4">
                <Skeleton className="h-[300px] w-full" />
            </div>
        </div>
    )
}

export default ChartSkeleton
