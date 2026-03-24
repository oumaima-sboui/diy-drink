interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Feuille principale */}
      <path
        d="M50 10 C 30 20, 25 40, 30 60 C 35 80, 45 90, 50 95 C 55 90, 65 80, 70 60 C 75 40, 70 20, 50 10 Z"
        fill="url(#leafGradient)"
        stroke="#558B2F"
        strokeWidth="2"
      />
      
      {/* Nervure centrale */}
      <path
        d="M50 10 L50 95"
        stroke="#558B2F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Nervures latérales gauche */}
      <path
        d="M50 25 Q 35 35, 32 45"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 40 Q 38 48, 35 58"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 55 Q 40 62, 38 72"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Nervures latérales droite */}
      <path
        d="M50 25 Q 65 35, 68 45"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 40 Q 62 48, 65 58"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 55 Q 60 62, 62 72"
        stroke="#558B2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Goutte d'eau (symbole de fraîcheur) */}
      <circle cx="50" cy="50" r="8" fill="url(#dropGradient)" opacity="0.8" />
      <circle cx="48" cy="48" r="2" fill="white" opacity="0.6" />
      
      {/* Dégradés */}
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="100%" stopColor="#558B2F" />
        </linearGradient>
        <radialGradient id="dropGradient">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="100%" stopColor="#0288D1" />
        </radialGradient>
      </defs>
    </svg>
  );
}
