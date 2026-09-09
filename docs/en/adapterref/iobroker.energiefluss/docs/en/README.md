---
chapters: {"pages":{"en/adapterref/iobroker.energiefluss/README.md":{"title":{"en":"ioBroker.energiefluss"},"content":"en/adapterref/iobroker.energiefluss/README.md"},"en/adapterref/iobroker.energiefluss/docs/en/README.md":{"title":{"en":"ioBroker.energiefluss"},"content":"en/adapterref/iobroker.energiefluss/docs/en/README.md"}}}
---
![Logo](/admin/energiefluss.png)

# ioBroker.energiefluss

## Functions
**Design:**
- change the color of each item
- Elements can be selected (circle or rectangle)
- define a timer for swapping values and descriptions inside the element
- Texts inside the elements can be modified (&lt;br&gt; works as line-break)
- %-texts can have different colors as well
- define different colors for each line
- lines can be hidden, if no animation is active on the line
- define different colors for each animation on the line
- change thickness of the elments and lines
- fill the elements with different colors (elements with percent values can be filled according to their percent value; if no color is selected, the element is transparent)
- show/hide shadows of the elements
- shadow for values, descriptions and icons can be defined
- change radius of the circles
- change width, height and corner rounds of the rectangle
- define your own color and opacity for the shadows (rgba supported)
- change fontfaces of the values and texts (own fonts can be imported)
- Realign texts, values, icons, percentages and battery text (higher or lower)
- change the font size for label, values and %-texts
- Transparency for icon, line, text, value, percent-value and remaining battery text possible
- define a color for the the car icon, if its charging
- Some Values can have different colors, if their value is below a threshold (consumption, production, grid and battery)
- Battery icon can be animated while charging or discharging
- number of animation dots, their distance between each other, length, duration, style and width selectable
- automatic speed of animation can be used to easily identify the highest consumption within custom elements 1 to 11 
- Display the remaining time of charging your battery (depends on percent and capacity)
- Slim-Design possible - reduces distance to battery element

**Technical:**
- define Datapoints for each element (add a second datapoint to production, additional production, consumption and grid as display for e.g. daily summary) 
- 3 solar production elements possible (if 3 are configured, Slim-Design will be deactivated)
- also for island systems (line from production to grid can be deactivated)
- show battery percent inside car or battery element
- use different states for feeding into or consuming from the grid
- reverse settings if your values are negative (for consumption, feeding the grid, charging-/discharging the battery)
- use positive or negative values for consumption
- calculcate your consumption via production and grid-feed-in, if you do not have a powermeter
- use different states for your battery
- add 10 own elements for a consuming device with different text, values and icon (2 elements can be configured as additional car-charge, 2 elements work as balcony power plant)
- convert all values from W into kW
- All values can be in W or kW. The adapter converts the values appropriately
- Choose, how many decimal places you want to display (0, 1, 2) - for values and battery charging
- choose the unit (freetext)
- Subtract the consumption of the car and additional equipment from the consumption in the house (selectable)
- All objects can be choosen via the object-browser
- define a threshold, to display only values above

## Implementation
Display is possible via the instance link. This can then also be inserted into an iFrame or HTML widget.

## Custom Elements
![Description](/docs/custom_elements.png)

## Icons
Please have a look into the Wiki