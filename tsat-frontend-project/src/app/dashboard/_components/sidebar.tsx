// components/Sidebar.tsx
'use client';

import { deleteCookie } from '@/lib/cookie';
import { BookOpenText, Box, Car, Cpu, Settings, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'จัดการสินค้า', icon: <Box size={20} />, href: '/dashboard' },
  { name: 'จัดหน้า ตาเว็บไซต์', icon: <Settings size={20} />, href: '/dashboard/cms' },
  // { name: 'จัดการรีวิว', icon: <Star size={20} />, href: '/dashboard/edit-review' },
  { name: 'จัดการ Service', icon: <Cpu size={20} />, href: '/dashboard/edit-service' },
  { name: 'จัดการ Bloges', icon: <BookOpenText size={20} />, href: '/dashboard/edit-blogs' },
  { name: 'ข้อมูลรถ', icon: <Car size={20} />, href: '/dashboard/edit-car' },
  { name: 'ข้อมูลส่วนตัว', icon: <User size={20} />, href: '/dashboard/edit-profile' },
  { name: 'ข้อมูลพนักงาน', icon: <User size={20} />, href: '/dashboard/employee' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const singOut = async () => {
    await deleteCookie('access_token');
    router.push('/admin-login');
  };

  // ปิด mobile menu เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ปิด mobile menu เมื่อคลิกนอก sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('mobile-menu-button');

      if (isMobileMenuOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // ล็อค scroll เมื่อเปิด mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#8F2F34]">TSAT DASHBOARD</h1>
        {/* ปุ่มปิดสำหรับ mobile */}
        <button
          className="md:hidden p-1 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col justify-between h-full gap-2">
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive
                    ? 'bg-[#8F2F34] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={singOut}
            className='flex items-center justify-center cursor-pointer gap-3 p-3 rounded-lg w-full bg-[#8F2F34] text-white hover:bg-[#8F2F34]/80 transition-colors font-medium'
          >
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-menu-button"
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col min-w-64 h-screen bg-white shadow-md p-4 border-r">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`md:hidden fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 p-4 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}