// components/Sidebar.tsx
'use client';

import { Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'หน้าหลัก', icon: <Home size={20} />, href: '/' },
  { name: 'โปรไฟล์', icon: <User size={20} />, href: '/profile' },
  { name: 'ตั้งค่า', icon: <Settings size={20} />, href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">เมนู</h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
