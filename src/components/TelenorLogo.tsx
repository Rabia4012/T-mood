import telenorLogo from 'figma:asset/f09504e3babe55c7f6109c2b0c5764f04d3e3de5.png';

export function TelenorLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img 
      src={telenorLogo} 
      alt="Telenor" 
      className={className}
    />
  );
}

export function TelenorLogoFull({ className = "h-8" }: { className?: string }) {
  return (
    <img 
      src={telenorLogo} 
      alt="Telenor" 
      className={className}
    />
  );
}
