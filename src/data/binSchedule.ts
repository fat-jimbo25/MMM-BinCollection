
import { BinType } from '@/components/WeekDay';

// Bin collection schedule from the detailed calendar provided by the user
export const binSchedule: Record<string, BinType[]> = {
  // March 2025
  "2025-03-06": ["brown"], // Food Waste
  "2025-03-13": ["brown"], // Food Waste
  "2025-03-17": ["black"], // Non-recyclable Waste
  "2025-03-19": ["green"], // Garden Waste
  "2025-03-20": ["brown"], // Food Waste
  "2025-03-24": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-03-27": ["brown"], // Food Waste
  "2025-03-31": ["black"], // Non-recyclable Waste
  
  // April 2025
  "2025-04-02": ["green"], // Garden Waste
  "2025-04-03": ["brown"], // Food Waste
  "2025-04-07": ["blue"],  // Paper and card
  "2025-04-10": ["brown"], // Food Waste
  "2025-04-14": ["black"], // Non-recyclable Waste
  "2025-04-16": ["green"], // Garden Waste
  "2025-04-17": ["brown"], // Food Waste
  "2025-04-21": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-04-24": ["brown"], // Food Waste
  "2025-04-28": ["black"], // Non-recyclable Waste
  "2025-04-30": ["green"], // Garden Waste
  
  // May 2025
  "2025-05-01": ["brown"], // Food Waste
  "2025-05-05": ["blue"],  // Paper and card
  "2025-05-08": ["brown"], // Food Waste
  "2025-05-12": ["black"], // Non-recyclable Waste
  "2025-05-14": ["green"], // Garden Waste
  "2025-05-15": ["brown"], // Food Waste
  "2025-05-19": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-05-22": ["brown"], // Food Waste
  "2025-05-26": ["black"], // Non-recyclable Waste
  "2025-05-28": ["green"], // Garden Waste
  "2025-05-29": ["brown"], // Food Waste
  
  // June 2025
  "2025-06-02": ["blue"],  // Paper and card
  "2025-06-05": ["brown"], // Food Waste
  "2025-06-09": ["black"], // Non-recyclable Waste
  "2025-06-11": ["green"], // Garden Waste
  "2025-06-12": ["brown"], // Food Waste
  "2025-06-16": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-06-19": ["brown"], // Food Waste
  "2025-06-23": ["black"], // Non-recyclable Waste
  "2025-06-25": ["green"], // Garden Waste
  "2025-06-26": ["brown"], // Food Waste
  "2025-06-30": ["blue"],  // Paper and card
  
  // July 2025
  "2025-07-03": ["brown"], // Food Waste
  "2025-07-07": ["black"], // Non-recyclable Waste
  "2025-07-09": ["green"], // Garden Waste
  "2025-07-10": ["brown"], // Food Waste
  "2025-07-14": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-07-17": ["brown"], // Food Waste
  "2025-07-21": ["black"], // Non-recyclable Waste
  "2025-07-23": ["green"], // Garden Waste
  "2025-07-24": ["brown"], // Food Waste
  "2025-07-28": ["blue"],  // Paper and card
  "2025-07-31": ["brown"], // Food Waste
  
  // August 2025
  "2025-08-04": ["black"], // Non-recyclable Waste
  "2025-08-06": ["green"], // Garden Waste
  "2025-08-07": ["brown"], // Food Waste
  "2025-08-11": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-08-14": ["brown"], // Food Waste
  "2025-08-18": ["black"], // Non-recyclable Waste
  "2025-08-20": ["green"], // Garden Waste
  "2025-08-21": ["brown"], // Food Waste
  "2025-08-25": ["blue"],  // Paper and card
  "2025-08-28": ["brown"], // Food Waste
  
  // September 2025
  "2025-09-01": ["black"], // Non-recyclable Waste
  "2025-09-03": ["green"], // Garden Waste
  "2025-09-04": ["brown"], // Food Waste
  "2025-09-08": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-09-11": ["brown"], // Food Waste
  "2025-09-15": ["black"], // Non-recyclable Waste
  "2025-09-17": ["green"], // Garden Waste
  "2025-09-18": ["brown"], // Food Waste
  "2025-09-22": ["blue"],  // Paper and card
  "2025-09-25": ["brown"], // Food Waste
  "2025-09-29": ["black"], // Non-recyclable Waste
  
  // October 2025
  "2025-10-01": ["green"], // Garden Waste
  "2025-10-02": ["brown"], // Food Waste
  "2025-10-06": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-10-09": ["brown"], // Food Waste
  "2025-10-13": ["black"], // Non-recyclable Waste
  "2025-10-15": ["green"], // Garden Waste
  "2025-10-16": ["brown"], // Food Waste
  "2025-10-20": ["blue"],  // Paper and card
  "2025-10-23": ["brown"], // Food Waste
  "2025-10-27": ["black"], // Non-recyclable Waste
  "2025-10-29": ["green"], // Garden Waste
  "2025-10-30": ["brown"], // Food Waste
  
  // November 2025
  "2025-11-03": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-11-06": ["brown"], // Food Waste
  "2025-11-10": ["black"], // Non-recyclable Waste
  "2025-11-12": ["green"], // Garden Waste
  "2025-11-13": ["brown"], // Food Waste
  "2025-11-17": ["blue"],  // Paper and card
  "2025-11-20": ["brown"], // Food Waste
  "2025-11-24": ["black"], // Non-recyclable Waste
  "2025-11-26": ["green"], // Garden Waste
  "2025-11-27": ["brown"], // Food Waste
  
  // December 2025
  "2025-12-01": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2025-12-04": ["brown"], // Food Waste
  "2025-12-08": ["black"], // Non-recyclable Waste
  "2025-12-11": ["brown"], // Food Waste
  "2025-12-15": ["blue"],  // Paper and card
  "2025-12-18": ["brown"], // Food Waste
  "2025-12-22": ["black"], // Non-recyclable Waste
  "2025-12-27": ["brown"], // Food Waste (Saturday)
  "2025-12-29": ["blue"],  // Plastic bottles and containers, cans and cartons
  
  // January 2026
  "2026-01-03": ["brown"], // Food Waste (Saturday)
  "2026-01-05": ["black"], // Non-recyclable Waste
  "2026-01-08": ["brown"], // Food Waste
  "2026-01-12": ["blue"],  // Paper and card
  "2026-01-15": ["brown"], // Food Waste
  "2026-01-19": ["black"], // Non-recyclable Waste
  "2026-01-22": ["brown"], // Food Waste
  "2026-01-26": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2026-01-29": ["brown"], // Food Waste
  
  // February 2026
  "2026-02-02": ["black"], // Non-recyclable Waste
  "2026-02-05": ["brown"], // Food Waste
  "2026-02-09": ["blue"],  // Paper and card
  "2026-02-12": ["brown"], // Food Waste
  "2026-02-16": ["black"], // Non-recyclable Waste
  "2026-02-18": ["green"], // Garden Waste
  "2026-02-19": ["brown"], // Food Waste
  "2026-02-23": ["blue"],  // Plastic bottles and containers, cans and cartons
  "2026-02-26": ["brown"]  // Food Waste
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
