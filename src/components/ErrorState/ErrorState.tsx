import React, { FC } from 'react'

interface ErrorStateProps {
    message: string;
}

const ErrorState: FC<ErrorStateProps> = ({ message }) => {
    return (
        <div className="bg-zinc-900 border border-red-900 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">⚠</span>
                <p className="text-red-400 font-mono text-sm">{message}</p>
            </div>
        </div>
    )
}

export default ErrorState
