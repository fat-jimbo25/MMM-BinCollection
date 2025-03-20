
import React, { useEffect, useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {mounted && (
          <div className="opacity-0 animate-scale-in animate-fill-forwards">
            <WeeklyCalendar className="w-full shadow-xl" />
            
            <div className="text-center mt-6 text-white/70 text-sm">
              <p className="mb-2">Magic Mirror Bin Collection Module</p>
              <p className="text-xs text-white/50">
                Displaying bin collection schedule with color-coded bins. Use the button below the calendar to view March 2025 schedule.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
