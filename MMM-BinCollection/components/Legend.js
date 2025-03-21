
/* Legend component for the bin collection calendar */

/**
 * Create a DOM element for the bin legend
 * @param {object} binConfig - Configuration for bin types
 * @returns {HTMLElement} DOM element for the legend
 */
module.exports = function(binConfig) {
    const legend = document.createElement("div");
    legend.className = "bin-legend";
    
    const legendTitle = document.createElement("div");
    legendTitle.textContent = "Legend";
    legendTitle.className = "legend-title";
    legend.appendChild(legendTitle);
    
    const legendItems = document.createElement("div");
    legendItems.className = "legend-items";
    
    Object.entries(binConfig).forEach(([binType, binInfo]) => {
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
    return legend;
};
