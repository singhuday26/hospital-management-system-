
import { ReactNode, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  as?: React.ElementType;
}

export default function SlideUp({
  children,
  className,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 100,
  as: Component = 'div'
}: SlideUpProps) {
  const [isShown, setIsShown] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsShown(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Handle staggered children
  const childrenArray = React.Children.toArray(children);
  const staggeredChildren = staggerChildren
    ? childrenArray.map((child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...((child as React.ReactElement<any>).props.style || {}),
              transitionDelay: `${delay + i * staggerDelay}ms`,
            },
            className: cn(
              'transition-all duration-500 ease-out', 
              isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              (child as React.ReactElement<any>).props.className
            ),
            key: i
          });
        }
        return child;
      })
    : children;

  return (
    <Component 
      className={cn(
        staggerChildren ? '' : 'transition-all duration-500 ease-out',
        staggerChildren ? '' : isShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
      style={staggerChildren ? {} : { transitionDelay: `${delay}ms` }}
    >
      {staggeredChildren}
    </Component>
  );
}
