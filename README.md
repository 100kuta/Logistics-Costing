# 🚚 Logistics Costing & Routing Machine

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Leaflet](https://img.shields.io/badge/Leaflet-v1.9-green.svg)](https://leafletjs.com/)
[![OSRM](https://img.shields.io/badge/Routing-OSRM%20%7C%20Leaflet%20Routing%20Machine-blue.svg)](http://project-osrm.org/)
[![GeoJSON](https://img.shields.io/badge/Data-GeoJSON-orange.svg)](https://geojson.org/)
[![Focus](https://img.shields.io/badge/Region-Jos%2C%20Nigeria-darkgreen.svg)]()

> An interactive Web GIS routing engine and dynamic transport tariff calculator designed for logistics fleets, dispatch couriers, and delivery operators in **Jos, Plateau State, Nigeria**. The application combines OpenStreetMap road networks, Google Hybrid imagery, and dynamic turn-by-turn routing to automatically compute travel distances and price delivery journeys in Nigerian Naira (₦).

---

## 📌 Problem & Purpose

Calculating fair, transparent, and accurate delivery tariffs across metropolitan and peri-urban road networks requires real-time road-distance awareness. Static straight-line (Euclidean) distances underestimate travel distance and fuel consumption due to road geometry, terrain, and one-way traffic restrictions.

This project solves that challenge by providing:
1. **Interactive Waypoint Placement:** Dispatchers or customers select origin and destination points directly on the interactive map.
2. **Turn-by-Turn Routing Engine:** Computes optimal driving paths along actual road networks using the OSRM routing machine.
3. **Automated Tariff Pricing Engine:** Automatically extracts the verified route distance and calculates dynamic trip costs in Nigerian Naira based on baseline logistics operating expenses.

---

## 🛠️ Pricing Logic & Formula

The application uses an enterprise distance-tariff algorithm with round-up increments:

$$\text{Price (₦)} = \left\lceil \frac{(\text{Distance}_{\text{km}} \times 100) + 500}{100} \right\rceil \times 100$$

- **Base Dispatch Fee:** ₦500 (covers order dispatch, pickup, and initial handling).
- **Distance Variable:** ₦100 per kilometer traveled along road corridors.
- **Rounding:** Rounded up to the nearest ₦100 increment for cash and POS transaction simplicity.

*Example:* A trip of 8.4 km computes to $(8.4 \times 100) + 500 = ₦1,340$, which rounds up to **₦1,400**.

---

## 🗺️ Key Features

- **Multi-Basemap Switcher:** Seamlessly switch between OpenStreetMap Standard, Humanitarian OpenStreetMap (HOT), and Google Hybrid Satellite layers.
- **Draggable Waypoints:** Interactively drag origin and destination pins across the map with instantaneous route and price recalculation.
- **Thematic GeoJSON Integration:** Overlay predefined commercial price-points and drop-off hubs from `price_points.geojson`.
- **Lightweight & Dependency-Free:** Built with pure client-side web technologies; runs instantly in any modern web browser without requiring a backend server.

---

## 📂 Project Structure

```text
Logistics-Costing/
├── index.html            # Main web application entry point with interactive UI
├── newidex.html          # Extended layout and alternate UI design
├── script.js             # Leaflet map configuration, routing controller, and tariff engine
├── style.css             # Responsive styling and floating price display panel
├── price_points.geojson  # GeoJSON spatial layer containing distribution hubs and reference coordinates
├── price_points.qmd      # Quarto document analyzing point distribution and logistics costing data
└── README.md             # Project documentation and usage guide
```

---

## 🚀 Running the Project

Because the application is pure client-side HTML/JavaScript, running it is effortless:

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it directly in Google Chrome, Firefox, Safari, or Microsoft Edge.

### Option 2: Local HTTP Server (Recommended)
Using Python's built-in HTTP server:
```bash
# Clone the repository
git clone https://github.com/100kuta/Logistics-Costing.git
cd Logistics-Costing

# Start a local web server
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 📜 Attribution & Data Sources

- **Map Data:** © [OpenStreetMap](https://www.openstreetmap.org/) contributors, [Humanitarian OpenStreetMap Team](https://www.hotosm.org/).
- **Routing Engine:** [Leaflet Routing Machine](http://www.liedman.net/leaflet-routing-machine/) & OSRM.
- **Satellite Tiles:** Google Map Hybrid Imagery.
