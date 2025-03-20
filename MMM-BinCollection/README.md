
# MMM-BinCollection

A MagicMirror² module that displays your bin/trash collection schedule in a weekly calendar view.

## Screenshots

[Screenshot would be here]

## Installation

1. Navigate to your MagicMirror modules folder:
```bash
cd ~/MagicMirror/modules/
```

2. Clone this repository:
```bash
git clone https://github.com/your-username/MMM-BinCollection.git
```

3. Install the required dependencies:
```bash
cd MMM-BinCollection
npm install
```

4. Add the module to your `config/config.js` file:

```javascript
{
    module: "MMM-BinCollection",
    position: "top_right",
    config: {
        // See configuration options below
    }
}
```

## Configuration Options

| Option | Description | Default |
| ------ | ----------- | ------- |
| `updateInterval` | How often to update the calendar (in milliseconds) | `86400000` (1 day) |
| `animationSpeed` | Speed of the update animation (in milliseconds) | `1000` |
| `weekStartsOn` | First day of the week (0 = Sunday, 1 = Monday, etc.) | `1` (Monday) |
| `showLegend` | Whether to show the legend at the bottom | `true` |
| `showWeekends` | Whether to show weekend days | `false` |
| `bins` | Configuration for bin types | See example below |

### Example Configuration

```javascript
{
    module: "MMM-BinCollection",
    position: "top_right",
    config: {
        updateInterval: 12 * 60 * 60 * 1000, // update every 12 hours
        weekStartsOn: 0, // Start week on Sunday
        showLegend: true,
        showWeekends: true,
        bins: {
            black: { label: "General Waste" },
            blue: { label: "Recycling" },
            green: { label: "Garden Waste" },
            brown: { label: "Food Waste" }
        }
    }
}
```

## Customizing Your Bin Schedule

The bin collection schedule is stored in `binSchedule.json`. You can edit this file directly with your actual collection dates.

The format is:
```json
{
  "YYYY-MM-DD": ["binType1", "binType2"],
  "2025-04-10": ["brown"],
  "2025-04-14": ["black", "green"]
}
```

Where `binType` must match one of the types defined in your configuration.

## Updating the Schedule

You can manually edit the `binSchedule.json` file, or create a script to generate it based on your local council's calendar feed.

## Customizing Appearance

You can override the default styles by adding CSS rules to your custom.css file in the MagicMirror config folder.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
