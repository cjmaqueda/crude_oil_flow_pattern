// Creating map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
    center: [29.6111,-95.0217],
    zoom: 3
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  }).addTo(myMap);

  // Convert cities_lat_lng.csv to json data for posting on map.

    // This isn't working - but maybe it could later?
    // var csv ='./cities_lat_lng.csv'
    // function csvJSON(csv){

    //     var lines=csv.split("\n");

    //     var result = [];

    //     var headers=lines[0].split(",");

    //     for(var i=1;i<lines.length;i++){

    //         var obj = {};
    //         var currentline=lines[i].split(",");

    //         for(var j=0;j<headers.length;j++){
    //             obj[headers[j]] = currentline[j];
    //         }

    //         result.push(obj);

    //     }

    //     //return result; //JavaScript object
    //     return JSON.stringify(result); //JSON
    // };
// Read in the csv file cities_lat_lng.csv (from classwork 16.2 ex 02)

// Load data from cities_lat_lng.csv

//This also is not working....

// d3.csv("./cities_lat_lng.csv", function(error, latlng) {
//     if (error) return console.warn(error);
  
//     console.log(latlng);
  
//     // log a list of cities
//     var cityNames = latlng.map(data => data.city);
//     var cityLat = latlng.map(data => data.lat);
//     var cityLng = latlng.map(data => data.lng);
//     console.log("names", names);
  
//     // Cast each hours value in tvData as a number using the unary + operator
//     // tvData.forEach(function(data) {
//     //   data.hours = +data.hours;
//     //   console.log("Name:", data.name);
//     //   console.log("Hours:", data.hours);
//     // });
//   });




// Define the dimensions of the visualization.
var margin = { top: 20, right: 20, bottom: 20, left: 20 },
  width = 960 - margin.left - margin.right,
  height = 476 - margin.top - margin.bottom;
// Create the SVG container for the visualization and
// define its dimensions.
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
// Within the main SVG container, add a group
// element (`<g>`) that can be transformed via
// a translation to account for the margins.
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left +
    "," + margin.top + ")");
// Define a variable that tracks which state is
// currently zoomed (if any) and a variable that
// indicates if the Voronoi diagram is visible.
var active = d3.select(null),
  voronoi = false;
// Set up an event handler to respond to the
// Voronoi checkbox.
d3.select("input[type=checkbox]").on("change", function () { toggle(); });
// Define the properties of the map projection.
var projection = d3.geo.albers()
  .rotate([96, 0])
  .center([-.6, 38.7])
  .parallels([29.5, 45.5])
  .scale(1070)
  .translate([width / 2, height / 2])
  .precision(.1);
// Define a function that returns the SVG
// path based on the projection. This
// function accepts, as input, a selection
// with an associated array of longitude
// and latitude values.
var path = d3.geo.path()
  .projection(projection);
// Retrieve the GeoJSON information for the US.
d3.json("us-states.json", function (map) {
  // Draw the map within the SVG container.
  // Each state is a separate SVG path.
  g.selectAll("path")
    .data(map.features)
    .enter().append("path")
    .attr("id", function (d) {
      return d.properties.abbreviation;
    })
    .attr("d", path)
    .attr("fill", "#cccccc")
    .attr("stroke", "#ffffff")
    .on("click", clicked);
  // Now retrieve the data to add to the map.
  d3.csv("clipper_and_lat_lng.csv", function (data) {
    // Create a function that will parse
    // the text date format in the CSV file
    // and return a proper JavaScript date.
    // Dates in the file look like, e.g.,
    //
    //      30-JAN-13 04:33:00
    //
    // Note that we're not considering time
    // zone information because we want to
    // use local time for any visualization.
    var formatDate = d3.time.format(
      "%d-%b-%y %H:%M:%S");
    // Only consider data points that have
    // latitude and longitude values. While
    // we're checking this condition, coerce
    // the CSV strings into data types that
    // we can work with directly.
    data = data.filter(function (d, i) {
      if (d.lat && d.lng) {
        // Convert the string date into
        // a real one.
        d.date = formatDate.parse(d.date);
        // Convert the strings for latitude
        // and longitude into numbers.
        d.lat = +d.lat;
        d.lng = +d.lng;
        // Convert the F scale string to
        // a number.
        // d.f_scale = +d.f_scale[2];
        // Calculate the position of the
        // point within the projection.
        d.position = projection([
          d.lng, d.lat
        ]);
        return true;
      }
    });
    //         // Compute the polygons for the Voronoi layout.
    //         // Before we can use D3's Voronoi functions, we
    //         // have to filter out any duplicate positions.
    //         var positions = data.map(function(d) { return d.position;})
    //                             .reduce(function(positions, position) {
    //                                 if (!positions.some(function(p) {
    //                                     return position[0] === p[0] && position[1] === p[1];
    //                                 })) {
    //                                     positions.push(position);
    //                                 }
    //                                 return positions;
    //                             }, []);
    //         var polygons = d3.geom.voronoi(positions);
    //         // Now we can add the Voronoi polygons to the
    //         // graph. Initially they're invisible because
    //         // the stroke opacity is set to zero.
    //         g.selectAll(".cell")
    //             .data(polygons)
    //           .enter().append("path")
    //             .attr("class", "cell")
    //             .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
    //             .attr("stroke", "#007979")
    //             .attr("stroke-opacity", 0)
    //             .attr("fill", "none");
    //         // Draw circles on the map for each
    //         // data point.
    //         g.selectAll("circle")
    //             .data(data)
    //           .enter().append("circle")
    //             .attr("cx", function(d) { return d.position[0]; })
    //             .attr("cy", function(d) { return d.position[1]; })
    //             .attr("r", function(d)  { return 4 + d.f_scale; })
    //             .attr("stroke", "#dddddd")
    //             .attr("fill", "#ca0000")
    //             .attr("fill-opacity", "0.8");
    //     });
    // });
    // // Event handlers.
    // // Click on a state.
    // var clicked = function(d) {
    //     // If clicked on state is already active,
    //     // reset the map to its initial condition.
    //     if (active.node() === this) return reset();
    //     // Otherwise, remove the highlighting from
    //     // the currently active state.
    //     active.attr("fill", "#cccccc");
    //     // And add highlighting to the newly
    //     // active state.
    //     active = d3.select(this)
    //         .attr("fill", "#F77B15");
    //     // Calculate the bounds for the map that
    //     // will contain the newly active state.
    //     var bounds = path.bounds(d),
    //         dx = bounds[1][0] - bounds[0][0],
    //         dy = bounds[1][1] - bounds[0][1],
    //         x = (bounds[0][0] + bounds[1][0]) / 2,
    //         y = (bounds[0][1] + bounds[1][1]) / 2,
    //         scale = .9 / Math.max(dx / width, dy / height),
    //         translate = [width / 2 - scale * x, height / 2 - scale * y];
    //     // Transition to the newly active state
    //     // by translation and scaling.
    //     g.transition()
    //         .duration(750)
    //         .style("stroke-width", 1.5 / scale + "px")
    //         .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    //     // To keep the circles from changing
    //     // size, also transition their radii.
    //     g.selectAll("circle")
    //         .transition()
    //         .duration(750)
    //         .attr("r", function(d)  { return (4 + d.f_scale)/scale; });
    // };
    // Reset to initial condition.
    var reset = function () {
      // Remove highlighting from active state
      // and note that no state is now active.
      active.attr("fill", "#cccccc");
      active = d3.select(null);
      // Remove the translation and scale
      // transform with a transition.
      g.transition()
        .duration(750)
        .style("stroke-width", "1px")
        .attr("transform", "");
      // Also keep the circles the same
      // size by transitioning their
      // radii at the same time.
      g.selectAll("circle")
        .transition()
        .duration(750)
        .attr("r", function (d) { return (4 + d.f_scale); });
    };

