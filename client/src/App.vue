<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="floorplanContainer">
        <FloorplanHeader></FloorplanHeader>
        <div id="floorplanSvgContainer"></div> <!-- Main Floorplan Container Div -->
        <div id="tooltip" style="position: absolute; opacity: 0;"></div>

      </div>
      <Accordion id="sidepanel">
      </Accordion>
    </div>
  </main>
</template>

<script>
import ManageDesks from './components/ManageDesks.vue';
import HeaderMenu from './components/HeaderMenu.vue';
import FloorplanHeader from './components/FloorplanHeader.vue';
import Accordion from './components/Accordion.vue'
import jsonData from './data/floorplanData.json';

export default {
  components: {
    ManageDesks,
    HeaderMenu,
    FloorplanHeader,
    Accordion
  },
  data() {
    return {
      selectionActive: false,
      floorImageUrl: 'https://static.dezeen.com/uploads/2019/05/synchroon-office-space-encounters-interiors-utrecht-netherlands_dezeen_floor-plan.jpg'
    };
  },
  methods: {
    getImageDimensions(scaleFactor) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = this.floorImageUrl;
        img.onload = function () {
          resolve({ 
            width: img.width / scaleFactor,
             height: img.height / scaleFactor });
        };
        img.onerror = function () {
          reject(new Error('Failed to load image'));
        };
      });
    }
  },
  async mounted() {
    // Load Image -> Load data -> Build D3 Floorplan map -> Add layers (overlay heatmap polygon)
    const dimensions = await this.getImageDimensions(1.7); // change 1.7 to scale the image

    var xscale = d3.scale.linear().domain([0, 50]).range([0, dimensions.width]),
      yscale = d3.scale.linear().domain([0, 35]).range([0, dimensions.height]),

      map = d3.floorplan().xScale(xscale).yScale(yscale),
      imagelayer = d3.floorplan.imagelayer(),
      heatmap = d3.floorplan.heatmap(),
      //vectorfield = d3.floorplan.vectorfield(),
      //pathplot = d3.floorplan.pathplot(),
      overlays = d3.floorplan.overlays().editMode(false),
      mapdata = {};

    mapdata[imagelayer.id()] = [{
      url: this.floorImageUrl,
      x: 0,
      y: 0,
      height: 35,
      width: 50
    }];

    // Function to generate the different layers
    map.addLayer(imagelayer).addLayer(heatmap).addLayer(overlays);
    //.addLayer(vectorfield)
    //.addLayer(pathplot)

    var loadData = function (data) {
      mapdata[heatmap.id()] = data.heatmap;
      mapdata[overlays.id()] = data.overlays;
      //mapdata[vectorfield.id()] = data.vectorfield;
      //mapdata[pathplot.id()] = data.pathplot;

      // TODO: add variables for image size
      d3.select("#floorplanSvgContainer").append("svg")
        .attr("height", dimensions.height).attr("width", dimensions.width)
        .datum(mapdata).call(map);

      // var div = d3.select("body").append("div")
      //   .attr("class", "tooltip")
      //   .style("opacity", 0);


      // // Hover tooltip on polygon layer
      // d3.select('.polygon')
      //   .on("mouseover", function (d) {
      //     div.transition()
      //       .duration(0)
      //       .style("opacity", .9);
      //     div.html("Price: <br>" + "<br/>Volume: ")
      //       .style("left", (d3.event.pageX) + "px")
      //       .style("top", (d3.event.pageY - 28) + "px");
      //     console.log("event", (d3.event))
      //   })
      //   .on("mouseout", function (d) {
      //     div.transition()
      //       .duration(0)
      //       .style("opacity", 0);
      //   })

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
  }
}

</script>

<style scoped></style>
