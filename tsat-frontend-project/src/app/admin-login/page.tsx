/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { setCookie } from '@/lib/cookie'
import api from '@/server/api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const isLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user.username || !user.password) {
            toast.error('กรุณากรอกข้อมูลให้ครบ', { className: '!text-red-500' })
        }
        const res = await api.auth.login(user)
        if (res.status === 200) {
            toast.success('เข้าสู่ระบบสําเร็จ', { className: '!text-green-500' })
            await setCookie({ name: 'access_token', value: res.data.token, maxAge: 60 * 60 * 8, path: '/' })
            router.push('/dashboard')
        } else {
            toast.error('เข้าสู่ระบบไม่สําเร็จ', { className: '!text-red-500' })
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Dashboard</h2>
                <form onSubmit={isLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                        <input
                            onChange={handleChange}
                            name='username'
                            value={user.username}
                            type="text"
                            placeholder="admin"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            value={user.password}
                            name='password'
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page