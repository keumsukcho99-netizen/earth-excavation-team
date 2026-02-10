
import React, { useState } from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    category: "디지털 생존기",
    title: "도메인이 뭐여? 땅 사는 거여? (내 집 주소 만들기 편)",
    excerpt: "자, 여기서 영어가 솰라솰라 나오지? 겁먹지 마. 그냥 오른쪽 위 파란 버튼 누르면 돼. 60대 컴맹인 나도 'antique-korea.com'이라는 번듯한 문패를 달았네!",
    date: "2024.12.01",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    isHot: true,
    author: "고산 할아버지"
  },
  {
    id: 2,
    category: "디지털 생존기",
    title: "DNS 설정하다가 컴퓨터 던질 뻔한 사연",
    excerpt: "빨간 글씨가 뜰 때마다 가슴이 철렁했지. 하지만 걱정 말게. 할아버지가 스크린샷에 쳐놓은 굵은 빨간 동그라미만 따라오면 자네도 오늘 안에 배포 완료일세.",
    date: "2024.11.28",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    isHot: true,
    author: "고산 할아버지"
  },
  {
    id: 3,
    category: "디지털 생존기",
    title: "영어 몰라도 된다! 구글 번역기로 앱 만든 썰",
    excerpt: "요즘은 세상이 참 좋아. 모르는 글자가 나오면 그냥 마우스로 쓱 긁어서 번역기에 넣으면 AI가 다 가르쳐주거든. 나처럼 영어 한마디 못해도 앱 만들 수 있어!",
    date: "2024.11.25",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    isHot: false,
    author: "고산 할아버지"
  },
  {
    id: 4,
    category: "수집 에세이",
    title: "파킨슨 투병과 고미술이 준 위로",
    excerpt: "손이 떨리고 몸이 굳어가는 시간 속에서도, 수백 년 전 장인의 정교한 붓질을 마주할 때면 제 영혼은 비로소 자유로워집니다.",
    date: "2024.11.15",
    image: "https://images.unsplash.com/photo-1518655061710-5ccf392c275a?auto=format&fit=crop&q=80&w=800",
    isHot: false,
    author: "조금숙 단장"
  },
  {
    id: 5,
    category: "역사 이야기",
    title: "정조 대왕의 비밀 편지, 그 속에 담긴 고뇌",
    excerpt: "규장각 깊숙한 곳에서 발견된 짧은 글귀 하나가 조선의 운명을 바꾸려 했던 한 군주의 고독한 밤을 증명합니다.",
    date: "2024.11.10",
    image: "https://images.unsplash.com/photo-1599708141690-d938883e3c4a?auto=format&fit=crop&q=80&w=800",
    isHot: false,
    author: "학술 연구팀"
  }
];

export const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredPosts = activeCategory === "전체" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-16">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {["전체", "디지털 생존기", "수집 에세이", "역사 이야기"].map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 text-sm font-black tracking-widest border-2 transition-all duration-300 rounded-full ${
              activeCategory === cat 
                ? 'border-amber-900 bg-amber-900 text-white shadow-lg' 
                : 'border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900'
            }`}
          >
            {cat === '디지털 생존기' ? '🔥 ' + cat : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer flex flex-col bg-white border border-slate-100 p-6 transition-all duration-500 hover:shadow-2xl">
            <div className="relative aspect-video overflow-hidden mb-6 bg-slate-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              {post.isHot && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-[9px] font-black animate-bounce shadow-lg">왕초보 필수!</div>
              )}
            </div>
            
            <div className="space-y-4 flex-1 flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border self-start ${post.category === '디지털 생존기' ? 'border-amber-900 text-amber-900 bg-amber-50' : 'border-slate-100 text-slate-400'}`}>
                {post.category}
              </span>
              <h4 className="serif-kr text-2xl font-black text-slate-900 group-hover:text-amber-900 transition-colors leading-tight">{post.title}</h4>
              <p className="serif-kr text-base text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
              
              <div className="pt-6 mt-auto border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                <span>{post.date}</span>
                <span className="group-hover:text-slate-900 transition-colors">자세히 보기 →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeCategory === "디지털 생존기" && (
        <div className="mt-20 p-10 bg-amber-50 border-2 border-dashed border-amber-200 rounded-sm text-center">
           <p className="serif-kr text-xl font-bold text-amber-900 italic">
              "할배도 했으니 자네도 할 수 있네! 영어 몰라도 되고 컴맹이어도 괜찮아. <br/> 빨간 동그라미만 따라오게나!"
           </p>
        </div>
      )}
    </div>
  );
};
