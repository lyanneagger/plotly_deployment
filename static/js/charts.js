function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = sampleArray.filter(resultsObj => resultsObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var results = resultsArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = results.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = ids.map(object => "Otu " + object).slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }  
    ];

    // 9. Create the layout for the bar chart. 
     var barLayout = {
      title: {text: "Top 10 Bacteria Cultures Found"}
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}


// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // Create a variable that holds the samples array. 
    var sampleArray = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = sampleArray.filter(resultsObj => resultsObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var results = resultsArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = results.sample_values;

    // Create the yticks for the bar chart.
    var yticks = ids.map(object => "Otu " + object).slice(0,10).reverse();

    // Create the trace for the bar chart. 
    var barData = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }  
    ];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: {text: "Top 10 Bacteria Cultures Found"}
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {size: values, color: ids, colorscale: "YlGnBu"}
    }  
    ];  

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {text: "Bacteria Cultures Per Sample"},
      xaxis: {title: "OTU ID"},
      hovermode: "closest",
      margin: {l:25, r: 25, pad: 0}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}


// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = sampleArray.filter(resultsObj => resultsObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var results = resultsArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = results.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washingFreq = result.wfreq

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = ids.map(object => "Otu " + object).slice(0,10).reverse();

    // Create the trace for the bar chart. 
    var barData = [{
      x: values.slice(0,10).reverse(),
      y: yticks,
      text: labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }  
    ];
    // Create the layout for the bar chart. 
    var barLayout = {
      title: {text: "<b>Top 10 Bacteria Cultures Found<b>"}
    };

    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {size: values, color: ids, colorscale: "YlGnBu"}
    }  
    ]; 

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {text: "<b>Bacteria Cultures Per Sample<b>"},
      xaxis: {title: "OTU ID"},
      hovermode: "closest",
      margin: {l:25, r: 25, pad: 0}
    };

    // D2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: washingFreq,
      title: {text: "<b>Belly Button Washing Frequency</b> <br> Srubs Per Week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 10], dtick: "2"},
        steps: [
          {range: [0, 2], color: "rgb(25,25,112)"},
          {range: [2, 4], color: "rgb(0,0,205)"},
          {range: [4, 6], color: "rgb(65,105,225)"},
          {range: [6, 8], color: "rgb(135,206,250)"},
          {range: [8, 10], color: "rgb(240,248,255)"}
        ],
        bar: {color: "black"},
    }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  });
}