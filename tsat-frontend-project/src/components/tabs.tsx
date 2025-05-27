import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultActive?: number;
  className?: string;
  classNameTab?: string;
}

function Tabs({ tabs, defaultActive, className, classNameTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    tabs[defaultActive ? defaultActive : 0].id,
  );

  return (
    <>
      <div className={cn(`w-full max-w-full px-4 md:px-0 flex justify-center flex-col items-center relative`, className)}>
        <div className={cn('flex border-b w-max max-w-full overflow-hidden overflow-x-scroll md:overflow-x-hidden p-[10px] gap-3 rounded-full bg-[#F5F5F5]', classNameTab)}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => (tab.disabled ? null : setActiveTab(tab.id))}
              className={`flex-1 px-4 md:w-max cursor-pointer py-2 text-nowrap text-sm font-semibold ${activeTab === tab.id
                ? "bg-[#8F2F34] rounded-full text-[#FFFFFF]"
                : "text-[#A4A4A4]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-full">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
      </div>
    </>
  );
}

export default Tabs;
