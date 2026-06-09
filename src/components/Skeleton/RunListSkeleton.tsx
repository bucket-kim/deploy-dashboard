import React from 'react'
import Skeleton from './Skeleton'

const RunListSkeleton = () => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
                <Skeleton className="h-3 w-32" />
            </div>
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-4 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-2 h-2 rounded-full" />
                        <Skeleton className="h-3 w-8" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RunListSkeleton
