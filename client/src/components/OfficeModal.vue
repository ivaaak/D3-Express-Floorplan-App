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
      imageUrlInput: '',
      office: {
        name: '',
        chosenFloorplan: '',
        imageUrls: []
      },
      imageUrlsInput: ''
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
            chosenFloorplan: '',
            imageUrls: []
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
        const image = this.office.imageUrls;
        this.office.imageUrls = [];
        this.office.imageUrls.push(image);
        const response = await axios.post('/api/offices/', this.office);
        this.close();
      } catch (error) {
        console.error('Error creating office:', error);
      }
    },
    async updateOffice() {
      try {
        const officeId = this.office._id;
        delete this.office._id;
        const response = await axios.put(`/api/offices/${officeId}`, this.office);
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