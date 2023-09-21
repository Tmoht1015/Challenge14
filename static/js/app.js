// URL for the JSON data
const jsonDataUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Initialize Visualization
function initialize() {

    // dropdownMenu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch JSON data
    d3.json(jsonDataUrl).then((data) => {
        console.log(`Data: ${data}`);

        // Create an array for iterating through
        let sampleNames = data.names;

        // Iterate through and append options
        sampleNames.forEach((sampleName) => {
            dropdownMenu.append("option").text(sampleName).property("value", sampleName);
        });

        // Assign the first name to selectedName variable
        let selectedName = sampleNames[0];

        // Call functions to create demographic panel, bar chart, bubble chart, and gauge chart
        createDemographicPanel(selectedName);
        createBarChart(selectedName);
        createBubbleChart(selectedName);
        createGaugeChart(selectedName);
    });
}

// Create the demographic panel
function createDemographicPanel(selectedSampleName) {
    // Fetch JSON data
    d3.json(jsonDataUrl).then((data) => {
        console.log(`Data: ${data}`);

        // Array - metadata objects
        let metadata = data.metadata;

        // Filter data where id matches the selected sample name after converting type 
        let filteredMetadata = metadata.filter((meta) => meta.id == selectedSampleName);

        // Assign the first object to metaDataObj variable
        let metaDataObj = filteredMetadata[0]

        // Clear the child elements in the div with id "sample-metadata"
        d3.select("#sample-metadata").html("");

        // Convert metaDataObj into an array of key-value pairs
        let metaDataEntries = Object.entries(metaDataObj);

        // Iterate through the entries array and add a h5 child element for each key-value pair to the div with id "sample-metadata"
        metaDataEntries.forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
        console.log(metaDataEntries);
    });
}

// Create the bar chart
function createBarChart(selectedSampleName) {
    // Fetch JSON data
    d3.json(jsonDataUrl).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id matches the selected sample name
        let filteredSamples = samples.filter((sample) => sample.id === selectedSampleName);

        // Assign the first object to sampleObj variable
        let sampleObj = filteredSamples[0];

        // Trace for the horizontal bar chart
        let barChartTrace = [{
            // Slice the top 10 OTUs
            x: sampleObj.sample_values.slice(0, 10).reverse(),
            y: sampleObj.otu_ids.slice(0, 10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: sampleObj.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(166,172,237)"
            },
            orientation: "h"
        }];

        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", barChartTrace);
    });
}

// bubble chart
function createBubbleChart(selectedSampleName) {
    // Fetch JSON data
    d3.json(jsonDataUrl).then((data) => {

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id matches the selected sample name
        let filteredSamples = samples.filter((sample) => sample.id === selectedSampleName);

        // Assign the first object to sampleObj variable
        let sampleObj = filteredSamples[0];

        // Trace for the bubble chart
        let bubbleChartTrace = [{
            x: sampleObj.otu_ids,
            y: sampleObj.sample_values,
            text: sampleObj.otu_labels,
            mode: "markers",
            marker: {
                size: sampleObj.sample_values,
                color: sampleObj.otu_ids,
                colorscale: "Sunset"
            }
        }];

        // Layout with x-axis legend
        let bubbleChartLayout = {
            xaxis: { title: "OTU ID" }
        };

        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", bubbleChartTrace, bubbleChartLayout);
    });
}

// Create the gauge chart
function createGaugeChart(selectedSampleName) {
    // Fetch JSON data
    d3.json(jsonDataUrl).then((data) => {
        // An array of metadata objects
        let metadata = data.metadata;

        // Filter data where id matches the selected sample name after converting their types 
        let filteredMetadata = metadata.filter((meta) => meta.id == selectedSampleName);

        // Assign the first object to metaDataObj variable
        let metaDataObj = filteredMetadata[0]

        // Trace for the gauge chart
        let gaugeChartTrace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: metaDataObj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 24 } },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
                bar: { color: "rgb(68,166,198)" },
                steps: [
                    { range: [0, 1], color: "rgb(233,245,248)" },
                    { range: [1, 2], color: "rgb(218,237,244)" },
                    { range: [2, 3], color: "rgb(203,230,239)" },
                    { range: [3, 4], color: "rgb(188,223,235)" },
                    { range: [4, 5], color: "rgb(173,216,230)" },
                    { range: [5, 6], color: "rgb(158,209,225)" },
                    { range: [6, 7], color: "rgb(143,202,221)" },
                    { range: [7, 8], color: "rgb(128,195,216)" },
                    { range: [8, 9], color: "rgb(113,187,212)" },
                    { range: [9, 10], color: "rgb(98,180,207)" }
                ]
            }
        }];

        // Use Plotly to plot the data in a gauge chart
        Plotly.newPlot("gauge", gaugeChartTrace);
    });
}

// Function called when the option changes
function optionChanged(selectedSampleName) {
    createDemographicPanel(selectedSampleName);
    createBarChart(selectedSampleName);
    createBubbleChart(selectedSampleName);
    createGaugeChart(selectedSampleName)
}

// Initialize the visualization
initialize();
