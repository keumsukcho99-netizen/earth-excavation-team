
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F9F6F0] relative overflow-x-hidden">
      {/* 고풍스러운 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>
      
      {/* 상단 띠지 (Branding Bar) */}
      <div className="relative z-10 w-full h-2 bg-[#1A1A1A]"></div>
      
      <main className="relative z-10">
        {children}
      </main>

      {/* 하단 낙관 장식 */}
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none select-none z-0">
        <div className="text-[120px] font-black serif-kr border-4 border-[#1A1A1A] p-4 rotate-12">鑑定</div>
      </div>
    </div>
  );
};
