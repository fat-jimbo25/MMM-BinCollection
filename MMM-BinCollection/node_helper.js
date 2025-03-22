
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
        this.config = {};
        this.loadBinSchedule();
    },

    loadBinSchedule: function() {
        const schedulePath = path.resolve(__dirname, "binSchedule.json");
        
        try {
            if (fs.existsSync(schedulePath)) {
                const scheduleData = fs.readFileSync(schedulePath, "utf8");
                this.binSchedule = JSON.parse(scheduleData);
                console.log("Bin schedule data loaded successfully, found", Object.keys(this.binSchedule).length, "dates");
            } else {
                console.log("No existing schedule found at: " + schedulePath);
                this.binSchedule = {};
            }
        } catch (error) {
            console.error("Error loading bin schedule:", error);
            this.binSchedule = {};
        }
    },

    socketNotificationReceived: function(notification, payload) {
        console.log(`${this.name} received socket notification: ${notification}`);
        
        if (notification === "SET_CONFIG") {
            this.config = payload;
            console.log("Config received by node helper");
        }
        else if (notification === "GET_BIN_SCHEDULE") {
            console.log(`${this.name} sending bin schedule data with ${Object.keys(this.binSchedule).length} dates`);
            this.sendSocketNotification("BIN_SCHEDULE_DATA", this.binSchedule);
        }
    }
});
