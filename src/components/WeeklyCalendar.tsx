
import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay, startOfWeek, addWeeks, subWeeks, isSameWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import WeekDay, { BinType } from './WeekDay';
import BinIcon from './BinIcon';
import { binSchedule } from '@/data/binSchedule';

interface WeeklyCalendarProps {
  className?: string;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isAnimating, setIsAnimating] = useState(false);

  const today = new Date();

  const navigateWeek = (direction: 'next' | 'prev') => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentWeekStart(addWeeks(currentWeekStart, 1));
      } else {
        setCurrentWeekStart(subWeeks(currentWeekStart, 1));
      }
      setIsAnimating(false);
    }, 300);
  };

  const renderWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(currentWeekStart, i);
      const isToday = isSameDay(day, today);
      const isCurrentWeek = isSameWeek(day, today, { weekStartsOn: 1 });
      
      // Get bins for this day from our schedule data
      const formattedDate = format(day, 'yyyy-MM-dd');
      const binsForDay = binSchedule[formattedDate] || [];

      days.push(
        <WeekDay 
          key={i} 
          date={day} 
          bins={binsForDay}
          isToday={isToday}
          isCurrentWeek={isCurrentWeek}
        />
      );
    }
    return days;
  };

  const goToToday = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={cn(
      'rounded-xl p-4 glass-dark text-white overflow-hidden',
      'transition-all duration-500 ease-out',
      className
    )}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-light mb-1">Bin Collection</h2>
          <div className="text-sm font-light text-gray-300">
            Week of {format(currentWeekStart, 'MMMM d, yyyy')}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => navigateWeek('prev')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={goToToday}
            className="px-3 py-1 rounded-md hover:bg-white/10 transition-colors duration-200 text-sm"
          >
            Today
          </button>
          
          <button 
            onClick={() => navigateWeek('next')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 justify-between mb-4">
        {renderWeekDays()}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <div className="text-sm font-medium mb-2">Legend</div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <BinIcon type="black" size="sm" className="mr-2" />
            <span className="text-xs">General</span>
          </div>
          <div className="flex items-center">
            <BinIcon type="blue" size="sm" className="mr-2" />
            <span className="text-xs">Recycling</span>
          </div>
          <div className="flex items-center">
            <BinIcon type="green" size="sm" className="mr-2" />
            <span className="text-xs">Garden</span>
          </div>
          <div className="flex items-center">
            <BinIcon type="brown" size="sm" className="mr-2" />
            <span className="text-xs">Food</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
