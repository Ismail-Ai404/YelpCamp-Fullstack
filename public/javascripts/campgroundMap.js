/** @format */

// /** @format */

document.addEventListener("DOMContentLoaded", function () {
     const map = L.map("campgroundMap").setView([23.8, 90.4], 6);

     // Back to the reliable CARTO dark map theme
     L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
               attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
     ).addTo(map);

     // Define the styling for our simple circle markers
     const markerOptions = {
          radius: 6,
          fillColor: "#1E90FF", // A bright, vibrant blue
          color: "#FFFFFF", // The border color (white)
          weight: 1, // The border width in pixels
          opacity: 1,
          stroke: true, // Whether to draw a stroke around the shape

          fillOpacity: 0.8, // How transparent the fill is
     };

     const markers = L.markerClusterGroup();

     campgrounds.forEach((camp) => {
          if (camp.geometry && camp.geometry.coordinates) {
               const lat = camp.geometry.coordinates[1];
               const lng = camp.geometry.coordinates[0];
               const title = camp.title;
               const description = camp.description.substring(0, 100) + "...";

               // ---- CHANGE IS HERE ----
               // We create a circleMarker instead of a standard marker
               const marker = L.circleMarker([lat, lng], markerOptions)
                    .bindPopup(
                         `<strong><a href="/campgrounds/${
                              camp._id
                         }">${title}</a></strong><br>${description.substring(
                              0,
                              50
                         )}...`
                    )
                    .addTo(markers);
               // ---- END OF CHANGE ----
          }
     });

     map.addLayer(markers);
});
// /** @format */

// document.addEventListener("DOMContentLoaded", function () {
//      // ---- START OF MAPTILER CHANGES ----

//      // 1. Paste your MapTiler API Key into the mapToken variable

//      // Make sure to check if the token has been added
//      if (!mapToken) {
//           alert(
//                "Please add your MapTiler API key to the mapToken variable in the script to see the map!"
//           );
//      }

//      const map = L.map("campgroundMap").setView([23.8, 90.4], 6);

//      // 2. Use the MapTiler "Data Visualization" (dark) theme
//      // The style ID is part of the URL itself
//      const styleId = "dataviz-dark";
//      L.tileLayer(
//           // The variable in the URL is now mapToken
//           `https://api.maptiler.com/maps/${styleId}/{z}/{x}/{y}.png?key=${mapToken}`,
//           {
//                attribution:
//                     '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//                tileSize: 512,
//                zoomOffset: -1,
//           }
//      ).addTo(map);

//      // ---- END OF MAPTILER CHANGES ----

//      // Define the styling for our simple circle markers
//      const markerOptions = {
//           radius: 6,
//           fillColor: "#1E90FF", // A bright, vibrant blue
//           color: "#FFFFFF", // The border color (white)
//           weight: 1, // The border width in pixels
//           opacity: 1,
//           fillOpacity: 0.8, // How transparent the fill is
//      };

//      const markers = L.markerClusterGroup();

//      campgrounds.forEach((camp) => {
//           if (camp.geometry && camp.geometry.coordinates) {
//                const lat = camp.geometry.coordinates[1];
//                const lng = camp.geometry.coordinates[0];
//                const title = camp.title;
//                const description = camp.description.substring(0, 100) + "...";

//                const marker = L.circleMarker([lat, lng], markerOptions)
//                     .bindPopup(`<strong>${title}</strong><br>${description}`)
//                     .addTo(markers);
//           }
//      });

//      map.addLayer(markers);
// });
