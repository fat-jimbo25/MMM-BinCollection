
import React from 'react';
import { cn } from '@/lib/utils';

type BinType = 'black' | 'blue' | 'green' | 'brown';

interface BinIconProps {
  type: BinType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const getBinColor = (type: BinType) => {
  switch (type) {
    case 'black': return 'bg-bin-black';
    case 'blue': return 'bg-bin-blue';
    case 'green': return 'bg-bin-green';
    case 'brown': return 'bg-bin-brown';
    default: return 'bg-gray-500';
  }
};

const getBinLabel = (type: BinType) => {
  switch (type) {
    case 'black': return 'General Waste';
    case 'blue': return 'Recycling';
    case 'green': return 'Garden Waste';
    case 'brown': return 'Food Waste';
    default: return 'Bin';
  }
};

const BinIcon: React.FC<BinIconProps> = ({ 
  type, 
  size = 'md', 
  className,
  animate = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-8',
    md: 'w-8 h-10',
    lg: 'w-10 h-12'
  };

  return (
    <div className={cn(
      'relative flex flex-col items-center justify-center transition-all duration-300',
      animate && 'group',
      className
    )}>
      <div className={cn(
        'relative rounded-t-sm',
        getBinColor(type),
        sizeClasses[size],
        animate && 'group-hover:translate-y-[-2px] transition-transform duration-300'
      )}>
        {/* Bin lid */}
        <div className={cn(
          'absolute -top-1 left-0 right-0 h-1 rounded-t-sm transform origin-bottom',
          getBinColor(type),
          'opacity-80',
          animate && 'group-hover:rotate-[-10deg] group-hover:translate-y-[-1px] transition-all duration-300'
        )} />
        
        {/* Bin body details */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-1/2 border-t border-t-white/10" />
        </div>
      </div>
      
      {/* Bin label tooltip */}
      {animate && (
        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
          {getBinLabel(type)}
        </div>
      )}
    </div>
  );
};

export default BinIcon;
