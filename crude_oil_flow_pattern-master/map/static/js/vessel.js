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
d3.csv("./cities_lat_lng.csv", function(error, latlng) {
    if (error) return console.warn(error);
  
    console.log(latlng);
  
    // log a list of cities
    var cityNames = latlng.map(data => data.city);
    var cityLat = latlng.map(data => data.lat);
    var cityLng = latlng.map(data => data.lng);
    console.log("names", names);
  
    // Cast each hours value in tvData as a number using the unary + operator
    // tvData.forEach(function(data) {
    //   data.hours = +data.hours;
    //   console.log("Name:", data.name);
    //   console.log("Hours:", data.hours);
    // });
  });