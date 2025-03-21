
/* Magic Mirror
 * Node Helper: MMM-BinCollection
 * 
 * By Lovable
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
        this.binSchedule = {};
        this.loadBinSchedule();
    },

    loadBinSchedule: function() {
        const schedulePath = path.resolve(__dirname, "binSchedule.json");
        
        try {
            if (fs.existsSync(schedulePath)) {
                const scheduleData = fs.readFileSync(schedulePath, "utf8");
                this.binSchedule = JSON.parse(scheduleData);
                console.log("Bin schedule data loaded successfully");
            } else {
                // Create default schedule if file doesn't exist
                this.createDefaultSchedule(schedulePath);
            }
        } catch (error) {
            console.error("Error loading bin schedule:", error);
            this.createDefaultSchedule(schedulePath);
        }
    },

    createDefaultSchedule: function(filePath) {
        // Create a basic schedule for the next few months
        const defaultSchedule = {}; 
        
        // Add sample entries
        const today = new Date();
        
        // Every Thursday for brown bins (food waste)
        for (let i = 0; i < 52; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + ((4 + 7 - date.getDay()) % 7) + (i * 7)); // Find next Thursday
            const formattedDate = this.formatDate(date);
            defaultSchedule[formattedDate] = ["brown"];
        }
        
        // Alternating blue and black bins on Mondays
        for (let i = 0; i < 26; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7) + (i * 14)); // Find next Monday
            const formattedDate = this.formatDate(date);
            defaultSchedule[formattedDate] = ["blue"];
            
            const nextMonday = new Date(date);
            nextMonday.setDate(nextMonday.getDate() + 7);
            const nextMondayFormatted = this.formatDate(nextMonday);
            defaultSchedule[nextMondayFormatted] = ["black"];
        }
        
        // Green bins (garden waste) every other Wednesday from March to November
        const currentYear = today.getFullYear();
        let startMonth = 2; // March (0-indexed)
        let endMonth = 10; // November (0-indexed)
        
        if (today.getMonth() > endMonth) {
            // If we're past November, schedule for next year
            startMonth += 12;
            endMonth += 12;
        }
        
        const startDate = new Date(currentYear, startMonth, 1);
        const endDate = new Date(currentYear, endMonth, 30);
        
        let currentWednesday = new Date(startDate);
        currentWednesday.setDate(currentWednesday.getDate() + ((3 + 7 - currentWednesday.getDay()) % 7)); // Find first Wednesday
        
        while (currentWednesday <= endDate) {
            const formattedDate = this.formatDate(currentWednesday);
            
            // Add green bin to existing bins or create new entry
            if (defaultSchedule[formattedDate]) {
                defaultSchedule[formattedDate].push("green");
            } else {
                defaultSchedule[formattedDate] = ["green"];
            }
            
            // Move to next fortnight's Wednesday
            currentWednesday.setDate(currentWednesday.getDate() + 14);
        }
        
        // Write the default schedule to file
        fs.writeFileSync(filePath, JSON.stringify(defaultSchedule, null, 2), "utf8");
        console.log("Created default bin schedule");
        
        this.binSchedule = defaultSchedule;
    },

    formatDate: function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    socketNotificationReceived: function(notification, payload) {
        console.log(`${this.name} received socket notification: ${notification}`);
        if (notification === "GET_BIN_SCHEDULE") {
            console.log(`${this.name} sending bin schedule data`, Object.keys(this.binSchedule).length);
            this.sendSocketNotification("BIN_SCHEDULE_DATA", this.binSchedule);
        }
    }
});
