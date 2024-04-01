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

    // // Click event listener for debugging
    // d3.select('.overlay-canvas')
    //     .on("click", function (d) {
    //         console.log("page xpos:", (d3.event.pageX), "  ypos:", (d3.event.pageY));
    //         console.log("layer xpos:", (d3.event.layerX), "  ypos:", (d3.event.layerY));
    //         console.log("offset xpos:", (d3.event.offsetX), "  ypos:", (d3.event.offsetY));
    //         console.log("x:", (d3.event.x), "  y:", (d3.event.y));
    //     });

};

loadData(jsonData);
