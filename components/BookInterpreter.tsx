
import React, { useState } from 'react';
import { interpretAncientBook, generateSpeech, decodeAudio, getSharedAudioCtx } from '../services/geminiService';
import { BookInterpretationResult } from '../types';

export const BookInterpreter: React.FC = () => {
  const [result, setResult] = useState<BookInterpretationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const interpreted = await interpretAncientBook([{ 
        inlineData: { data: base64.split(',')[1], mimeType: file.type } 
      }]);
      setResult(interpreted);
    } catch (err) {
      alert("고서를 읽는 도중 눈이 침침해졌구려. 다시 한번 보여주겠나?");
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const playAudio = async () => {
    if (!result || speaking) return;
    
    setSpeaking(true);
    try {
      // Using the shared context from geminiService to ensure proper playback across components
      const ctx = getSharedAudioCtx();

      const fullText = `${result.translation}. ${result.commentary}`;
      const base64Audio = await generateSpeech(fullText);
      // Fixed: Replaced missing decodeAudioData with exported decodeAudio which handles base64 directly
      const audioBuffer = await decodeAudio(base64Audio);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setSpeaking(false);
      source.start();
    } catch (err) {
      console.error(err);
      setSpeaking(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-900 p-8 md:p-16 rounded-sm shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none select-none">
        <div className="serif-kr text-[120px] font-black leading-none">解</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 space-y-8">
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-12 text-center rounded-sm">
            <h4 className="serif-kr text-2xl font-black mb-6">고서 사진 올리기</h4>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">
              한자가 빼곡한 옛 책이나 <br/> 편지 한 장을 찍어 보내주게나.
            </p>
            <label className="block">
              <span className="sr-only">Choose image</span>
              <input type="file" onChange={handleFileUpload} accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-amber-900 cursor-pointer"/>
            </label>
          </div>

          {result && (
            <div className="space-y-4">
              <button 
                onClick={playAudio}
                className={`w-full py-6 rounded-sm font-black text-sm tracking-widest uppercase flex items-center justify-center gap-4 transition-all shadow-xl ${speaking ? 'bg-amber-900 text-white animate-pulse' : 'bg-slate-900 text-white hover:bg-amber-950'}`}
              >
                {speaking ? '🔊 이야기 들려주는 중...' : '🔉 오디오로 듣기'}
              </button>
              <p className="text-[10px] text-slate-400 text-center font-bold tracking-widest uppercase">
                Powered by AI Heritage Voice
              </p>
            </div>
          )}
        </div>

        <div className="lg:w-2/3">
          {loading ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-8 border-4 border-slate-50 animate-pulse">
               <div className="w-20 h-20 border-8 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
               <p className="serif-kr text-2xl font-black text-slate-400 tracking-widest">돋보기를 꺼내 한자를 읽는 중일세...</p>
            </div>
          ) : result ? (
            <div className="space-y-16 animate-in fade-in duration-700">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-slate-50 p-10 rounded-sm">
                  <h5 className="text-[10px] font-black text-slate-400 mb-4 tracking-widest uppercase border-b border-slate-200 pb-2">Original Text (한자 원문)</h5>
                  <p className="serif-kr text-xl leading-relaxed text-slate-800 tracking-widest font-bold whitespace-pre-line">
                    {result.originalText}
                  </p>
                </div>
                <div className="bg-amber-50/30 p-10 rounded-sm border border-amber-100">
                  <h5 className="text-[10px] font-black text-amber-900/50 mb-4 tracking-widest uppercase border-b border-amber-200 pb-2">Translation (현대어 번역)</h5>
                  <p className="serif-kr text-2xl leading-relaxed text-slate-900 font-bold">
                    {result.translation}
                  </p>
                </div>
              </div>

              <div className="relative p-12 bg-white border-l-8 border-amber-900 shadow-xl">
                <div className="absolute -top-4 left-6 bg-amber-950 text-white px-6 py-2 text-[10px] font-black tracking-widest uppercase">고산의 해설</div>
                <p className="serif-kr text-3xl leading-[2] text-slate-800 font-medium">
                  {result.commentary}
                </p>
                <div className="mt-8 flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Era: {result.era}</span>
                  {result.authorNote && <span className="text-[11px] font-black text-amber-800 italic">{result.authorNote}</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-4 border-slate-50">
              <p className="serif-kr text-3xl text-slate-300 font-medium leading-loose">
                "먼지 쌓인 고서를 한 장 보여주게나. <br/>
                수백 년 전 선비의 숨결을 <br/>
                할애비가 대신 읽어주겠네."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
