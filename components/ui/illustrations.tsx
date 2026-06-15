import React from "react";

export const NotFoundIllustration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {/* Background Landscape */}
    <rect width="400" height="300" rx="12" fill="url(#sky-gradient)" />

    {/* Rolling Hills */}
    <path
      d="M0 220 C 100 200, 200 240, 400 210 V 300 H 0 V 220 Z"
      fill="#86efac"
      fillOpacity="0.4"
    />
    <path
      d="M0 250 C 150 240, 250 270, 400 240 V 300 H 0 V 250 Z"
      fill="#4ade80"
      fillOpacity="0.6"
    />

    {/* The Tractor (Stylized) */}
    <g transform="translate(130, 140)">
      {/* Back Wheel */}
      <circle cx="30" cy="60" r="25" fill="#166534" />
      <circle cx="30" cy="60" r="15" fill="#f0fdf4" />
      <path d="M30 35 L30 85 M5 60 L55 60" stroke="#166534" strokeWidth="2" />

      {/* Front Wheel */}
      <circle cx="110" cy="75" r="15" fill="#166534" />
      <circle cx="110" cy="75" r="8" fill="#f0fdf4" />

      {/* Body */}
      <path
        d="M30 60 L110 75 L110 50 L60 50 L60 20 L10 20 L30 60"
        fill="#22c55e"
      />
      <rect x="60" y="20" width="40" height="30" fill="#15803d" />
      <path
        d="M110 50 L115 45"
        stroke="#16a34a"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Smoke Puffs (Lost) */}
      <circle cx="125" cy="40" r="4" fill="#94a3b8" opacity="0.6">
        <animate
          attributeName="cy"
          values="40;30;20"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="135" cy="30" r="6" fill="#94a3b8" opacity="0.5">
        <animate
          attributeName="cy"
          values="30;15;5"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
    </g>

    {/* 404 Signpost */}
    <g transform="translate(250, 160) rotate(5)">
      <rect x="-2" y="0" width="4" height="60" fill="#78350f" />
      <rect x="-30" y="10" width="60" height="25" rx="2" fill="#d97706" />
      <text
        x="0"
        y="28"
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontSize="16"
        fontFamily="sans-serif"
      >
        404
      </text>
    </g>
  </svg>
);

export const ErrorIllustration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="rose-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    <rect width="400" height="300" rx="12" fill="url(#rose-gradient)" />

    {/* Ground */}
    <path
      d="M0 240 C 100 230, 300 230, 400 240 V 300 H 0 V 240 Z"
      fill="#fda4af"
      fillOpacity="0.3"
    />

    {/* Broken Gears */}
    <g transform="translate(150, 100)">
      <path
        d="M50 0 L60 10 L80 10 L90 0 L100 20 L120 20 L110 40 L120 60 L100 60 L90 80 L70 80 L60 60 L40 60 L50 40 L40 20 L60 20 Z"
        fill="#e11d48"
        opacity="0.8"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 80 40"
          to="360 80 40"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M0 50 L10 60 L30 60 L40 50 L50 70 L70 70 L60 90 L70 110 L50 110 L40 130 L20 130 L10 110 L-10 110 L0 90 L-10 70 L10 70 Z"
        fill="#fb7185"
        opacity="0.7"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 30 90"
          to="0 30 90"
          dur="12s"
          repeatCount="indefinite"
        />
      </path>
    </g>

    {/* Alert Icon */}
    <g transform="translate(180, 130)">
      <circle cx="20" cy="20" r="20" fill="#be123c" />
      <text
        x="20"
        y="32"
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontSize="24"
        fontFamily="sans-serif"
      >
        !
      </text>
    </g>
  </svg>
);

export const TrendUpIllustration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 80 C 40 80, 50 40, 90 40 S 140 60, 200 10"
      stroke="#10b981"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M0 100 V 80 C 40 80, 50 40, 90 40 S 140 60, 200 10 V 100 Z"
      fill="url(#grad-up)"
      fillOpacity="0.2"
    />
    <defs>
      <linearGradient id="grad-up" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#d1fae5" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="10" r="4" fill="#10b981" />
  </svg>
);

export const TrendDownIllustration = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 20 C 50 20, 60 70, 110 50 S 160 80, 200 90"
      stroke="#ef4444"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M0 100 V 20 C 50 20, 60 70, 110 50 S 160 80, 200 90 V 100 Z"
      fill="url(#grad-down)"
      fillOpacity="0.2"
    />
    <defs>
      <linearGradient id="grad-down" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#fee2e2" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="90" r="4" fill="#ef4444" />
  </svg>
);

export const EmptyIllustration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="empty-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0fdf4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.5" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.1" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="200" cy="140" r="100" fill="url(#empty-sky)" />

    {/* Stylized Empty Land / Field */}
    <g transform="translate(140, 180)">
      <path
        d="M0 20 Q 60 0, 120 20 L 120 40 Q 60 60, 0 40 Z"
        fill="#bbf7d0"
        opacity="0.6"
      />
      <path
        d="M10 25 Q 60 10, 110 25"
        stroke="#86efac"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </g>

    {/* The Ledger / Data UI Element */}
    <g transform="translate(160, 80)" filter="url(#shadow)">
      <rect x="0" y="0" width="80" height="100" rx="8" fill="white" />
      <rect x="10" y="15" width="60" height="6" rx="3" fill="#f1f5f9" />
      <rect x="10" y="30" width="40" height="6" rx="3" fill="#f1f5f9" />
      <rect x="10" y="45" width="50" height="6" rx="3" fill="#f1f5f9" />

      {/* Search Glass looking at 'nothing' */}
      <g transform="translate(45, 65) rotate(-15)">
        <circle
          cx="15"
          cy="15"
          r="12"
          stroke="#10b981"
          strokeWidth="3"
          fill="white"
        />
        <line
          x1="25"
          y1="25"
          x2="35"
          y2="35"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Tiny Sprout (Hope for data) */}
      <path
        d="M15 85 C 15 75, 25 75, 25 85"
        stroke="#22c55e"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M15 85 C 10 75, 5 80, 5 85"
        stroke="#22c55e"
        strokeWidth="2"
        fill="none"
      />
    </g>

    {/* Floating Dust / Spores */}
    <circle cx="280" cy="100" r="3" fill="#10b981" opacity="0.4">
      <animate
        attributeName="cy"
        values="100;90;100"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="110" cy="160" r="2" fill="#10b981" opacity="0.3">
      <animate
        attributeName="cy"
        values="160;170;160"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
