
/* Header component for the bin collection calendar */

/**
 * Create a DOM element for the calendar header with navigation
 * @param {object} currentWeekStart - Moment.js object for the week start
 * @param {function} navigateWeek - Function to navigate to different weeks
 * @param {function} goToCurrentWeek - Function to go to current week
 * @returns {HTMLElement} DOM element for the header
 */
module.exports = function(currentWeekStart, navigateWeek, goToCurrentWeek) {
    const header = document.createElement("div");
    header.className = "module-header";
    
    const title = document.createElement("h2");
    title.textContent = "Bin Collection";
    title.className = "bin-title";
    header.appendChild(title);

    const weekText = document.createElement("div");
    weekText.textContent = "Week of " + currentWeekStart.format('MMMM D, YYYY');
    weekText.className = "week-date";
    header.appendChild(weekText);

    // Navigation
    const nav = document.createElement("div");
    nav.className = "bin-nav";
    
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "❮";
    prevBtn.className = "nav-btn";
    prevBtn.addEventListener("click", () => navigateWeek('prev'));
    nav.appendChild(prevBtn);
    
    const todayBtn = document.createElement("button");
    todayBtn.textContent = "Today";
    todayBtn.className = "today-btn";
    todayBtn.addEventListener("click", () => goToCurrentWeek());
    nav.appendChild(todayBtn);
    
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "❯";
    nextBtn.className = "nav-btn";
    nextBtn.addEventListener("click", () => navigateWeek('next'));
    nav.appendChild(nextBtn);
    
    header.appendChild(nav);
    return header;
};
