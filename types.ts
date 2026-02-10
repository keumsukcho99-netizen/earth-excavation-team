
export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  appraisalData?: AppraisalResult;
  bookData?: BookInterpretationResult;
}

export interface AppraisalResult {
  itemName: string;
  period: string;
  rarity: 'National Treasure Level' | 'Rare' | 'Fine' | 'Common';
  description: string;
  estimatedValue: string;
  marketTrend?: string;
  certificateId: string;
  academicBasis?: string;
  digitalMetrics?: string;
  confidenceScore: number;
  disclaimer: string;
}

export interface BookInterpretationResult {
  originalText: string;
  translation: string;
  commentary: string;
  era: string;
  authorNote?: string;
}

export interface HostingProvider {
  name: string;
  description: string;
  pros: string[];
  bestFor: string;
  logo: string;
}