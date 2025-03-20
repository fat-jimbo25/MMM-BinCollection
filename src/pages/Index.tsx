
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
          <div className="animate-scale-in opacity-0 animate-fill-forwards">
            <WeeklyCalendar className="w-full shadow-xl" />
            
            <div className="text-center mt-6 text-white/50 text-sm">
              <p>Magic Mirror Bin Collection Module</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
