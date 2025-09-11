/** @format */

// public/javascripts/showMapLeaflet.js

document.addEventListener("DOMContentLoaded", function () {
     // Ensure Leaflet loaded
     if (typeof L === "undefined") {
          console.error("Leaflet is not loaded.");
          return;
     }
     console.log("campgroundCoords:", campgroundCoords); // <-- Add this line

     // Ensure mapToken defined
     if (typeof mapToken === "undefined" || !mapToken) {
          console.error("mapToken is undefined or empty.");
          return;
     }
     // const campgroundCoords = campground.geometry.coordinates;
     // console.log(campgroundCoords);
     // Placeholder coordinates, replace later when you have real lat/lng
     const placeholderLat = campgroundCoords[1]; // latitude
     const placeholderLng = campgroundCoords[0]; // longitude
     const zoomLevel = 10;

     // Initialize map
     const map = L.map("map").setView(
          [placeholderLat, placeholderLng],
          zoomLevel
     );

     // Add MapTiler tile layer
     // L.tileLayer(
     //      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${mapToken}`,
     //      {
     //           attribution:
     //                '&copy; <a href="https://www.maptiler.com/">MapTiler</a> ' +
     //                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
     //           maxZoom: 19,
     //      }
     // ).addTo(map);

     // L.tileLayer(
     //      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
     //      {
     //           attribution:
     //                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
     //           subdomains: "abcd",
     //           maxZoom: 19,
     //      }
     // ).addTo(map);

     // Load OpenStreetMap tiles directly
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
               '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
     }).addTo(map);

     // Add marker with campground info
     const popupContent = `
          <div style="font-family: Arial, sans-serif; line-height: 1.4;">
               <strong style="font-size: 1.2em;">${campground.title}</strong><br>
               <span>${campground.location}</span>
          </div>
     `;

     // Add marker at placeholder
     L.marker([placeholderLat, placeholderLng])
          .addTo(map)
          .bindPopup(popupContent)
          .openPopup();
});
