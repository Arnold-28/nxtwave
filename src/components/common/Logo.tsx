import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  to = '/'
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const Content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* GrowthLoop Circular Upward Trajectory Symbol */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-12"
        >
          {/* Loop Orbit */}
          <circle cx="18" cy="18" r="16" fill="#15172B" />
          <path
            d="M18 6.5 A11.5 11.5 0 1 1 6.5 18"
            stroke="#7357FF"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Acceleration Node */}
          <circle cx="25" cy="11" r="3.8" fill="#D8F36A" />
          {/* Upward Growth Arrow Trajectory */}
          <path
            d="M15 22.5 L25 12.5 M19 12.5 L25 12.5 L25 18.5"
            stroke="#D8F36A"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-ink ${textSize}`}>
            GrowthLoop
          </span>
          <span className="bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
            AI
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10.5px] font-medium text-ink-muted tracking-tight mt-0.5">
            NxtWave Growth Engine
          </span>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="group inline-flex items-center focus:outline-none">
      {Content}
    </Link>
  ) : (
    Content
  );
};
