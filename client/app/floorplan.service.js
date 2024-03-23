(function(){
  "use strict";

  var w = 720;
  var h = 487;

  var xscale = d3.scale.linear()
           .domain([0,50.0])
           .range([0, w]);
           
  var yscale = d3.scale.linear()
           .domain([0,33.79])
           .range([0, h]);

  var map = d3.floorplan().xScale(xscale).yScale(yscale);
  var imagelayer = d3.floorplan.imagelayer();
  var heatmap = d3.floorplan.heatmap();
  var overlays = d3.floorplan.overlays().editMode(true);
  var mapdata = {};

  mapdata[imagelayer.id()] = [{
    url: 'images/demo.jpg',
    x: 0,
    y: 0,
    height: 33.79,
    width: 50.0
  }];

  map.addLayer(imagelayer)
    .addLayer(heatmap)
    .addLayer(overlays);
     
  d3.json("data/data.json", function(data) {
    mapdata[heatmap.id()] = data.heatmap;
    mapdata[overlays.id()] = data.overlays;

    d3.select("#demo").append("svg")
                      .attr("width", w)
                      .attr("height", h)
                      .datum(mapdata)
                      .call(map);
  });
})();
