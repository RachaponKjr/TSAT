import { cn } from '@/lib/utils'
import React from 'react'

function ArrowR({ size = 36, className, color = 'white' }: { size: number, className?: string, color?: string }) {
    return (
        <div className={cn(className)}>
            <svg width={size} height={size} viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.175 9L26.575 14.6L28 16L36 8L28 0L26.575 1.4L32.175 7H0V9H32.175Z" fill={color} />
            </svg>
        </div>

    )
}

export default ArrowR