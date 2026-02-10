
import React, { useState } from 'react';

interface Props {
  onAppraise: (data: { images: string[], category: string, modules: string[], notes: string }) => void;
  isAppraising: boolean;
}

export const ArtifactUploader: React.FC<Props> = ({ onAppraise, isAppraising }) => {
  const [images, setImages] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fix: Cast the array to File[] to ensure 'file' is correctly typed as File (which extends Blob)
    const files = Array.from(e.target.files || []) as File[];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      alert("분석할 유물의 사진을 먼저 올려주셔야 합니다.");
      return;
    }
    onAppraise({
      images,
      category: "General",
      modules: ["Visual Analysis"],
      notes
    });
  };

  return (
    <div className="bg-white border-2 border-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl animate-in fade-in duration-700">
      <div className="text-center mb-10">
        <h3 className="serif-kr text-3xl font-black text-slate-900 mb-2">유물 분석 의뢰하기</h3>
        <p className="text-slate-500 font-medium">유물의 사진을 올리고 특징을 적어주시면 AI 큐레이터가 분석을 시작합니다.</p>
      </div>

      <div className="space-y-8">
        {/* 사진 업로드 영역 */}
        <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-10 text-center hover:border-amber-500/50 transition-colors group relative">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="space-y-4">
            <div className="text-6xl group-hover:scale-110 transition-transform duration-500">📸</div>
            <p className="serif-kr text-xl font-bold text-slate-400">여기를 눌러 유물 사진을 선택하십시오</p>
            <p className="text-xs text-slate-300 font-mono tracking-widest uppercase">Multiple Selection Available</p>
          </div>
        </div>

        {/* 미리보기 */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-slate-100 relative group">
                <img src={img} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
          </div>
        )}

        {/* 특징 기록 */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">유물 특징 (선택사항)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="발굴 장소나 전해 내려오는 이야기를 적어주시면 더 정밀한 분석이 가능합니다."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-700 focus:border-amber-500 outline-none h-32 resize-none shadow-inner"
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isAppraising}
          className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg serif-kr tracking-widest hover:bg-amber-950 transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {isAppraising ? "🔍 유물의 혼을 분석하는 중..." : "✨ 분석 시작하기"}
        </button>
      </div>
    </div>
  );
};
