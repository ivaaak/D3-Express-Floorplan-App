<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <form @submit.prevent="isEditing ? updateEmployee() : createEmployee()">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="employee.name" required>

        <label for="position">Position:</label>
        <input type="text" id="position" v-model="employee.position" required>

        <label for="level">Level:</label>
        <select id="level" v-model="employee.level" required>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        <label for="officeId">Office ID:</label>
        <input v-if="isEditing" type="text" id="officeId" v-model="employee.officeId" disabled>
        <input v-if="!isEditing" type="text" id="officeId" v-model="this.office._id" required>
        <!-- prefill officeid if not editing-->

        <button class="wideButton" type="submit">{{ isEditing ? 'Update Employee' : 'Create Employee' }}</button>
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
      employee: {
        name: '',
        position: '',
        level: 'junior', // Default level
      },
      office: undefined,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        if (newData) {
          this.employee = { ...newData };
        } else {
          this.employee = {
            officeId: '',
            name: '',
            position: '',
            level: 'junior',
          };
        }
      },
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async createEmployee() {
      try {
        const response = await axios.post('/api/employees/', this.employee);
        console.log(response.data);
        this.close();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
    async updateEmployee() {
      try {
        const response = await axios.put(`/api/employees/${this.employee._id}`, this.employee);
        console.log(response.data);
        this.close();
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async fetchOfficeDetails() {
      try {
        const response = await axios.get(`/api/offices/`);
        this.office = response.data.find(office => office.name === "Blubito AG");
      } catch (error) {
        console.error('Error fetching office details:', error);
      }
    },
  },
  created() {
    this.fetchOfficeDetails();
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