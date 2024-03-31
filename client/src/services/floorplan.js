import jsonData from '../data/floorplanData.json';
console.log(jsonData);

var floorImageUrl = 'https://static.dezeen.com/uploads/2019/05/synchroon-office-space-encounters-interiors-utrecht-netherlands_dezeen_floor-plan.jpg';



function getImageDimensions() {
    var img = new Image();
    img.src = floorImageUrl;
    img.onload = function () {
        // Once the image has loaded, you can access its width and height
        console.log('Image width:', img.width);
        console.log('Image height:', img.height);
    };
    return { height: img.height, width: img.width }
};

var xscale = d3.scale.linear()
    .domain([0, 50.0])
    .range([0, 1361]),
    yscale = d3.scale.linear()
        .domain([0, 33.79])
        .range([0, 648]),
// var xscale = d3.scale.linear()
//     .domain([0, 50.0])
//     .range([0, getImageDimensions().width/1.9]),
//     yscale = d3.scale.linear()
//         .domain([0, 33.79])
//         .range([0, getImageDimensions().height/1.9]),
    map = d3.floorplan().xScale(xscale).yScale(yscale),
    imagelayer = d3.floorplan.imagelayer(),
    heatmap = d3.floorplan.heatmap(),
    vectorfield = d3.floorplan.vectorfield(),
    pathplot = d3.floorplan.pathplot(),
    overlays = d3.floorplan.overlays().editMode(false),
    mapdata = {};

mapdata[imagelayer.id()] = [{
    url: floorImageUrl,
    x: 0,
    y: 0,
    height: 33.79,
    width: 50
}];

// Function to generate the different layers
map.addLayer(imagelayer)
    .addLayer(heatmap)
    .addLayer(vectorfield)
    .addLayer(pathplot)
    .addLayer(overlays);

var loadData = function (data) {
    mapdata[heatmap.id()] = data.heatmap;
    mapdata[overlays.id()] = data.overlays;
    mapdata[vectorfield.id()] = data.vectorfield;
    mapdata[pathplot.id()] = data.pathplot;

    // TODO: add variables for image size
    d3.select("#demo").append("svg")
        .attr("height", 648).attr("width", 1361)
        .datum(mapdata).call(map);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // Function to start point selection
    var startPointSelection = function () {
        var selectedPoints = [];
        var maxPoints = 4;
        var svg = d3.select("#demo svg"); // Select the SVG

        // Function to draw a circle at a given point
        var drawCircle = function (point) {
            svg.append("circle")
                .attr("cx", point[0])
                .attr("cy", point[1])
                .attr("r", 5) // Radius of the circle
                .attr("fill", "red"); // Color of the circle
        };

        // Function to draw a line between two points
        var drawLine = function (point1, point2) {
            svg.append("line")
                .attr("x1", point1[0])
                .attr("y1", point1[1])
                .attr("x2", point2[0])
                .attr("y2", point2[1])
                .attr("stroke", "red") // Color of the line
                .attr("stroke-width", 2); // Width of the line
        };

        d3.select("#demo svg").on("click", function () {
            if (selectedPoints.length < maxPoints) {
                // Calculate the point's coordinates on the image
                var imagePointX = d3.event.pageX //- d3.event.offsetX;

                var imagePointY = d3.event.pageY //- d3.event.offsetY;
                var point = [imagePointX, imagePointY];
                selectedPoints.push(point);
                console.log("Selected point on image:", point);

                // Draw a red dot at the selected point
                drawCircle(point);

                // If there are at least two points, draw a line connecting the last two points
                if (selectedPoints.length >= 2) {
                    var lastPoint = selectedPoints[selectedPoints.length - 1];
                    var secondLastPoint = selectedPoints[selectedPoints.length - 2];
                    drawLine(secondLastPoint, lastPoint);
                }

                if (selectedPoints.length === maxPoints) {
                    console.log("All points selected:", selectedPoints);
                    // Stop listening for clicks after 4 points have been selected
                    d3.select(this).on("click", null);
                }
            }
        });
    };

    // Attach the startPointSelection function to the button click event
    d3.select("#startSelection").on("click", startPointSelection);


    // Existing event listeners for mouseover and click on polygons and overlay canvas

    // Hover tooltip on polygon layer
    d3.select('.polygon')
        .on("mouseover", function (d) {
            div.transition()
                .duration(0)
                .style("opacity", .9);
            div.html("Price: <br>" + "<br/>Volume: ")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            console.log("event", (d3.event))
        })
        .on("mouseout", function (d) {
            div.transition()
                .duration(0)
                .style("opacity", 0);
        })

    // Click event listener for debugging
    d3.select('.overlay-canvas')
        .on("click", function (d) {
            console.log("page xpos:", (d3.event.pageX), "  ypos:", (d3.event.pageY));
            console.log("layer xpos:", (d3.event.layerX), "  ypos:", (d3.event.layerY));
            console.log("offset xpos:", (d3.event.offsetX), "  ypos:", (d3.event.offsetY));
            console.log("x:", (d3.event.x), "  y:", (d3.event.y));

        });

};

loadData(jsonData);
