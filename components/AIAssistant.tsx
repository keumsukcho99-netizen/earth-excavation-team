import React, { useState, useRef, useEffect } from 'react';
import { getAppraisal } from '../services/geminiService';
import { ChatMessage, AppraisalResult } from '../types';
import { AppraisalCertificate } from './AppraisalCertificate';

const DAILY_LIMIT = 5; // 워크스페이스인 만큼 제한 상향

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('last_appraisal_date');
    const storedCount = localStorage.getItem('appraisal_count');
    
    if (storedDate !== today) {
      localStorage.setItem('last_appraisal_date', today);
      localStorage.setItem('appraisal_count', '0');
      setUsageCount(0);
    } else {
      setUsageCount(parseInt(storedCount || '0', 10));
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (usageCount >= DAILY_LIMIT) {
      setMessages(prev => [...prev, { role: 'model', text: "허허, 오늘은 분석 장비도 좀 쉬어야 할 것 같구려. 내일 다시 오게나." }]);
      return;
    }

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Fix: Removed unnecessary third argument to match getAppraisal signature.
    const rawResponse = await getAppraisal(input, []);
    let textOutput = rawResponse;
    let appraisalData: AppraisalResult | undefined;

    try {
      // Fix: Changed "appraisal" to "certificate" to match the actual prompt response in geminiService.ts.
      const jsonMatch = rawResponse.match(/\{[\s\S]*"certificate"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const cert = parsed.certificate;
        // Map the certificate data to the AppraisalResult type structure used in this component.
        appraisalData = {
          itemName: cert.itemName,
          period: cert.period,
          rarity: cert.rarity,
          description: cert.summary,
          estimatedValue: cert.estimatedValue,
          certificateId: cert.id,
          confidenceScore: 90,
          disclaimer: "분석 결과는 참고용 데이터입니다."
        } as AppraisalResult;
        textOutput = rawResponse.replace(jsonMatch[0], "").trim();
      }
    } catch (e) { console.warn(e); }

    setMessages(prev => [...prev, { role: 'model', text: textOutput, appraisalData }]);
    setIsLoading(false);
    
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('appraisal_count', newCount.toString());
  };

  return (
    <div className="bg-[#111] border border-slate-800 flex flex-col h-[850px] relative">
      {/* Workspace Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Console :: Antique_Analysis_V2.0</span>
        </div>
        <div className="text-[10px] font-mono text-amber-500/50">
          Uptime: 24/7 Global Archive Synced
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-40">
            <div className="text-6xl grayscale">🔍</div>
            <p className="serif-kr text-xl text-white font-light tracking-widest leading-loose">
              장치의 전원을 켰습니다. <br/> 분석할 유물에 대해 말씀해 주십시오.
            </p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-6 rounded-lg text-sm md:text-base ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-white border border-slate-700' 
                : 'bg-white text-slate-900 serif-kr text-xl leading-[1.8] shadow-2xl'
            }`}>
              {msg.text}
            </div>
            {msg.appraisalData && (
              <div className="w-full mt-10">
                <AppraisalCertificate data={msg.appraisalData} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 items-center p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[11px] text-amber-500 font-mono tracking-widest uppercase animate-pulse">Scanning database...</span>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-900 border-t border-slate-800">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="유물 사진을 올리거나 특징을 입력하게나..."
            className="flex-1 px-6 py-4 bg-black border border-slate-700 text-white rounded-lg focus:outline-none focus:border-amber-900 font-mono text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-amber-950 text-white px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-amber-900 transition-all active:scale-95"
          >
            Run Analysis
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center px-2">
           <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Workspace Usage: {usageCount}/{DAILY_LIMIT}</span>
           <span className="text-[9px] text-slate-600 italic font-mono">Secure Connection Encrypted</span>
        </div>
      </div>
    </div>
  );
};