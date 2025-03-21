
/* Day component for the bin collection calendar */

/**
 * Create a DOM element for a single day
 * @param {object} day - Moment.js object for the day
 * @param {object} today - Today's date as moment object
 * @param {object} binSchedule - Schedule of bin collections
 * @param {object} binConfig - Configuration for bin types
 * @returns {HTMLElement} DOM element for the day
 */
module.exports = function(day, today, binSchedule, binConfig) {
    const isToday = day.isSame(today, 'day');
    const isCurrentWeek = day.isSame(today, 'week');
    
    const dayElement = document.createElement("div");
    dayElement.className = "day-container" + (isToday ? " today" : "") + (isCurrentWeek ? " current-week" : "");
    
    // Day name
    const dayName = document.createElement("div");
    dayName.textContent = day.format('ddd');
    dayName.className = "day-name";
    dayElement.appendChild(dayName);
    
    // Day number
    const dayNumber = document.createElement("div");
    dayNumber.textContent = day.format('D');
    dayNumber.className = "day-number";
    dayElement.appendChild(dayNumber);
    
    // Bins for this day
    const formattedDate = day.format('YYYY-MM-DD');
    const binsForDay = binSchedule[formattedDate] || [];
    
    if (binsForDay.length > 0) {
        const binsContainer = document.createElement("div");
        binsContainer.className = "bins-container";
        
        binsForDay.forEach(binType => {
            if (binConfig[binType]) {
                const binIcon = document.createElement("div");
                binIcon.className = `bin-icon bin-${binType}`;
                binsContainer.appendChild(binIcon);
            }
        });
        
        dayElement.appendChild(binsContainer);
    }
    
    return dayElement;
};
