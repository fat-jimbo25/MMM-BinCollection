
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import BinIcon from './BinIcon';

export type BinType = 'black' | 'blue' | 'green' | 'brown' | null;

interface WeekDayProps {
  date: Date;
  bins: BinType[];
  isToday: boolean;
  isCurrentWeek: boolean;
}

const WeekDay: React.FC<WeekDayProps> = ({ date, bins, isToday, isCurrentWeek }) => {
  // For debugging - log the date and bins
  console.log(`Rendering day: ${format(date, 'yyyy-MM-dd')}`, bins);
  
  return (
    <div 
      className={cn(
        'flex flex-col items-center p-2 rounded-lg transition-all duration-300',
        'hover:bg-white/5 hover:shadow-lg',
        isToday ? 'bg-white/10 ring-1 ring-white/20' : 'bg-transparent',
        !isCurrentWeek && 'opacity-80'
      )}
    >
      <div className="text-xs font-medium mb-1">{format(date, 'EEE')}</div>
      <div 
        className={cn(
          'text-xl font-light w-8 h-8 flex items-center justify-center rounded-full mb-2',
          isToday ? 'bg-white text-black font-medium' : ''
        )}
      >
        {format(date, 'd')}
      </div>
      
      <div className="flex flex-wrap justify-center gap-1 mt-1 min-h-10 items-end">
        {bins && bins.length > 0 ? (
          bins.map((bin, index) => (
            bin && (
              <div 
                key={`${bin}-${index}`} 
                className={cn(
                  'transform transition-transform duration-300 ease-out',
                  'animate-slide-up',
                  isToday ? 'scale-110' : ''
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BinIcon 
                  type={bin} 
                  size="sm" 
                  animate={true} 
                />
              </div>
            )
          ))
        ) : (
          <div className="text-xs text-gray-400 italic">No collection</div>
        )}
      </div>
    </div>
  );
};

export default WeekDay;
