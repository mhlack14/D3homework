// @TODO: YOUR CODE HERE!
//Homework D3


//code for reading in data ("assets/data/data")
console.log("test if it works")

data = d3.csv("assets/data/data.csv")
console.log(data)


console.log("test")

var svgWidth = 960;
var svgHeight = 620;

var margin = {
  top: 20,
  right: 40,
  bottom: 200,
  left: 100
};

//create variables calculating chart's height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight;
console.log(width)
console.log(height)


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");
  
  console.log(svg)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Import Data
d3.csv("assets/data/data.csv").then(function(stateData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d.healthcare) * .8, 
	   d3.max(stateData, d => d.healthcare) * 1.2
	   ])
      .range([0, width]);
console.log(d3.max(stateData, d => d.healthcare))
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.poverty)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height-margin.bottom})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
								.data(stateData)
								.enter()
								.append("circle")
								.attr("cx", d => 
								
								{ console.log(xLinearScale(d.healthcare))
								return xLinearScale(d.healthcare)
								
								})
								.attr("cy", d => yLinearScale(d.poverty))
								.attr("r", "15")
								.attr("fill", "red")
								.attr("opacity", ".6");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip =d3.tip()
      .attr("class", "d3-tip")
      .offset([40,-60])
      .html(function(d) {
        return (`${d.state}<br>Health Care: ${d.healthcare}<br>poverty: ${d.poverty}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    svg.call(toolTip);
	console.log("Test Server")

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 30)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percentage lacks healthcare");
	  
	  
	  chartGroup.append("text")
      .attr("transform", `translate(${width / 4})`)
	  .attr("y", +450)
      .attr("class", "axisText")
      .text("Poverty");

	 }).catch(function(error) {
    console.log(error);
  });