'use client';
import React, { useState, useEffect } from 'react';

export default function SubCardServices() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full mt-8">
      {/* Mobile Layout */}
      <div className={`grid grid-cols-2 gap-6 ${isDesktop ? 'hidden' : ''}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <div className="bg-[#903035] flex justify-center items-center mx-auto w-full px-2 rounded-lg py-3">
              <div className="flex flex-col justify-center items-center h-full">
                <img
                  src="../images/machine.png"
                  alt="Description of image"
                  className="mx-auto w-16"
                />
                <div className="text-center px-2 text-xl text-white mt-2">
                  เครื่องยนต์
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className={`grid grid-cols-6 gap-6 ${!isDesktop ? 'hidden' : ''}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <div className="bg-[#903035] flex justify-center items-center mx-auto w-full h-60 rounded-lg py-6">
              <div>
                <img
                  src="../images/machine.png"
                  alt="Description of image"
                  className="mx-auto w-32"
                />
                <div className="text-center text-xl text-white mt-4">
                  เครื่องยนต์
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
