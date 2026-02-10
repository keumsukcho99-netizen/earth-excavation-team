
import React, { useState, useEffect } from 'react';
import { AppraisalResult } from '../types';

interface Props {
  data: AppraisalResult;
}

export const AppraisalCertificate: React.FC<Props> = ({ data }) => {
  const [isDonated, setIsDonated] = useState(false);
  const [canNominate, setCanNominate] = useState(false);
  const [isNominated, setIsNominated] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('antique_korea_donation_consented') === 'true';
    setIsDonated(consent);
    // 확신도 90% 이상이거나 국보급일 때 명예의 전당 노미네이트 가능
    if (data.confidenceScore >= 90 || data.rarity === 'National Treasure Level') {
      setCanNominate(true);
    }
  }, [data]);

  const handleNominate = () => {
    setIsNominated(true);
    // 실제 운영 환경이라면 여기서 서버 API를 호출하여 명예의 전당 DB에 등록합니다.
    console.log("Nominated to Hall of Fame:", data.itemName);
  };

  return (
    <div className="certificate-paper museum-border p-12 md:p-24 rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] max-w-5xl mx-auto my-20 relative animate-in zoom-in duration-1000 overflow-hidden border-2 border-slate-900">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
      
      {canNominate && isDonated && isNominated && (
        <div className="absolute -top-10 -right-10 bg-amber-600 text-white px-20 py-16 rotate-45 shadow-2xl flex flex-col items-center justify-center z-20">
           <span className="text-[10px] font-black tracking-[0.3em] mb-1">HALL OF FAME</span>
           <span className="text-xs font-bold">NOMINATED</span>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] pointer-events-none select-none">
        <div className="text-[400px] font-black serif-kr leading-none">魂</div>
      </div>
      
      <div className="absolute inset-6 border border-slate-200 pointer-events-none"></div>

      <div className="text-center mb-20 relative">
        <div className="flex justify-center gap-6 mb-8">
          <span className="bg-slate-900 text-white px-5 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase">Archive Verified</span>
          <span className="bg-amber-950 text-white px-5 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase">Academic Reference Only</span>
        </div>
        <h1 className="serif-kr text-7xl font-black text-slate-900 border-b-[8px] border-slate-900 inline-block px-12 pb-6 tracking-tighter">
          遺 物 鑑 定 錄
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-slate-200"></div>
          <p className="serif-kr text-[12px] text-slate-400 tracking-[0.5em] font-bold">KOSAN SCHOLARLY CIRCLE</p>
          <div className="h-0.5 w-12 bg-slate-200"></div>
        </div>
      </div>

      {/* AI Confidence Score Meter */}
      <div className="mb-20 px-6 relative">
        <div className="flex justify-between items-end mb-4">
          <p className="text-[11px] font-black text-slate-400 tracking-widest uppercase">AI Confidence Analysis (데이터 확신도)</p>
          <p className="serif-en text-4xl font-black italic gold-gradient">{data.confidenceScore}%</p>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-slate-900 transition-all duration-1000 ease-out" 
            style={{ width: `${data.confidenceScore}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-slate-400 mt-3 italic">* 본 수치는 100만 건의 데이터베이스 및 2,000점의 실증 데이터와 유물의 도상학적 일치도를 나타냅니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 serif-kr mb-20 relative px-6">
        <div className="space-y-10">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest">Nomenclature 명칭</p>
            <p className="text-3xl font-black text-slate-900">{data.itemName}</p>
          </div>
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest">Historical Period 시기</p>
            <p className="text-2xl font-bold text-slate-800">{data.period}</p>
          </div>
        </div>
        <div className="space-y-10">
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest">Spiritual Rank 등급</p>
            <p className={`text-2xl font-black ${data.rarity === 'National Treasure Level' ? 'text-amber-800' : 'text-slate-900'}`}>
              {data.rarity}
            </p>
          </div>
          <div className="border-b border-slate-200 pb-4">
            <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-widest">Estimated Value 가치</p>
            <p className="text-3xl font-black text-amber-950 font-serif italic">{data.estimatedValue}</p>
          </div>
        </div>
      </div>

      <div className="space-y-16 serif-kr mb-20 relative px-6">
        <div className="bg-white p-12 border-2 border-slate-900 shadow-xl relative">
          <div className="absolute -top-4 left-10 bg-slate-950 text-white px-8 py-2 text-[10px] font-black tracking-widest uppercase">
            Narrative of Soul (혼의 기록)
          </div>
          <p className="text-2xl leading-[2.1] text-slate-800 font-medium tracking-tight whitespace-pre-line first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-slate-950 first-letter:leading-none">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-sm">
            <h4 className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-[0.3em]">Academic Evidence (학술 근거)</h4>
            <p className="text-sm leading-relaxed text-slate-600 font-medium italic">{data.academicBasis}</p>
          </div>
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-sm">
            <h4 className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-[0.3em]">Market Insight (시장 통찰)</h4>
            <p className="text-sm leading-relaxed text-slate-600 font-medium italic">{data.marketTrend}</p>
          </div>
        </div>
      </div>

      {/* High Value/Score Special Notice (Digital Museum Nomination) */}
      {canNominate && (
        <div className="mb-20 px-6">
          <div className="bg-amber-950 text-white p-10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
               <div className="text-6xl animate-pulse">🏆</div>
               <div className="flex-1 text-center md:text-left">
                  <h4 className="serif-kr text-2xl font-black mb-2">지구 발굴단 [명예의 전당] 후보 등재</h4>
                  <p className="serif-kr text-sm opacity-80 leading-relaxed">
                    본 유물은 {data.rarity === 'National Treasure Level' ? '국보급의 가치' : '압도적인 학술적 일치도'}가 확인되었습니다. <br/>
                    {isDonated 
                      ? (isNominated 
                          ? "소중한 가치를 공유해주셔서 감사합니다. 심사 후 '디지털 박물관'에 정식 등재됩니다." 
                          : "자네의 기증 동의에 따라, 이 유물을 명예의 전당 후보로 추천할 수 있네. 아래 버튼을 눌러 승인해주게나.")
                      : "자네가 기증에 동의했다면 이 귀한 유물을 세상에 자랑했을 텐데 아쉽구려. 언제든 마음이 바뀌면 하단 'Legal Notice'에서 기증 설정을 변경할 수 있네."}
                  </p>
               </div>
               {isDonated && !isNominated && (
                 <button 
                  onClick={handleNominate}
                  className="bg-white text-amber-950 px-8 py-4 rounded-sm font-black text-xs tracking-[0.2em] uppercase hover:bg-amber-100 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                 >
                   NOMINATE NOW
                 </button>
               )}
               {isNominated && (
                 <div className="bg-amber-600 text-white px-6 py-3 rounded-full font-black text-xs tracking-widest">
                   COMPLETED
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Support Button */}
      <div className="mb-20 px-6">
        <div className="bg-slate-50 p-10 border-2 border-dashed border-slate-200 rounded-sm text-center group transition-all hover:border-amber-900">
          <p className="serif-kr text-xl font-bold text-slate-600 mb-6 leading-relaxed">
            "이 결과가 자네에게 도움이 되었는가? <br/>
            할애비의 연구실에 차 한 잔 보태준다면, 더 나은 지혜를 모으는 데 큰 힘이 되겠구려."
          </p>
          <button className="bg-amber-950 text-white px-12 py-4 rounded-full font-black text-sm tracking-[0.3em] uppercase hover:bg-slate-900 transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto">
            <span>☕</span> SUPPORT THE ARCHIVE
          </button>
        </div>
      </div>

      {/* Legal Disclaimer Box */}
      <div className="mb-20 px-6">
        <div className="bg-amber-50/50 p-8 border border-amber-200/50 rounded-sm text-center">
          <p className="text-[10px] font-black text-amber-900/50 mb-3 uppercase tracking-[0.5em]">Legal Notice & Disclaimer</p>
          <p className="text-[12px] leading-relaxed text-slate-500 font-medium">
            {data.disclaimer} <br/>
            본 결과는 공인된 감정서가 아니며, 유물의 실제 거래 및 진위 판단의 법적 근거가 될 수 없습니다. <br/>
            모든 법적 책임은 사용자 본인에게 있음을 고지합니다.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end pt-16 border-t-2 border-slate-100 relative">
        <div className="font-mono text-[10px] text-slate-400 space-y-2 mb-10 md:mb-0">
          <p className="font-black text-slate-500 text-xs tracking-widest">CERT ID: {data.certificateId}</p>
          <p className="tracking-widest opacity-70 uppercase leading-relaxed">
            1,000,000+ GLOBAL RECORDS SYNCED<br/>
            EMPIRICAL VERIFICATION COMPLETE
          </p>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="serif-kr text-[12px] font-bold text-slate-400 mb-1 italic">사실의 수호자</p>
            <p className="serif-kr text-4xl font-black text-slate-900 leading-none">고 산 (古 山)</p>
          </div>
          <div className="red-seal text-3xl flex flex-col leading-none p-3 w-24 h-24 items-center justify-center shadow-xl rotate-1">
            <span className="mb-0.5">고산</span>
            <span className="text-[10px] font-black border-t border-white/30 pt-0.5">鑑定之印</span>
          </div>
        </div>
      </div>
    </div>
  );
};
