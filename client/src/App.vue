<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="floorplanContainer">
        <FloorplanHeader :desksCount="desks" :datePicked="datePicked" v-bind="$attrs"></FloorplanHeader>
        <div id="floorplanSvgContainer"></div> <!-- Main Floorplan Container Div -->
        <div id="tooltip" style="position: absolute; opacity: 0;"></div>
      </div>
      <Accordion id="sidepanel" @date-changed="handleDateChange" @toggle-desks-editable="handleToggleDesksEditable">
      </Accordion>
    </div>
  </main>
</template>

<script>
import HeaderMenu from './components/HeaderMenu.vue';
import FloorplanHeader from './components/FloorplanHeader.vue';
import Accordion from './components/Accordion.vue'
// import heatmapData from './data/heatmapAreas.json';
// import polygonData from './data/polygons.json';
import axios from 'axios';

export default {
  components: {
    HeaderMenu,
    FloorplanHeader,
    Accordion
  },
  data() {
    return {
      mapdata: {},
      office: undefined,
      desks: undefined,
      areas: undefined,
      map: undefined,
      heatmap: undefined,
      overlays: undefined,
      imagelayer: undefined,
      scaleFactor: 1.7, // change 1.7 to scale the image
      selectionActive: false,
      deskObjectsEditable: false,
      canEditDesks: true,
      datePicked: undefined,
      floorImageUrl: undefined
    };
  },
  methods: {
    async fetchOfficeDetails() {
      try {
        const response = await axios.get(`/api/offices/`);
        this.office = response.data.find(office => office.name === "Blubito AG");
        this.desks = this.office.coordinates;
        // console.log("desks", this.desks)
        this.floorImageUrl = this.office.chosenFloorplan;
      } catch (error) {
        console.error('Error fetching office details:', error);
      }
    },
    getImageDimensions(scaleFactor) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = this.floorImageUrl;
        img.onload = function () {
          resolve({
            width: img.width / scaleFactor,
            height: img.height / scaleFactor
          });
        };
        img.onerror = function () {
          reject(new Error('Failed to load image'));
        };
      });
    },
    loadTooltipOnPolygons() {
      var div = d3.select("#tooltip").style("opacity", 1);
      var deskID = div.attr("title");
      var tooltipContent = '<div class="tooltip-content">DeskID: ' + deskID + '</div>';
      // Select the polygon element and add event listeners for mouseover and mouseout
      d3.select('.polygon')
        .on("mouseover", function (d) { // show
          div.transition().duration(200).style("opacity", 1);
          div.html(tooltipContent)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) { // hide
          div.transition().duration(500).style("opacity", 0);
        });
    },
    addDebugD3ClickListener() {
      // Click event listener for debugging
      d3.select('.overlay-canvas')
        .on("click", function (d) {
          console.log("page xpos:", (d3.event.pageX), "  ypos:", (d3.event.pageY));
          console.log("layer xpos:", (d3.event.layerX), "  ypos:", (d3.event.layerY));
          console.log("offset xpos:", (d3.event.offsetX), "  ypos:", (d3.event.offsetY));
          console.log("x:", (d3.event.x), "  y:", (d3.event.y));
        });
    },
    toggleDesksEditable() {
      this.deskObjectsEditable = !this.deskObjectsEditable;
      // re-render floorplan with new layer editable setting
      this.refreshD3FloorplanLayers();
    },
    async prepareD3FloorplanLayers() { // Main rendering function
      // Load Image -> Load data -> Build D3 Floorplan map -> Add layers (overlay heatmap polygon)
      const dimensions = await this.getImageDimensions(this.scaleFactor);

      var xscale = d3.scale.linear().domain([0, 50]).range([0, dimensions.width]);
      var yscale = d3.scale.linear().domain([0, 35]).range([0, dimensions.height]);

      this.map = d3.floorplan().xScale(xscale).yScale(yscale);
      this.imagelayer = d3.floorplan.imagelayer();
      this.heatmap = d3.floorplan.heatmap();
      this.heatmap.title("areas");
      this.overlays = d3.floorplan.overlays().editMode(this.deskObjectsEditable);
      this.overlays.title("desks");
      // editMode True makes it so that the shapes are draggable and editable
      //var vectorfield = d3.floorplan.vectorfield();
      //var pathplot = d3.floorplan.pathplot();

      this.mapdata[this.imagelayer.id()] = [{ url: this.floorImageUrl, x: 0, y: 0, height: 35, width: 50 }];

      // Function to generate the different layers
      this.map.addLayer(this.imagelayer).addLayer(this.heatmap).addLayer(this.overlays);
      //.addLayer(vectorfield).addLayer(pathplot)

      this.loadHeatmapData(this.office);
      this.loadPolygonData(this.desks);
      //this.loadData(heatmapData, polygonData);
    },
    async renderD3FloorplanLayers() {
      const dimensions = await this.getImageDimensions(this.scaleFactor);

      d3.select("#floorplanSvgContainer").append("svg")
        .attr("height", dimensions.height).attr("width", dimensions.width)
        .datum(this.mapdata).call(this.map); // D3 apply errors here randomly
    },
    removeSVGCanvasElement() {
      var svgElement = document.querySelector('svg');
      if (svgElement) {
        svgElement.parentNode.removeChild(svgElement);
      }
    },
    async refreshD3FloorplanLayers() {
      this.removeSVGCanvasElement();
      this.prepareD3FloorplanLayers();
      this.loadTooltipOnPolygons();
      this.renderD3FloorplanLayers();
    },
    loadData(heatmapDataSource, polygonDataSource) {
      this.mapdata[this.heatmap.id()] = heatmapDataSource;
      this.mapdata[this.overlays.id()] = polygonDataSource;
      //this.mapdata[this.vectorfield.id()] = data.vectorfield;
      //this.mapdata[this.pathplot.id()] = data.pathplot;
    },
    loadHeatmapData(heatmapDataSource) {
      //console.log("heatmapDataSource", heatmapDataSource); //TODO
      this.mapdata[this.heatmap.id()] = heatmapDataSource;
    },
    loadPolygonData(polygonDataSource) {
      this.mapdata[this.overlays.id()] = polygonDataSource;
    },
    async colorReservedDesks() {
      var reservationsArray = await this.fetchReservations("2024-04-05"); // change to this.datePicked
      var pathElements = document.querySelectorAll('path');

      var allDeskIds = reservationsArray.reduce((acc, curr) => {
        return acc.concat(curr.deskIds);
      }, []);

      pathElements.forEach((path) => {
        var title = path.querySelector('title');
        if (title) {
          if (allDeskIds.includes(title.textContent)) {
            path.style.fill = '#FF0000';
          }
        }
      });
    },
    async fetchReservations(datePicked) {
      try {
        const response = await axios.get(`/api/reservations/${datePicked}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching office details:', error);
      }
    },
    handleDateChange(newDate) {
      this.datePicked = newDate;
    },
    handleToggleDesksEditable(isEditable) {
      console.log('Desks are now editable:', isEditable);
      this.toggleDesksEditable();
    },
  },
  async mounted() {
    await this.fetchOfficeDetails();
    this.prepareD3FloorplanLayers();
    this.loadTooltipOnPolygons();
    //this.addDebugD3ClickListener();
    this.renderD3FloorplanLayers();
    this.colorReservedDesks();
  }
}
</script>
