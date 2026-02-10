
import React, { useState } from 'react';

interface Props {
  onAccept: (donated: boolean) => void;
}

export const DisclaimerModal: React.FC<Props> = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDonationChecked, setIsDonationChecked] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // 애니메이션이 절반쯤 진행되었을 때 부모 상태를 변경하여 끊김 현상 방지
    setTimeout(() => onAccept(isDonationChecked), 200);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-700 ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 bg-slate-900/60 backdrop-blur-md'}`}>
      <div className={`bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-t-[12px] border-amber-950 relative transition-transform duration-500 ${isExiting ? 'translate-y-10' : 'translate-y-0 animate-in zoom-in duration-300'}`}>
        <div className="p-10 md:p-14">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 bg-amber-50 text-amber-900 text-[10px] font-black tracking-[0.3em] uppercase mb-4 border border-amber-100">Access Protocol</div>
            <h2 className="serif-kr text-3xl font-black text-slate-950 tracking-tighter">[지구 발굴단] 분석실 입장 안내</h2>
          </div>

          <div className="space-y-8 serif-kr text-slate-600 leading-relaxed text-sm">
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-slate-300 italic">
              "자네가 가져온 물건의 가치를 찾아주는 것은 내 즐거움이지만, 이 분석 결과가 모든 법적 책임을 대신해줄 수는 없다네. 연구실 입장 전 아래 사항을 확인해주게나."
            </div>

            <div className="grid gap-6">
              <section>
                <h4 className="font-black text-slate-900 mb-2">1. 데이터 기반의 추정치</h4>
                <p>본 결과는 AI와 기존 학술 데이터를 기반으로 한 **'참고용 분석'**이며 공인 감정서가 아닙니다.</p>
              </section>
              <section>
                <h4 className="font-black text-slate-900 mb-2">2. 사용자 책임 고지</h4>
                <p>유물의 실제 거래나 법적 진위 판단의 책임은 전적으로 사용자 본인에게 있습니다.</p>
              </section>
              <section className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                <h4 className="font-black text-amber-900 mb-2">3. 명예의 전당 기증 (선택)</h4>
                <p className="text-xs">우수한 분석 결과는 익명으로 **'디지털 박물관'**에 등재되어 학술적 가치로 보존될 수 있습니다.</p>
              </section>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <label className="flex items-start gap-4 cursor-pointer group p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <input 
                type="checkbox" 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1 w-5 h-5 accent-slate-900"
              />
              <span className="serif-kr text-sm font-black text-slate-900">
                [필수] 면책 조항 및 분석실 운영 방침에 동의합니다.
              </span>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group p-3 hover:bg-amber-50 rounded-lg transition-colors border border-dashed border-slate-200 hover:border-amber-300">
              <input 
                type="checkbox" 
                checked={isDonationChecked}
                onChange={(e) => setIsDonationChecked(e.target.checked)}
                className="mt-1 w-5 h-5 accent-amber-900"
              />
              <span className="serif-kr text-sm font-bold text-slate-600">
                [선택] 분석 결과의 익명 데이터 기증에 동의합니다.
              </span>
            </label>

            <button
              disabled={!isChecked}
              onClick={handleEnter}
              className={`w-full py-5 rounded-lg serif-kr text-lg font-black tracking-widest transition-all shadow-xl mt-4 ${
                isChecked 
                  ? 'bg-slate-950 text-white hover:bg-amber-950 active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              분석실 입장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
