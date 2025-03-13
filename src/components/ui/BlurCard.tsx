
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BlurCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function BlurCard({ children, className, hoverEffect = true }: BlurCardProps) {
  return (
    <div 
      className={cn(
        "glass relative rounded-2xl p-6 overflow-hidden transition-all duration-300",
        hoverEffect && "hover:shadow-medium hover:translate-y-[-4px]",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/5 dark:to-white/0 z-0"></div>
    </div>
  );
}
