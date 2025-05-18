'use client'

import React from 'react'
import { Input } from './ui/input'

interface InputWithLabelProps {
    label: string
    name: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    type?: string
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    type = 'text'
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <Input
                className='border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8F2F34] focus:border-[#8F2F34]'
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                type={type}
            />
        </div>
    )
}

export default InputWithLabel
