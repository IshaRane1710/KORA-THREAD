import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

interface NoticeBannerProps {
  onOpenGeoInspector?: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ onOpenGeoInspector }) => {
  return (
    <aside aria-label="Competition Prototype Disclaimer" className="bg-[#322319] text-[#fcf9f2] text-xs py-2 px-3 sm:px-6 border-b border-[#49382d] sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#fc9e7e] shrink-0" />
          <span className="font-medium tracking-wide">
            <strong className="font-semibold text-[#fc9e7e]">Competition Demonstration:</strong> Kora Threads is a fictional business created for the Get Cited hackathon. This website is a prototype, not a real store.
          </span>
        </div>
        
        {onOpenGeoInspector && (
          <button
            onClick={onOpenGeoInspector}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#49382d] hover:bg-[#5b483c] text-[#fc9e7e] font-semibold text-[11px] transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3 h-3" />
            <span>GEO &amp; AI Citation Inspector</span>
          </button>
        )}
      </div>
    </aside>
  );
};
