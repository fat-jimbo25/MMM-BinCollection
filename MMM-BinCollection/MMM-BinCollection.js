
/* Magic Mirror
 * Module: MMM-BinCollection
 * 
 * By Lovable
 * MIT Licensed.
 */

Module.register("MMM-BinCollection", {
    // Default module config
    defaults: {
        updateInterval: 86400 * 1000, // update every day
        animationSpeed: 1000,
        weekStartsOn: 1, // 0 = Sunday, 1 = Monday
        showLegend: true,
        showWeekends: false,
        bins: {
            black: { label: "Non-recyclable/Purple" },
            blue: { label: "Paper, Plastic & Cans/Grey" },
            green: { label: "Garden" },
            brown: { label: "Food" }
        }
    },

    // Required scripts
    getScripts: function() {
        return ["moment.js"];
    },

    // Required styles
    getStyles: function() {
        return ["MMM-BinCollection.css"];
    },

    // Define start sequence
    start: function() {
        Log.info("Starting module: " + this.name);
        
        this.binSchedule = {};
        this.loaded = false;
        this.currentWeekStart = moment().startOf('week').add(this.config.weekStartsOn, 'days');
        
        // Request bin schedule data immediately
        this.sendSocketNotification("GET_BIN_SCHEDULE", {});
        
        // Schedule updates
        setInterval(() => {
            this.sendSocketNotification("GET_BIN_SCHEDULE", {});
            this.updateDom(this.config.animationSpeed);
        }, this.config.updateInterval);
    },

    // Override socket notification handler
    socketNotificationReceived: function(notification, payload) {
        Log.info(`${this.name} received notification: ${notification}`);
        if (notification === "BIN_SCHEDULE_DATA") {
            Log.info(`${this.name} received bin schedule data`);
            this.binSchedule = payload;
            this.loaded = true;
            this.updateDom(this.config.animationSpeed);
        }
    },

    // Navigate week
    navigateWeek: function(direction) {
        if (direction === 'next') {
            this.currentWeekStart = moment(this.currentWeekStart).add(1, 'weeks');
        } else {
            this.currentWeekStart = moment(this.currentWeekStart).subtract(1, 'weeks');
        }
        this.updateDom(this.config.animationSpeed);
    },

    // Go to current week
    goToCurrentWeek: function() {
        this.currentWeekStart = moment().startOf('week').add(this.config.weekStartsOn, 'days');
        this.updateDom(this.config.animationSpeed);
    },

    // Override dom generator
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "bin-collection-wrapper";

        if (!this.loaded) {
            wrapper.innerHTML = "Loading bin collection data...";
            wrapper.className = "dimmed light small";
            Log.info(`${this.name} is still loading data...`);
            return wrapper;
        }

        // Header
        const header = document.createElement("div");
        header.className = "module-header";
        
        const title = document.createElement("h2");
        title.textContent = "Bin Collection";
        title.className = "bin-title";
        header.appendChild(title);

        const weekText = document.createElement("div");
        weekText.textContent = "Week of " + this.currentWeekStart.format('MMMM D, YYYY');
        weekText.className = "week-date";
        header.appendChild(weekText);

        // Navigation
        const nav = document.createElement("div");
        nav.className = "bin-nav";
        
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = "❮";
        prevBtn.className = "nav-btn";
        prevBtn.addEventListener("click", () => this.navigateWeek('prev'));
        nav.appendChild(prevBtn);
        
        const todayBtn = document.createElement("button");
        todayBtn.textContent = "Today";
        todayBtn.className = "today-btn";
        todayBtn.addEventListener("click", () => this.goToCurrentWeek());
        nav.appendChild(todayBtn);
        
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = "❯";
        nextBtn.className = "nav-btn";
        nextBtn.addEventListener("click", () => this.navigateWeek('next'));
        nav.appendChild(nextBtn);
        
        header.appendChild(nav);
        wrapper.appendChild(header);

        // Calendar days
        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        
        // Create 7 days of the week
        const today = moment();
        for (let i = 0; i < 7; i++) {
            const day = moment(this.currentWeekStart).add(i, 'days');
            const isToday = day.isSame(today, 'day');
            const isCurrentWeek = day.isSame(today, 'week');
            
            // Skip weekends if configured
            const dayOfWeek = day.day(); // 0 is Sunday, 6 is Saturday
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            if (isWeekend && !this.config.showWeekends) {
                continue;
            }
            
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
            const binsForDay = this.binSchedule[formattedDate] || [];
            
            if (binsForDay.length > 0) {
                const binsContainer = document.createElement("div");
                binsContainer.className = "bins-container";
                
                binsForDay.forEach(binType => {
                    if (this.config.bins[binType]) {
                        const binIcon = document.createElement("div");
                        binIcon.className = `bin-icon bin-${binType}`;
                        binsContainer.appendChild(binIcon);
                    }
                });
                
                dayElement.appendChild(binsContainer);
            }
            
            calendarContainer.appendChild(dayElement);
        }
        
        wrapper.appendChild(calendarContainer);

        // Legend
        if (this.config.showLegend) {
            const legend = document.createElement("div");
            legend.className = "bin-legend";
            
            const legendTitle = document.createElement("div");
            legendTitle.textContent = "Legend";
            legendTitle.className = "legend-title";
            legend.appendChild(legendTitle);
            
            const legendItems = document.createElement("div");
            legendItems.className = "legend-items";
            
            Object.entries(this.config.bins).forEach(([binType, binInfo]) => {
                const legendItem = document.createElement("div");
                legendItem.className = "legend-item";
                
                const binIcon = document.createElement("div");
                binIcon.className = `bin-icon bin-${binType} legend-icon`;
                legendItem.appendChild(binIcon);
                
                const binLabel = document.createElement("span");
                binLabel.textContent = binInfo.label;
                binLabel.className = "bin-label";
                legendItem.appendChild(binLabel);
                
                legendItems.appendChild(legendItem);
            });
            
            legend.appendChild(legendItems);
            wrapper.appendChild(legend);
        }

        return wrapper;
    }
});
