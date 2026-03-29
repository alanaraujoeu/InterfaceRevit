'use client';

import { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function OrientationGuard() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth && window.innerWidth < 768);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-revit-black flex flex-col items-center justify-center p-6 text-center">
      <Smartphone className="w-16 h-16 text-revit-accent mb-4 animate-bounce" />
      <h2 className="text-xl font-bold mb-2">Gire seu dispositivo</h2>
      <p className="text-revit-text-gray">
        Para uma melhor experiência, utilize a plataforma no modo paisagem.
      </p>
    </div>
  );
}
