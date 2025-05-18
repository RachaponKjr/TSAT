// components/Sidebar.tsx
'use client';

import { deleteCookie } from '@/lib/cookie';
import { BookOpenText, Box, Car, Cpu, Settings, Star, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'จัดการสินค้า', icon: <Box size={20} />, href: '/dashboard' },
  { name: 'จัดหน้า ตาเว็บไซต์', icon: <Settings size={20} />, href: '/dashboard/cms' },
  { name: 'จัดการรีวิว', icon: <Star size={20} />, href: '/dashboard/edit-review' },
  { name: 'จัดการ Service', icon: <Cpu size={20} />, href: '/dashboard/edit-service' },
  { name: 'จัดการ Bloges', icon: <BookOpenText size={20} />, href: '/dashboard/edit-blogs' },
  { name: 'ข้อมูลรถ', icon: <Car size={20} />, href: '/dashboard/edit-car' },
  { name: 'ข้อมูลส่วนตัว', icon: <User size={20} />, href: '/dashboard/edit-profile' },
  { name: 'ข้อมูลพนักงาน', icon: <User size={20} />, href: '/dashboard/employee' },
];

export default function Sidebar() {
  const router = useRouter();
  const singOut = async () => {
    await deleteCookie('access_token')
    router.push('/admin-login')
  }
  return (
    <aside className="hidden md:flex flex-col min-w-64 h-screen bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">เมนู</h1>
      <nav className="flex flex-col justify-between  h-full gap-2">
        <div>
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
        </div>
        <div>
          <button onClick={singOut} className='flex items-center justify-center cursor-pointer gap-3 p-2 rounded-lg w-full bg-[#8F2F34] text-white hover:bg-[#8F2F34]/80 transition-colors'>
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
