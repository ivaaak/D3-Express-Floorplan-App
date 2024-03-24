var jsonData = {
    "heatmap": {
        "binSize": 1.5, //size of the desks
        "units": "\u00B0C",
        "map": [
            { "x": 2, "y": 22, "value": 22 },
            { "x": 2, "y": 27, "value": 20.2 },
            { "x": 7, "y": 22, "value": 11.7 },
            { "x": 7, "y": 27, "value": 9.7 },
            { "x": 12, "y": 22, "value": 20.5 },
            { "x": 12, "y": 27, "value": 39.3 },
            {
                "value": 19.9,
                "points": [
                    { "x": 1.2, "y": 11.0 },
                    { "x": 8.5, "y": 2.0 },
                    { "x": 32, "y": 2.0 },
                    { "x": 31.5, "y": 19.5 },
                    { "x": 1.2, "y": 20.5 }
                ]
            }
        ]
    },
    "overlays": {
        "polygons": [
            {
                "id": "p1", "name": "kitchen",
                "points": [
                    { "x": 1.2, "y": 11.0 },
                    { "x": 8.5, "y": 2.0 },
                    { "x": 32, "y": 2.0 },
                    { "x": 32, "y": 20.5 },
                    { "x": 1.2, "y": 20.5 }
                ]
            },
            {
                "id": "p2", "name": "desk2",
                "points": [
                    { "x": 12, "y": 22 },
                    { "x": 12, "y": 24 },
                    { "x": 16, "y": 24 },
                    { "x": 16, "y": 22 },
                ]
            },
            {
                "id": "p3", "name": "desk3",
                "points": [
                    { "x": 2, "y": 22 },
                    { "x": 2, "y": 24 },
                    { "x": 6, "y": 24 },
                    { "x": 6, "y": 22 },
                ]
            },
            {
                "id": "p4", "name": "desk4",
                "points": [
                    { "x": 22, "y": 22 },
                    { "x": 22, "y": 24 },
                    { "x": 26, "y": 24 },
                    { "x": 26, "y": 22 },
                ]
            },
            {
                "id": "p5", "name": "desk5",
                "points": [
                    { "x": 32, "y": 22 },
                    { "x": 32, "y": 24 },
                    { "x": 36, "y": 24 },
                    { "x": 36, "y": 22 },
                ]
            },
        ]
    }
};

var xscale = d3.scale.linear()
    .domain([0, 50.0])
    .range([0, 1361]),
    yscale = d3.scale.linear()
        .domain([0, 33.79])
        .range([0, 648]),
    map = d3.floorplan().xScale(xscale).yScale(yscale),
    imagelayer = d3.floorplan.imagelayer(),
    heatmap = d3.floorplan.heatmap(),
    vectorfield = d3.floorplan.vectorfield(),
    pathplot = d3.floorplan.pathplot(),
    overlays = d3.floorplan.overlays().editMode(false),
    mapdata = {};

mapdata[imagelayer.id()] = [{
    url: 'https://static.dezeen.com/uploads/2019/05/synchroon-office-space-encounters-interiors-utrecht-netherlands_dezeen_floor-plan.jpg',
    x: 0,
    y: 0,
    height: 33.79,
    width: 50.0
}];

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

    // add variables for image size
    d3.select("#demo").append("svg")
        .attr("height", 648).attr("width", 1361)
        .datum(mapdata).call(map);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // debugger;  
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

    d3.select('.overlay-canvas')
        .on("click", function (d) {
            console.log("page xpos:", (d3.event.pageX), "  ypos:", (d3.event.pageY));
            console.log("layer xpos:", (d3.event.layerX), "  ypos:", (d3.event.layerY));
            console.log("offset xpos:", (d3.event.offsetX), "  ypos:", (d3.event.offsetY));
            console.log("x:", (d3.event.x), "  y:", (d3.event.y));

        });

};

loadData(jsonData);
