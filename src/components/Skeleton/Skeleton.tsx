import React, { FC } from 'react'

interface SkeletonProps {
    className?: string
}

const Skeleton: FC<SkeletonProps> = ({ className }) => {
    return (
        <div
            className={`animate-pulse bg-zinc-800 rounded ${className}`}
        />
    )
}

export default Skeleton
