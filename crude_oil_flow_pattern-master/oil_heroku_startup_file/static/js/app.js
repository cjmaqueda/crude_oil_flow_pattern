// Plot the default route once the page loads
var defaultURL = "/emoji_char";
d3.json(defaultURL).then(function(data) {
  var data = [data];
  var layout = { margin: { t: 30, b: 150 } };
  Plotly.plot("bar", data, layout);
});

// Update the plot with new data
function updatePlotly(newdata) {
  var update = {
    x: [newdata.x],
    y: [newdata.y]
  };
  Plotly.restyle("bar", update);
}

// Get new data whenever the dropdown selection changes
function getData(route) {
  d3.json(`/${route}`).then(function(data) {
    updatePlotly(data);
  });
}

// handler function to execute when the dropdown is changed.
function handleChange(event){
  var newData = d3.event.target.value;
  getData(newData);
}

// listening for when dropdown is changed.
d3.select("#selDataset").on("change", handleChange);