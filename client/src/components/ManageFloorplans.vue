<template>
  <div>
     <button class="narrowButton" @click="fetchFloorplans">Fetch Floorplans</button>
     <button class="narrowButton" @click="fetchHeatmap">Fetch Heatmap</button>
     <button class="narrowButton" @click="addHeatmapPoint">Add Heatmap Point</button>
     <button class="narrowButton" @click="updateHeatmapPoint">Update Heatmap Point</button>
     <button class="narrowButton" @click="deleteHeatmapPoint">Delete Heatmap Point</button>
     <button class="narrowButton" @click="fetchOverlays">Fetch Overlays</button>
     <button class="narrowButton" @click="addOverlay">Add Overlay</button>
     <button class="narrowButton" @click="updateOverlay">Update Overlay</button>
     <button class="narrowButton" @click="deleteOverlay">Delete Overlay</button>
     <div v-if="floorplans">
       <h2>Floorplans</h2>
       <ul>
         <li v-for="(floorplan, index) in floorplans" :key="index">{{ floorplan._id }}</li>
       </ul>
     </div>
     <div v-if="heatmap">
       <h2>Heatmap</h2>
       <ul>
         <li v-for="(point, index) in heatmap.map" :key="index">{{ point.x }}, {{ point.y }}</li>
       </ul>
     </div>
     <div v-if="overlays">
       <h2>Overlays</h2>
       <ul>
         <li v-for="(overlay, index) in overlays.polygons" :key="index">{{ overlay.id }}</li>
       </ul>
     </div>
  </div>
 </template>
 
 <script>
 import axios from 'axios';
 
 export default {
  data() {
     return {
       floorplans: [],
       heatmap: null,
       overlays: null
     };
  },
  methods: {
     async fetchFloorplans() { //TODO endpoint
       try {
         const response = await axios.get('/api/offices/floorplanImg');
         console.log("response.data", response.data)

         this.floorplans = response.data[0];
         console.log("this.floorplans", this.floorplans)
       } catch (error) {
         console.error('Error fetching floorplans:', error);
       }
     },
  },
 };
 </script>
 