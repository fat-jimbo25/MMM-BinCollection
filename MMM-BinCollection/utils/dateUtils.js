/* Utility functions for date operations */

/**
 * Format a date in YYYY-MM-DD format
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
exports.formatDate = function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Generate an array of dates for the week
 * @param {object} moment - Moment.js object for the week start
 * @param {boolean} showWeekends - Whether to include weekend days
 * @returns {Array} Array of moment objects for the week
 */
exports.getWeekDays = function(weekStart, showWeekends) {
    const days = [];
    
    for (let i = 0; i < 7; i++) {
        const day = moment(weekStart).add(i, 'days');
        
        // Skip weekends if configured
        const dayOfWeek = day.day(); // 0 is Sunday, 6 is Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        if (isWeekend && !showWeekends) {
            continue;
        }
        
        days.push(day);
    }
    
    return days;
};

/**
 * Generate recurring bin collection dates
 * @param {object} config - Configuration for recurring collections
 * @param {Date} startDate - Start date for generation
 * @param {number} months - Number of months to generate
 * @returns {object} Schedule object with dates as keys and bin types as values
 */
exports.generateRecurringCollections = function(config, startDate = new Date(), months = 12) {
    const schedule = {};
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + months);
    
    // Process weekly collections
    if (config.weekly && config.weekly.length > 0) {
        config.weekly.forEach(item => {
            const { binType, dayOfWeek } = item;
            generateWeeklyDates(startDate, endDate, dayOfWeek, binType, schedule, this.formatDate);
        });
    }
    
    // Process bi-weekly collections
    if (config.biweekly && config.biweekly.length > 0) {
        config.biweekly.forEach(item => {
            const { binType, dayOfWeek, startDate: specificStartDate, skipHolidays } = item;
            generateBiWeeklyDates(startDate, endDate, dayOfWeek, binType, specificStartDate, skipHolidays, schedule, this.formatDate);
        });
    }
    
    // Process monthly collections
    if (config.monthly && config.monthly.length > 0) {
        config.monthly.forEach(item => {
            const { binType, dayOfMonth, occurrence, dayOfWeek } = item;
            generateMonthlyDates(startDate, endDate, binType, dayOfMonth, occurrence, dayOfWeek, schedule, this.formatDate);
        });
    }
    
    // Process seasonal collections
    if (config.seasonal && config.seasonal.length > 0) {
        config.seasonal.forEach(item => {
            const { binType, dayOfWeek, startMonth, endMonth, interval, skipHolidays } = item;
            generateSeasonalDates(startDate, endDate, binType, dayOfWeek, startMonth, endMonth, interval, skipHolidays, schedule, this.formatDate);
        });
    }
    
    // Process custom interval collections (for the 3-week rotation)
    if (config.custom && config.custom.length > 0) {
        config.custom.forEach(item => {
            const { 
                binType, 
                dayOfWeek, 
                startDate: specificStartDate, 
                interval, 
                startMonth, 
                endMonth 
            } = item;
            
            generateCustomIntervalDates(
                startDate, 
                endDate, 
                binType, 
                dayOfWeek, 
                specificStartDate, 
                interval, 
                startMonth, 
                endMonth, 
                schedule, 
                this.formatDate
            );
        });
    }
    
    // Process special one-off dates
    if (config.special && config.special.length > 0) {
        config.special.forEach(item => {
            const { date, bins } = item;
            if (date && bins) {
                schedule[date] = bins;
            }
        });
    }
    
    return schedule;
};

/**
 * Helper to generate weekly recurring dates
 * @private
 */
function generateWeeklyDates(startDate, endDate, dayOfWeek, binType, schedule, formatDateFn) {
    const current = new Date(startDate);
    
    // Move to the first occurrence of the specified day of week
    const currentDayOfWeek = current.getDay(); // 0 is Sunday, 6 is Saturday
    const daysToAdd = (dayOfWeek - currentDayOfWeek + 7) % 7;
    current.setDate(current.getDate() + daysToAdd);
    
    // Generate weekly occurrences until the end date
    while (current <= endDate) {
        const dateKey = formatDateFn(current);
        
        if (!schedule[dateKey]) {
            schedule[dateKey] = [binType];
        } else if (!schedule[dateKey].includes(binType)) {
            schedule[dateKey].push(binType);
        }
        
        // Move to next week
        current.setDate(current.getDate() + 7);
    }
}

/**
 * Helper to generate bi-weekly recurring dates with specific start date
 * @private
 */
function generateBiWeeklyDates(startDate, endDate, dayOfWeek, binType, specificStartDate, skipHolidays, schedule, formatDateFn) {
    let current;
    
    // If a specific start date is provided, use that
    if (specificStartDate) {
        current = new Date(specificStartDate);
    } else {
        current = new Date(startDate);
        
        // Move to the first occurrence of the specified day of week
        const currentDayOfWeek = current.getDay();
        const daysToAdd = (dayOfWeek - currentDayOfWeek + 7) % 7;
        current.setDate(current.getDate() + daysToAdd);
    }
    
    // Generate bi-weekly occurrences until the end date
    while (current <= endDate) {
        const dateKey = formatDateFn(current);
        
        if (current >= startDate) {
            if (!schedule[dateKey]) {
                schedule[dateKey] = [binType];
            } else if (!schedule[dateKey].includes(binType)) {
                schedule[dateKey].push(binType);
            }
        }
        
        // Move to next bi-weekly occurrence
        current.setDate(current.getDate() + 14);
    }
}

/**
 * Helper to generate monthly recurring dates
 * @private
 */
function generateMonthlyDates(startDate, endDate, binType, dayOfMonth, occurrence, dayOfWeek, schedule, formatDateFn) {
    const current = new Date(startDate);
    
    // Handle specific day of month
    if (dayOfMonth) {
        // Set to first day of the current month
        current.setDate(1);
        
        // If we're already past this day in the current month, move to next month
        if (startDate.getDate() > dayOfMonth) {
            current.setMonth(current.getMonth() + 1);
        }
        
        // Set to the specified day of month
        current.setDate(Math.min(dayOfMonth, getDaysInMonth(current.getFullYear(), current.getMonth() + 1)));
        
        // Generate occurrences until the end date
        while (current <= endDate) {
            const dateKey = formatDateFn(current);
            
            if (!schedule[dateKey]) {
                schedule[dateKey] = [binType];
            } else if (!schedule[dateKey].includes(binType)) {
                schedule[dateKey].push(binType);
            }
            
            // Move to next month
            current.setMonth(current.getMonth() + 1);
            // Handle different month lengths
            current.setDate(Math.min(dayOfMonth, getDaysInMonth(current.getFullYear(), current.getMonth() + 1)));
        }
    } 
    // Handle nth occurrence of a specific day in month (e.g., 3rd Thursday)
    else if (occurrence && dayOfWeek !== undefined) {
        while (current <= endDate) {
            // Find the date of the nth occurrence of day in this month
            const targetDate = getNthDayOfMonth(current.getFullYear(), current.getMonth(), dayOfWeek, occurrence);
            current = new Date(targetDate);
            
            // Skip if the date is before our start date
            if (current >= startDate && current <= endDate) {
                const dateKey = formatDateFn(current);
                
                if (!schedule[dateKey]) {
                    schedule[dateKey] = [binType];
                } else if (!schedule[dateKey].includes(binType)) {
                    schedule[dateKey].push(binType);
                }
            }
            
            // Move to first day of next month
            current.setMonth(current.getMonth() + 1);
            current.setDate(1);
        }
    }
}

/**
 * Helper to generate seasonal recurring dates
 * @private
 */
function generateSeasonalDates(startDate, endDate, binType, dayOfWeek, startMonth, endMonth, interval, skipHolidays, schedule, formatDateFn) {
    const current = new Date(startDate);
    const currentYear = current.getFullYear();
    
    // Adjust if we're outside the season
    const currentMonth = current.getMonth() + 1; // 1-12 format
    
    if (startMonth <= endMonth) {
        // Season within same year (e.g., March to November)
        if (currentMonth < startMonth) {
            // Before season, move to start of season
            current.setMonth(startMonth - 1); // 0-based
            current.setDate(1);
        } else if (currentMonth > endMonth) {
            // After season, move to start of season in next year
            current.setFullYear(current.getFullYear() + 1);
            current.setMonth(startMonth - 1); // 0-based
            current.setDate(1);
        }
    } else {
        // Season spans years (e.g., November to March)
        if (currentMonth < startMonth && currentMonth > endMonth) {
            // Outside season, move to start of season
            current.setMonth(startMonth - 1); // 0-based
            current.setDate(1);
        }
    }
    
    // Move to the first occurrence of the specified day of week
    const currentDayOfWeek = current.getDay();
    const daysToAdd = (dayOfWeek - currentDayOfWeek + 7) % 7;
    current.setDate(current.getDate() + daysToAdd);
    
    // Generate occurrences until the end date
    while (current <= endDate) {
        const currentMonth = current.getMonth() + 1; // 1-12 format
        
        // Check if we're in season
        let inSeason = false;
        if (startMonth <= endMonth) {
            // Season within same year
            inSeason = currentMonth >= startMonth && currentMonth <= endMonth;
        } else {
            // Season spans years
            inSeason = currentMonth >= startMonth || currentMonth <= endMonth;
        }
        
        if (inSeason) {
            const dateKey = formatDateFn(current);
            
            if (!schedule[dateKey]) {
                schedule[dateKey] = [binType];
            } else if (!schedule[dateKey].includes(binType)) {
                schedule[dateKey].push(binType);
            }
        }
        
        // Move forward based on interval (default to weekly if not specified)
        const intervalDays = interval === 'biweekly' ? 14 : 7;
        current.setDate(current.getDate() + intervalDays);
    }
}

/**
 * Helper to generate custom interval recurring dates (for 3-week rotation)
 * @private
 */
function generateCustomIntervalDates(
    baseStartDate, 
    endDate, 
    binType, 
    dayOfWeek, 
    specificStartDate, 
    intervalWeeks, 
    startMonth, 
    endMonth, 
    schedule, 
    formatDateFn
) {
    let current;
    
    // If a specific start date is provided, use that
    if (specificStartDate) {
        current = new Date(specificStartDate);
    } else {
        current = new Date(baseStartDate);
        
        // Move to the first occurrence of the specified day of week
        const currentDayOfWeek = current.getDay();
        const daysToAdd = (dayOfWeek - currentDayOfWeek + 7) % 7;
        current.setDate(current.getDate() + daysToAdd);
    }
    
    // Generate occurrences with custom interval until the end date
    while (current <= endDate) {
        const currentMonth = current.getMonth() + 1; // 1-12 format
        
        // Check if we're in season (if seasonal constraints are provided)
        let inSeason = true;
        if (startMonth && endMonth) {
            if (startMonth <= endMonth) {
                // Season within same year
                inSeason = currentMonth >= startMonth && currentMonth <= endMonth;
            } else {
                // Season spans years
                inSeason = currentMonth >= startMonth || currentMonth <= endMonth;
            }
        }
        
        // Add to schedule if date is valid and in season
        if (current >= baseStartDate && inSeason) {
            const dateKey = formatDateFn(current);
            
            if (!schedule[dateKey]) {
                schedule[dateKey] = [binType];
            } else if (!schedule[dateKey].includes(binType)) {
                schedule[dateKey].push(binType);
            }
        }
        
        // Move to next occurrence based on custom interval
        const intervalDays = (intervalWeeks || 1) * 7;
        current.setDate(current.getDate() + intervalDays);
    }
}

/**
 * Helper to get the number of days in a month
 * @private
 */
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

/**
 * Helper to get the nth occurrence of a day in a month
 * @private
 */
function getNthDayOfMonth(year, month, dayOfWeek, occurrence) {
    let count = 0;
    const date = new Date(year, month, 1);
    
    // Find the first occurrence of the day in the month
    while (date.getDay() !== dayOfWeek) {
        date.setDate(date.getDate() + 1);
    }
    
    // Move to the nth occurrence
    date.setDate(date.getDate() + (occurrence - 1) * 7);
    
    return date;
}
