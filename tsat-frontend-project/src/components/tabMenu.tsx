'use client';

import React, { useState } from 'react';

export default function TabMenu() {
  const tabItems = [
    'น้ำมันเครื่องเกรดพรีเมี่ยม',
    'น้ำมันเกียร์',
    'น้ำมันเบรค',
    'น้ำมันเฟืองท้าย',
    'น้ำยาหม้อน้ำ',
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex justify-center mt-16">
      <div className="w-fit">
        <ul className="flex flex-wrap bg-[#F5F5F5] p-2 rounded-full text-lg font-medium text-center text-[#999999] dark:text-gray-400">
          {tabItems.map((tab, index) => (
            <li className="me-2" key={index}>
              <button
                onClick={() => setActiveTab(index)}
                className={`inline-block px-4 py-3  cursor-pointer rounded-full transition-colors duration-300 ${
                  activeTab === index
                    ? 'text-white bg-[#8F2F34]'
                    : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
