'use client'

import React from 'react'
import { cn } from '../lib/utils';

interface TextareaWithLabelProps {
    label: string
    name: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    required?: boolean
    rows?: number
    className?: string
}

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    rows = 4,
    className
}) => {
    return (
        <div className={cn('flex flex-col gap-1 w-full', className)}>
            {/* Label */}
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8F2F34] focus:border-[#8F2F34]"
            />
        </div>
    )
}

export default TextareaWithLabel
