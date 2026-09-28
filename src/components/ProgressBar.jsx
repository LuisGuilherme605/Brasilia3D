import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [largura, setLargura] = useState(0);

  useEffect(() => {
    const atualizar = () => {
      const pos = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setLargura(total > 0 ? (pos / total) * 100 : 0);
    };
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    return () => {
      window.removeEventListener('scroll', atualizar);
      window.removeEventListener('resize', atualizar);
    };
  }, []);

  return <div id="progress-bar" aria-hidden="true" style={{ width: `${largura}%` }} />;
}
