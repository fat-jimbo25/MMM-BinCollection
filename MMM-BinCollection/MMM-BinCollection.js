
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
        
        // Send config to the node helper
        this.sendSocketNotification("SET_CONFIG", this.config);
        
        // Request the bin schedule data
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
            Log.info(`${this.name} received bin schedule data with ${Object.keys(payload).length} entries`);
            this.binSchedule = payload;
            this.loaded = true;
            this.updateDom(this.config.animationSpeed);
        }
    },

    // Override dom generator
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "bin-collection-wrapper";

        if (!this.loaded) {
            wrapper.innerHTML = "Loading bin collection data...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        // Create header
        const header = document.createElement("div");
        header.className = "module-header";
        header.innerHTML = "Bin Collection";
        wrapper.appendChild(header);
        
        // Create calendar view
        const calendarView = document.createElement("div");
        calendarView.className = "calendar-view";
        
        // Get start of week
        const weekStart = moment(this.currentWeekStart);
        const today = moment();
        
        // Display week date range
        const weekDateRange = document.createElement("div");
        weekDateRange.className = "week-date-range";
        weekDateRange.innerHTML = `Week of ${weekStart.format("MMM D")}`;
        calendarView.appendChild(weekDateRange);
        
        // Display days
        const daysContainer = document.createElement("div");
        daysContainer.className = "days-container";
        
        // Loop through the days of the week
        for (let i = 0; i < (this.config.showWeekends ? 7 : 5); i++) {
            const day = moment(weekStart).add(i, "days");
            const dateStr = day.format("YYYY-MM-DD");
            const binsForDay = this.binSchedule[dateStr] || [];
            
            const dayElement = document.createElement("div");
            dayElement.className = "day-element" + (day.isSame(today, "day") ? " today" : "");
            
            // Day name
            const dayName = document.createElement("div");
            dayName.className = "day-name";
            dayName.innerHTML = day.format("ddd");
            dayElement.appendChild(dayName);
            
            // Day date
            const dayDate = document.createElement("div");
            dayDate.className = "day-date";
            dayDate.innerHTML = day.format("D");
            dayElement.appendChild(dayDate);
            
            // Bins
            const binsElement = document.createElement("div");
            binsElement.className = "bins-element";
            
            if (binsForDay.length > 0) {
                binsForDay.forEach(binType => {
                    if (this.config.bins[binType]) {
                        const binElement = document.createElement("div");
                        binElement.className = `bin-icon bin-${binType}`;
                        binElement.title = this.config.bins[binType].label;
                        binsElement.appendChild(binElement);
                    }
                });
            } else {
                const noBinsElement = document.createElement("div");
                noBinsElement.className = "no-bins";
                noBinsElement.innerHTML = "No collection";
                binsElement.appendChild(noBinsElement);
            }
            
            dayElement.appendChild(binsElement);
            daysContainer.appendChild(dayElement);
        }
        
        calendarView.appendChild(daysContainer);
        wrapper.appendChild(calendarView);
        
        // Add legend if configured
        if (this.config.showLegend) {
            const legendElement = document.createElement("div");
            legendElement.className = "legend";
            
            Object.entries(this.config.bins).forEach(([binType, binConfig]) => {
                const legendItem = document.createElement("div");
                legendItem.className = "legend-item";
                
                const binIcon = document.createElement("div");
                binIcon.className = `bin-icon bin-${binType}`;
                legendItem.appendChild(binIcon);
                
                const binLabel = document.createElement("div");
                binLabel.className = "bin-label";
                binLabel.innerHTML = binConfig.label;
                legendItem.appendChild(binLabel);
                
                legendElement.appendChild(legendItem);
            });
            
            wrapper.appendChild(legendElement);
        }

        return wrapper;
    }
});
