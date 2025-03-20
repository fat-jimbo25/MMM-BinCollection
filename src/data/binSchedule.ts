
import { BinType } from '@/components/WeekDay';

// Sample bin collection schedule (this would typically come from an API or database)
export const binSchedule: Record<string, BinType[]> = {
  // Example data - replace with your actual schedule
  '2024-07-01': ['black'],
  '2024-07-08': ['black', 'blue'],
  '2024-07-15': ['black', 'green'],
  '2024-07-22': ['black', 'blue', 'brown'],
  '2024-07-29': ['black'],
  '2024-08-05': ['black', 'blue'],
  '2024-08-12': ['black', 'green'],
  '2024-08-19': ['black', 'blue', 'brown'],
  '2024-08-26': ['black'],
  // Current week (adjust dates to match current dates for testing)
  [format(new Date(), 'yyyy-MM-dd')]: ['black', 'blue'],
  [format(addDays(new Date(), 2), 'yyyy-MM-dd')]: ['green'],
  [format(addDays(new Date(), 4), 'yyyy-MM-dd')]: ['brown'],
};

// Helper function to format date as yyyy-MM-dd
function format(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  if (formatStr === 'yyyy-MM-dd') {
    return `${year}-${month}-${day}`;
  }
  
  return formatStr;
}

// Helper function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
