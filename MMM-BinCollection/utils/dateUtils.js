
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
