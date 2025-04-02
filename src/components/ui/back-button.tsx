
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBackClick}
      className={cn("p-0 h-8 w-8", className)}
    >
      <ArrowLeft className="h-5 w-5" />
      <span className="sr-only">Go back</span>
    </Button>
  );
}
