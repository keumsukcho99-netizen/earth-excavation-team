
export interface DNSResponse {
  Status: number;
  Answer?: Array<{
    name: string;
    type: number;
    TTL: number;
    data: string;
  }>;
}

/**
 * 도메인의 A 레코드를 조회하여 모든 IP 주소를 반환합니다.
 */
export const checkDNSStatus = async (domain: string): Promise<{
  isPropagated: boolean;
  currentIPs: string[];
  error?: string;
}> => {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
    if (!response.ok) throw new Error('DNS 서버 응답 오류');
    
    const data: DNSResponse = await response.json();
    
    if (data.Status !== 0) {
      return { isPropagated: false, currentIPs: [], error: '도메인을 찾을 수 없거나 DNS 설정이 아직 퍼지지 않았습니다.' };
    }

    const aRecords = data.Answer?.filter(record => record.type === 1) || [];
    
    const currentIPs = aRecords.map(r => r.data.replace(/"/g, ''));
    
    // Vercel IP 판단 로직 확장
    // 어르신에게 배정된 특별한 IP(216.198.79.1)를 포함시킵니다.
    const isPropagated = currentIPs.some(ip => 
      ip.startsWith('76.76.21.') || 
      ip.startsWith('66.33.') ||
      ip === '76.76.21.21' ||
      ip === '216.198.79.1'
    );

    return {
      isPropagated,
      currentIPs
    };
  } catch (err) {
    console.error('DNS Check Error:', err);
    return { isPropagated: false, currentIPs: [], error: '조회 중 오류가 발생했습니다.' };
  }
};
