<template>
  <div v-if="show" class="modal-overlay">
     <div class="modal-content">
       <h2>{{ title }}</h2>
       <form @submit.prevent="isEditing ? updateOffice() : createOffice()">
         <label for="name">Name:</label>
         <input type="text" id="name" v-model="office.name" required>
 
         <label for="imageUrls">Image URLs:</label>
         <input type="text" id="imageUrls" v-model="office.imageUrls" required>
 
         <label for="chosenFloorplan">Chosen Floorplan:</label>
         <input type="text" id="chosenFloorplan" v-model="office.chosenFloorplan" required>
 
         <!-- Uncomment and adjust as necessary for additional fields -->
         <!--
         <label for="coordinates">Coordinates:</label>
         <input type="text" id="coordinates" v-model="office.coordinates" required>
 
         <label for="areas">Areas:</label>
         <input type="text" id="areas" v-model="office.areas" required>
         -->
         <button class="wideButton" type="submit">{{ isEditing ? 'Update Office' : 'Create Office' }}</button>
         <button class="wideButton" @click="close">Close</button>
       </form>
     </div>
  </div>
 </template>
 
 <script>
 import axios from 'axios';
 
 export default {
  props: ['show', 'title', 'isEditing', 'data'],
  data() {
     return {
       office: {
         name: '',
         imageUrls: [],
         chosenFloorplan: '',
         coordinates: {}, // Adjust as necessary
         areas: {}, // Adjust as necessary
       },
     };
  },
  watch: {
     data: {
       immediate: true,
       handler(newData) {
         if (newData) {
           this.office = { ...newData };
         } else {
           this.office = {
             name: '',
             imageUrls: [],
             chosenFloorplan: '',
             coordinates: {}, // Adjust as necessary
             areas: {}, // Adjust as necessary
           };
         }
       },
     },
  },
  methods: {
     close() {
       this.$emit('close');
     },
     async createOffice() {
       try {
         const response = await axios.post('/api/offices/', this.office);
         console.log(response.data);
         this.close();
       } catch (error) {
         console.error('Error creating office:', error);
       }
     },
     async updateOffice() {
       try {
         const response = await axios.put(`/api/offices/${this.office._id}`, this.office);
         console.log(response.data);
         this.close();
       } catch (error) {
         console.error('Error updating office:', error);
       }
     },
  },
 };
 </script>
 
 <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
 }
 
 .modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  color: black;
 }
 </style>
 