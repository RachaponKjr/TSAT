// components/Sidebar.tsx
'use client';

import { BookOpenText, Box, Car, Cpu, Star } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'จัดการสินค้า', icon: <Box size={20} />, href: '/dashboard' },
  { name: 'จัดการรีวิว', icon: <Star size={20} />, href: '/dashboard/edit-review' },
  { name: 'จัดการ Service', icon: <Cpu size={20} />, href: '/dashboard/edit-service' },
  { name: 'จัดการ Bloges', icon: <BookOpenText size={20} />, href: '/dashboard/edit-blogs' },
  { name: 'ข้อมูลรถ', icon: <Car size={20} />, href: '/dashboard/edit-car' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col min-w-64 h-screen bg-white shadow-md p-4">
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
