import React from 'react'
import Skeleton from './Skeleton'

const StatCardsSkeleton = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    )
}

export default StatCardsSkeleton
