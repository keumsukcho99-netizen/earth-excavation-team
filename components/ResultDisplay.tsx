import React, { useState, useEffect, useRef } from 'react';
// Fix: Replaced generateCuratorSpeech with generateSpeech as per geminiService.ts exports
import { generateSpeech, decodeAudio, getSharedAudioCtx } from '../services/geminiService';

interface ResultDisplayProps {
  result: string;
  images: string[];
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, images }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // JSON 데이터 추출 안정성 확보
  let certData = null;
  let cleanDescription = result;
  try {
    const jsonMatch = result.match(/\{[\s\S]*"certificate"[\s\S]*\}/);
    if (jsonMatch) {
      certData = JSON.parse(jsonMatch[0]).certificate;
      cleanDescription = result.replace(jsonMatch[0], "").trim();
    }
  } catch (e) {
    console.warn("JSON parsing failure, using raw text");
  }

  const stopAudio = () => {
    if (audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
      } catch (e) {}
      audioSourceRef.current = null;
    }
    setIsSpeaking(false);
  };

  const handlePlaySpeech = async () => {
    if (isSpeaking) {
      stopAudio();
      return;
    }

    const ctx = getSharedAudioCtx();
    if (!ctx) {
      alert("오디오 장치를 사용할 수 없습니다.");
      return;
    }

    setIsSpeaking(true);
    try {
      const speechText = cleanDescription.substring(0, 600);
      // Fix: Used generateSpeech instead of missing generateCuratorSpeech
      const audioBase64 = await generateSpeech(speechText); 
      
      if (!audioBase64) {
        throw new Error("Speech generation failed");
      }

      const buffer = await decodeAudio(audioBase64);
      if (!buffer) throw new Error("Audio buffer decoding failed");

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        setIsSpeaking(false);
        audioSourceRef.current = null;
      };
      
      audioSourceRef.current = source;
      source.start(0);
    } catch (e) {
      console.error("Audio Playback System Error:", e);
      setIsSpeaking(false);
      // 먹통 방지를 위해 알림창 없이 로그만 남기고 상태 초기화
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="relative animate-in fade-in duration-1000">
      <div className="bg-slate-900 border-2 border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-black/40 p-8 flex flex-col items-center justify-center border-r border-[#D4AF37]/20">
            <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] p-1 mb-4 bg-slate-800 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              🏛️
            </div>
            <h4 className="text-[#D4AF37] font-bold text-lg mb-1">수석 큐레이터 고산</h4>
            <p className="text-slate-400 text-[10px] tracking-[0.2em] uppercase font-bold">Royal Heritage Lab</p>
            
            <button 
              onClick={handlePlaySpeech}
              className={`mt-6 px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm font-black flex items-center gap-3 transition-all active:scale-95 ${isSpeaking ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_#D4AF37]' : 'hover:bg-[#D4AF37]/10'}`}
            >
              {isSpeaking ? (
                <>
                  <span className="w-2 h-2 bg-black rounded-full animate-ping"></span>
                  해설 중단
                </>
              ) : '▶ 해설 듣기'}
            </button>
          </div>
          
          <div className="md:w-2/3 p-8 md:p-12 relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
             <div className="prose prose-invert max-w-none">
               <p className="text-lg md:text-xl leading-relaxed text-slate-200 serif-kr whitespace-pre-wrap selection:bg-[#D4AF37] selection:text-black">
                 {cleanDescription}
               </p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-16">
        <button 
          onClick={() => setShowCertificate(true)}
          className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black px-12 py-5 rounded-xl font-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 active:scale-95"
        >
          📜 황실 공인 디지털 감정서 하사
        </button>
        <p className="text-slate-500 text-xs font-bold">감정서는 고화질 디지털 문서로 발급됩니다.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
        {images.map((img, i) => (
          <div key={i} className="aspect-square rounded-xl border border-white/5 overflow-hidden shadow-2xl bg-black group">
            <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={`Artifact ${i}`} />
          </div>
        ))}
      </div>

      {showCertificate && certData && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 overflow-y-auto">
          <div className="max-w-4xl w-full bg-[#f4ece1] p-8 md:p-20 relative shadow-[0_0_150px_rgba(212,175,55,0.2)] border-[15px] border-double border-[#8b0000] text-slate-900 animate-in zoom-in duration-500">
            <button onClick={() => setShowCertificate(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 text-4xl p-2 transition-colors">&times;</button>
            
            <div className="relative z-10 text-center border-4 border-[#8b0000]/5 p-6 md:p-12">
              <div className="mb-10 flex justify-center">
                <div className="w-24 h-24 border-2 border-[#8b0000] rounded-full flex items-center justify-center text-4xl text-[#8b0000] font-black shadow-inner">印</div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-4 serif-kr tracking-widest text-[#8b0000]">皇室 鑑 定 書</h1>
              <p className="text-sm font-bold tracking-[0.5em] mb-16 opacity-30">ROYAL HERITAGE CERTIFICATE</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16 border-y border-[#8b0000]/10 py-12">
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">유물 명칭</span>
                    <span className="text-3xl font-black serif-kr text-slate-900">{certData.itemName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">제작 시기</span>
                    <span className="text-2xl font-black serif-kr text-slate-800">{certData.period}</span>
                  </div>
                </div>
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">감정 등급</span>
                    <span className="text-3xl font-black serif-kr text-[#8b0000]">{certData.rarity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">추정 가치</span>
                    <span className="text-3xl font-black serif-kr text-amber-900">{certData.estimatedValue}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 p-10 rounded-2xl mb-16 italic serif-kr text-xl leading-relaxed shadow-inner border border-white/60">
                "{certData.summary}"
              </div>

              <div className="flex justify-between items-end mt-24">
                <div className="text-left font-mono text-[10px] text-slate-400 space-y-1">
                  <p>CERTIFICATE NO: {certData.id}</p>
                  <p>ISSUE DATE: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="relative text-right">
                  <div className="absolute -top-16 right-0 w-32 h-32 border-4 border-[#8b0000]/10 rounded-full flex items-center justify-center rotate-12 font-black text-[#8b0000] text-2xl opacity-10 pointer-events-none">皇室 認證</div>
                  <p className="text-2xl font-black serif-kr text-slate-900">시간의 적체미 감정소</p>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest mt-1 uppercase">Royal Antique Lab Curator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};