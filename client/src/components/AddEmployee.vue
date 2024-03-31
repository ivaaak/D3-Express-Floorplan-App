<template>
  <div>
    <form @submit.prevent="submitForm">
      <input v-model="employee.name" placeholder="Employee Name" required />
      <input v-model="employee.position" placeholder="Position" required />
      <button  class="wideButton" type="submit">{{ isEditing ? 'Update Employee' : 'Create Employee' }}</button>
    </form>
    <ul>
      <li v-for="employee in employees" :key="employee._id" class="listItem">
        {{ employee.name }} - {{ employee.position }} - {{ employee.level }}
        <button class="narrowButton" @click="editEmployee(employee)">Edit</button>
        <button class="narrowButton" @click="deleteEmployee(employee._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      employee: {
        name: '',
        position: '',
      },
      isEditing: false,
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('/api/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async createEmployee() {
      try {
        const response = await axios.post('/api/employees', this.employee);
        this.employees.push(response.data);
        this.employee.name = '';
        this.employee.position = '';
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
    async updateEmployee(id) {
      try {
        const response = await axios.put(`/api/employees/${id}`, this.employee);
        const index = this.employees.findIndex(employee => employee._id === id);
        if (index !== -1) {
          this.employees[index] = response.data;
        }
        this.employee.name = '';
        this.employee.position = '';
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee(id) {
      try {
        await axios.delete(`/api/employees/${id}`);
        this.employees = this.employees.filter(employee => employee._id !== id);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
    editEmployee(employee) {
      this.employee = { ...employee };
      this.isEditing = true;
    },
    submitForm() {
      if (this.isEditing) {
        this.updateEmployee(this.employee._id);
      } else {
        this.createEmployee();
      }
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>