import React, { useId } from 'react';

/**
 * Open Idea Official Brand Logo
 * Direct from official Open Idea Brand Identity:
 * Features the sacred geometry 6-petal rosette symbol paired with 'pen idea' in Instrument Serif,
 * where the rosette symbol naturally completes the wordmark as 'open idea'.
 */
export function OpenIdeaFlowerSymbol({
  size = 30,
  className = '',
  id = null,
  stroke = null,
  gradientAngle = 0,
  isFocused = false,
  circleStroke = null,
  petalStroke = null,
  viewBox = '0 0 100 100'
}) {
  const generatedId = useId();
  const safeAutoId = `oi-grad-${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const gradId = id || safeAutoId;

  const cStroke = circleStroke !== null ? circleStroke : (isFocused ? 3.75 : 3.5);
  const pStroke = petalStroke !== null ? petalStroke : (isFocused ? 2.9 : 2.75);

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          gradientTransform={gradientAngle ? `rotate(${gradientAngle} 50 50)` : undefined}
        >
          <stop offset="0%" stopColor="#13B2CF" />
          <stop offset="50%" stopColor="#2F8FEF" />
          <stop offset="100%" stopColor="#8C88D5" />
        </linearGradient>
      </defs>
      
      {/* Outer Enclosing Circle */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke={stroke || `url(#${gradId})`}
        strokeWidth={cStroke}
        className="rosette-circle"
      />
      
      {/* 6 Overlapping Sacred Rosette Petals */}
      <g
        stroke={stroke || `url(#${gradId})`}
        strokeWidth={pStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="rosette-petals"
      >
        <path d="M 50 50 A 46 46 0 0 0 50 4 A 46 46 0 0 0 50 50" />
        <path d="M 50 50 A 46 46 0 0 0 89.84 27 A 46 46 0 0 0 50 50" />
        <path d="M 50 50 A 46 46 0 0 0 89.84 73 A 46 46 0 0 0 50 50" />
        <path d="M 50 50 A 46 46 0 0 0 50 96 A 46 46 0 0 0 50 50" />
        <path d="M 50 50 A 46 46 0 0 0 10.16 73 A 46 46 0 0 0 50 50" />
        <path d="M 50 50 A 46 46 0 0 0 10.16 27 A 46 46 0 0 0 50 50" />
      </g>
    </svg>
  );
}

export default function OpenIdeaLogo({
  size = 30,
  showText = true,
  stroke = null,
  textClassName = '',
  className = '',
  id = null,
  onClick
}) {
  return (
    <div
      className={`open-idea-brand-lockup ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.round(size * 0.16)}px`,
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        textDecoration: 'none'
      }}
      role="img"
      aria-label="Open Idea"
    >
      <OpenIdeaFlowerSymbol size={size} stroke={stroke} id={id} />
      {showText && (
        <span
          className={`open-idea-wordmark ${textClassName}`}
          style={{
            fontFamily: "var(--font-serif, 'Instrument Serif', Georgia, serif)",
            fontSize: `${Math.round(size * 0.94)}px`,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: stroke || 'var(--text-primary)',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            transform: 'translateY(-1px)'
          }}
        >
          pen idea
        </span>
      )}
    </div>
  );
}
