
import React from 'react';

const FEATURED_ITEMS = [
  {
    id: 1,
    name: "청자 상감운학문 매병 (추정)",
    period: "고려 13세기",
    image: "https://images.unsplash.com/photo-1614715109520-2f638159b343?auto=format&fit=crop&q=80&w=600",
    discovery: "서울 종로구 익명 기증",
    tag: "이달의 발견"
  },
  {
    id: 2,
    "name": "백자 청화초화문 편병",
    "period": "조선 18세기",
    "image": "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?auto=format&fit=crop&q=80&w=600",
    "discovery": "경기 여주시 익명 기증",
    "tag": "명예의 전당"
  },
  {
    id: 3,
    "name": "금동미륵보살반가사유상 (재현품 추정)",
    "period": "근대 초기",
    "image": "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=600",
    "discovery": "경북 경주시 익명 기증",
    "tag": "학술 연구"
  }
];

export const DigitalMuseum: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {FEATURED_ITEMS.map((item) => (
        <div key={item.id} className="museum-gallery-item bg-white border border-slate-200 p-6 shadow-sm hover:shadow-2xl flex flex-col group cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-slate-100">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute top-4 left-4 bg-amber-950 text-white px-4 py-1 text-[10px] font-black tracking-widest uppercase">
              {item.tag}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <h4 className="serif-kr text-xl font-black text-slate-900 group-hover:text-amber-900 transition-colors">{item.name}</h4>
            <p className="serif-kr text-sm text-slate-400 font-bold tracking-wider">{item.period}</p>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.discovery}</span>
              <span className="text-amber-600 text-xs font-black">VIEW DETAILS →</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
