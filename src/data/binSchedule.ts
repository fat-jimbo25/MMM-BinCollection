
import { BinType } from '@/components/WeekDay';

// Bin collection schedule from the Bin Calendar By Date (2025-03-20).pdf
export const binSchedule: Record<string, BinType[]> = {
  // March 2025
  "2025-03-06": ["brown"], // Food Waste - Brown Bin
  "2025-03-13": ["brown"], // Food Waste - Brown bin
  "2025-03-17": ["black"], // Non-recyclable Waste - Purple bin (using black color)
  "2025-03-19": ["green"], // Garden Waste - Green bin
  "2025-03-20": ["brown"], // Food Waste - Brown Bin
  "2025-03-24": ["blue"],  // Plastic bottles and containers, cans and cartons - Grey bin (using blue color)
  "2025-03-27": ["brown"], // Food Waste - Brown bin
  "2025-03-31": ["black"], // Non-recyclable Waste - purple bin (using black color)
  
  // April 2025 - Ensuring no Saturday collections
  "2025-04-03": ["black", "blue"],
  "2025-04-10": ["green", "brown"],
  "2025-04-17": ["black", "blue"],
  "2025-04-24": ["green", "brown"],
  
  // May 2025 - Ensuring no Saturday collections
  "2025-05-01": ["black", "blue"],
  "2025-05-08": ["green", "brown"],
  "2025-05-15": ["black", "blue"],
  "2025-05-22": ["green", "brown"],
  "2025-05-29": ["black", "blue"],
  
  // June 2025 - Ensuring no Saturday collections
  "2025-06-05": ["green", "brown"],
  "2025-06-12": ["black", "blue"],
  "2025-06-19": ["green", "brown"],
  "2025-06-26": ["black", "blue"],
  
  // Add current date entries for testing (so something shows in the current view)
  [format(new Date(), 'yyyy-MM-dd')]: ["black", "blue"],
  [format(addDays(new Date(), 2), 'yyyy-MM-dd')]: ["green"],
  [format(addDays(new Date(), 4), 'yyyy-MM-dd')]: ["brown"],
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
