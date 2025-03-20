
import { BinType } from '@/components/WeekDay';

// This file contains the bin collection schedule data
// It's structured as a map of dates (in yyyy-MM-dd format) to arrays of bins to be collected
// Each date can have multiple bins scheduled for collection

// Example bin schedule data for March-April 2025
export const binSchedule: Record<string, BinType[]> = {
  // March 2025
  "2025-03-20": ["black", "blue"],
  "2025-03-27": ["green", "brown"],
  
  // April 2025
  "2025-04-03": ["black", "blue"],
  "2025-04-10": ["green", "brown"],
  "2025-04-17": ["black", "blue"],
  "2025-04-24": ["green", "brown"],
  
  // May 2025
  "2025-05-01": ["black", "blue"],
  "2025-05-08": ["green", "brown"],
  "2025-05-15": ["black", "blue"],
  "2025-05-22": ["green", "brown"],
  "2025-05-29": ["black", "blue"],
  
  // June 2025
  "2025-06-05": ["green", "brown"],
  "2025-06-12": ["black", "blue"],
  "2025-06-19": ["green", "brown"],
  "2025-06-26": ["black", "blue"],
  
  // Add more dates as needed...
};

// You can update this data with the actual bin collection dates from your PDF
// The format should be "YYYY-MM-DD": ["binType1", "binType2", ...]
