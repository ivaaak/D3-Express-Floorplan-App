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
     async fetchFloorplans() {
       try {
         const response = await axios.get('/api/floorplan');
         console.log("response.data", response.data)

         this.floorplans = response.data[0];
         console.log("this.floorplans", this.floorplans)
       } catch (error) {
         console.error('Error fetching floorplans:', error);
       }
     },
     async fetchHeatmap() {
       try {
         const response = await axios.get('/api/heatmap');
         this.heatmap = response.data;
       } catch (error) {
         console.error('Error fetching heatmap:', error);
       }
     },
     async addHeatmapPoint() {
       const newPoint = { x: 10, y: 20 }; // Example point
       try {
         const response = await axios.post('/api/heatmap', newPoint);
         console.log('Added point:', response.data);
       } catch (error) {
         console.error('Error adding point to heatmap:', error);
       }
     },
     async updateHeatmapPoint() {
       const updatedPoint = { x: 30, y: 40 }; // Example updated point
       try {
         const response = await axios.put(`/api/heatmap/${updatedPoint.x}`, updatedPoint);
         console.log('Updated point:', response.data);
       } catch (error) {
         console.error('Error updating point in heatmap:', error);
       }
     },
     async deleteHeatmapPoint() {
       const pointId = 10; // Example point ID
       try {
         await axios.delete(`/api/heatmap/${pointId}`);
         console.log('Deleted point with ID:', pointId);
       } catch (error) {
         console.error('Error deleting point from heatmap:', error);
       }
     },
     async fetchOverlays() {
       try {
         const response = await axios.get('/api/overlays');
         this.overlays = response.data;
       } catch (error) {
         console.error('Error fetching overlays:', error);
       }
     },
     async addOverlay() {
       const newPolygon = { id: 'polygon1', points: [{ x: 10, y: 20 }, { x: 30, y: 40 }] }; // Example polygon
       try {
         const response = await axios.post('/api/overlays', newPolygon);
         console.log('Added overlay:', response.data);
       } catch (error) {
         console.error('Error adding overlay:', error);
       }
     },
     async updateOverlay() {
       const updatedPolygon = { id: 'polygon1', points: [{ x: 50, y: 60 }, { x: 70, y: 80 }] }; // Example updated polygon
       try {
         const response = await axios.put(`/api/overlays/${updatedPolygon.id}`, updatedPolygon);
         console.log('Updated overlay:', response.data);
       } catch (error) {
         console.error('Error updating overlay:', error);
       }
     },
     async deleteOverlay() {
       const overlayId = 'polygon1'; // Example overlay ID
       try {
         await axios.delete(`/api/overlays/${overlayId}`);
         console.log('Deleted overlay with ID:', overlayId);
       } catch (error) {
         console.error('Error deleting overlay:', error);
       }
     },
  },
 };
 </script>
 