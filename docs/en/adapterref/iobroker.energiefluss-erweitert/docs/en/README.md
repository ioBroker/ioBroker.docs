---
chapters: {"pages":{"en/adapterref/iobroker.energiefluss-erweitert/README.md":{"title":{"en":"ioBroker.energiefluss-erweitert"},"content":"en/adapterref/iobroker.energiefluss-erweitert/README.md"},"en/adapterref/iobroker.energiefluss-erweitert/docs/en/README.md":{"title":{"en":"⚡ Energy Flow Workspace – Feature Overview"},"content":"en/adapterref/iobroker.energiefluss-erweitert/docs/en/README.md"}}}
---
# ⚡ Energy Flow Workspace – Feature Overview

## 🌐 General
- [x] Configuration via web interface instead of ioBroker
- [x] Freely adjustable workspace width and height
- [x] Default values can be specified for each element so they don't have to be changed individually every time
- [x] All data point displays can be configured individually:
  - Source can be W or kW
  - Conversion from W to kW is possible
  - Unit is selected per element
  - Each data source can have its own threshold value
  - Number of decimal places is selectable (0, 1, 2)
- [x] Users can add an unlimited number of data points via the object browser to be used in the adapter
- [x] Custom CSS styles can be integrated for the entire workspace
- [x] Reminder notification when leaving the page with unsaved changes
- [x] Current status is saved during element configuration, allowing it to be restored to its original state
- [x] All pages are responsive and run on PCs, tablets, and smartphones, including configuration support
- [x] The adapter uses faster ioBroker WebSockets, reacting about 10x faster while being 10x more resource-efficient in the browser
- [x] Various basic settings can be defined to preset colors, sizes, and shapes

---

## 📑 Views / Tabs
- [x] Creation of views/tabs is possible
- [x] Tabs can contain icons and text
- [x] Views/Tabs can be flexibly shown or hidden

---

## 🧩 Elements
- [x] **Unlimited** elements can be placed on the workspace (texts, data points, rectangles, circles, icons, etc.)
- [x] Size, position, color, shadow, and transparency are customizable
- [x] Positioning via mouse, keyboard, or coordinate input
- [x] Snap elements with the mouse to move multiple items together
- [x] Align elements relative to each other (center, right, left, top edge, bottom edge, vertical center)
- [x] Rectangles or circles can be assigned a data point and receive a fill color based on the value (percentage or absolute value):
  - **Percentage:** The element is filled proportionally based on the data point
  - **Max Value:** The element is filled proportionally based on a max value. Example: Max value 4000, data point value 3000 $\rightarrow 3000 / 4000 \times 100 = 75\%$
- [x] Web URLs can be linked to trigger actions on click/tap
  - Display options include overlay, new page (tab), or the same page
- [x] Elements can be duplicated
- [x] CSS classes can be assigned to different data point states: Active positive, Active negative, Inactive positive, and Inactive negative

---

## 📝 Texts
- [x] The last update time of the data point can be displayed (Relative to now, German timestamp, US timestamp)
- [x] Text alignment options available (right, center, left)
- [x] Data points delivering both positive and negative values can be displayed as positive even when negative

---

## 🎨 Icons
- [x] Icons from [Iconify](https://iconify.design/) can be integrated directly into the Energy Flow Workspace
- [x] Size, position, color, shadow, and transparency are customizable
- [x] Assign data point

---

## ✨ Animation
- [x] Customizable (particle color, line color)
- [x] Positive or negative data point value
- [x] Threshold value support
- [x] Speed or particle count can be adjusted based on the load
- [x] Bi-directional lines possible (reverses animation direction when switching from positive to negative)

---

## 🔗 Connections
- [x] Elements (circle or rectangle) can be freely connected to each other. Supports **Element Mode** and **Connection Point Mode**:
  - **Element:** The line automatically docks to the nearest suitable entry point and moves dynamically when the element is repositioned.
  - **Connection Point:** The line is assigned to one of 12 available fixed entry points and maintains it even when the element moves.
- [x] Any line can be reconnected even if settings were already applied to it

---

## 🧮 Calculations
- [x] Battery runtime calculation (charging & discharging) can be computed via the source