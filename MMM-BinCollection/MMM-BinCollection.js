
/* Magic Mirror
 * Module: MMM-BinCollection
 * 
 * By Lovable
 * MIT Licensed.
 */

// Import components
const Day = require('./components/Day');
const Legend = require('./components/Legend');
const Header = require('./components/Header');
const { getWeekDays } = require('./utils/dateUtils');

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
            
            // Try requesting data again if we're still loading
            this.sendSocketNotification("GET_BIN_SCHEDULE", {});
            
            return wrapper;
        }

        // Add header with navigation
        const headerElement = Header(
            this.currentWeekStart, 
            this.navigateWeek.bind(this), 
            this.goToCurrentWeek.bind(this)
        );
        wrapper.appendChild(headerElement);

        // Calendar days
        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        
        // Create week days
        const today = moment();
        const weekDays = getWeekDays(this.currentWeekStart, this.config.showWeekends);
        
        weekDays.forEach(day => {
            const dayElement = Day(day, today, this.binSchedule, this.config.bins);
            calendarContainer.appendChild(dayElement);
        });
        
        wrapper.appendChild(calendarContainer);

        // Legend
        if (this.config.showLegend) {
            const legendElement = Legend(this.config.bins);
            wrapper.appendChild(legendElement);
        }

        return wrapper;
    }
});
