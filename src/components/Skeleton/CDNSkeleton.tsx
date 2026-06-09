import React from 'react'
import Skeleton from './Skeleton'

const CDNSkeleton = () => {
    return (
        <div className="mb-8">
            <Skeleton className="h-3 w-48 mb-3" />
            <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CDNSkeleton
