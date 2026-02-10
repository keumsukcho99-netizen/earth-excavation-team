
import React from 'react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
}

export const StepCard: React.FC<StepCardProps> = ({ step }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{step.icon}</span>
        <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
      </div>
      <p className="text-slate-600 mb-4">{step.description}</p>
      <ul className="space-y-2">
        {step.details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-500">
            <span className="text-indigo-500 mt-1">✓</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
};
