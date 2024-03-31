<template>
  <div>
    <!-- Button to toggle edit mode -->
    <button @click="toggleEditMode" class="wideButton">
      {{ isEditing ? '✎ Switch to Create Mode ✎' : '✎ Switch to Edit Mode ✎' }}
    </button>
    <form @submit.prevent="submitForm">
      <input v-model="desk.name" placeholder="Desk Name" />
      <button v-if="!isEditing && !selectionCompleted" @click="completeSelection" 
        id="startSelection" class="wideButton">
        Select 4 Points To Create A Desk
      </button>
      <div v-if="!isEditing &&  selectionCompleted"> Points selected: {{ pointsSelected }}</div>
      <button v-if="!isEditing" class="wideButton" v-bind:disabled="!selectionCompleted">
        Create Desk
      </button>
      <button v-if="isEditing" class="wideButton">
        Update Desk
      </button>
    </form>
    <ul>
      <li v-for="desk in desks" :key="desk._id">
        {{ desk.name }}
        <button @click="editDesk(desk)" class="narrowButton">Edit</button>
        <button @click="deleteDesk(desk._id)" class="narrowButton">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      desks: [],
      desk: {
        name: '',
      },
      isEditing: false,
      selectionCompleted: false, // New property to track selection completion
      pointsSelected: [
        { "x": 1.2, "y": 11.0 },
        { "x": 8.5, "y": 2.0 },
        { "x": 32, "y": 2.0 },
        { "x": 31.5, "y": 19.5 },
        { "x": 1.2, "y": 20.5 }]
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
    completeSelection() {
      this.selectionCompleted = true;

    },
    async fetchDesks() {
      try {
        const response = await axios.get('/api/desks');
        this.desks = response.data;
      } catch (error) {
        console.error('Error fetching desks:', error);
      }
    },
    async createDesk() {
      try {
        const response = await axios.post('/api/desks', this.desk);
        this.desks.push(response.data);
        this.desk.name = '';
      } catch (error) {
        console.error('Error creating desk:', error);
      }
    },
    async updateDesk(id) {
      try {
        const response = await axios.put(`/api/desks/${id}`, this.desk);
        const index = this.desks.findIndex(desk => desk._id === id);
        if (index !== -1) {
          this.desks[index] = response.data;
        }
        this.desk.name = '';
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating desk:', error);
      }
    },
    async deleteDesk(id) {
      try {
        await axios.delete(`/api/desks/${id}`);
        this.desks = this.desks.filter(desk => desk._id !== id);
      } catch (error) {
        console.error('Error deleting desk:', error);
      }
    },
    editDesk(desk) {
      this.desk = { ...desk };
      this.isEditing = true;
    },
    submitForm() {
      if (this.isEditing) {
        this.updateDesk(this.desk._id);
      } else {
        this.createDesk();
      }
    },
  },
  created() {
    this.fetchDesks();
  },
};
</script>