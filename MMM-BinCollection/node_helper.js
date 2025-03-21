
/* Magic Mirror
 * Node Helper: MMM-BinCollection
 * 
 * By Lovable
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");
const { formatDate, generateRecurringCollections } = require("./utils/dateUtils");

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
                console.log("No existing schedule found, will create default");
                // Create default schedule if file doesn't exist
                this.createDefaultSchedule(schedulePath);
            }
        } catch (error) {
            console.error("Error loading bin schedule:", error);
            this.createDefaultSchedule(schedulePath);
        }
    },

    createDefaultSchedule: function(filePath) {
        console.log("Creating default schedule based on your local collection pattern");
        // Create schedule based on your specific pattern
        const defaultConfig = {
            // Weekly collections
            weekly: [
                { binType: "brown", dayOfWeek: 4 }  // Brown (Food Waste) bins every Thursday
            ],
            // Alternating collections on Mondays (3 week rotation)
            biweekly: [
                { binType: "black", dayOfWeek: 1, startDate: "2025-03-17" }, // Non-recyclable waste
                { binType: "blue", dayOfWeek: 1, startDate: "2025-03-24" }   // Alternates between paper/card and plastic/cans
            ],
            // Bi-weekly collections on Wednesdays (Garden waste)
            biweekly: [
                { binType: "green", dayOfWeek: 3, startDate: "2025-03-19" }  // Garden waste
            ],
            // Special collections
            special: [
                { date: "2025-12-27", bins: ["brown"] }, // Saturday collection
                { date: "2026-01-03", bins: ["brown"] }  // Saturday collection
            ]
        };
        
        // Generate schedule for 12 months
        const schedule = generateRecurringCollections(defaultConfig, new Date(), 12);
        
        // Write the default schedule to file
        fs.writeFileSync(filePath, JSON.stringify(schedule, null, 2), "utf8");
        console.log("Created default bin schedule with", Object.keys(schedule).length, "dates");
        
        this.binSchedule = schedule;
    },

    // Update the schedule from recurring config
    updateFromRecurringRules: function() {
        if (!this.config.recurring) {
            console.log("No recurring configuration found, skipping generation");
            return;
        }
        
        console.log("Generating schedule from recurring rules");
        const generatedSchedule = generateRecurringCollections(
            this.config.recurring, 
            new Date(), 
            this.config.scheduleMonths || 12
        );
        
        // Merge with any manually specified dates (manual overrides take precedence)
        if (this.config.manualSchedule) {
            Object.entries(this.config.manualSchedule).forEach(([date, bins]) => {
                generatedSchedule[date] = bins;
            });
        }
        
        this.binSchedule = generatedSchedule;
        
        // Save to file if configured to do so
        if (this.config.saveGeneratedSchedule) {
            const schedulePath = path.resolve(__dirname, "binSchedule.json");
            fs.writeFileSync(schedulePath, JSON.stringify(generatedSchedule, null, 2), "utf8");
            console.log("Saved generated schedule to binSchedule.json with", Object.keys(generatedSchedule).length, "dates");
        }
    },

    formatDate: function(date) {
        return formatDate(date);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log(`${this.name} received socket notification: ${notification}`);
        
        if (notification === "SET_CONFIG") {
            this.config = payload;
            console.log("Config received, updating schedule from recurring rules if configured");
            this.updateFromRecurringRules();
        }
        else if (notification === "GET_BIN_SCHEDULE") {
            console.log(`${this.name} sending bin schedule data`, Object.keys(this.binSchedule).length);
            this.sendSocketNotification("BIN_SCHEDULE_DATA", this.binSchedule);
        }
    }
});
