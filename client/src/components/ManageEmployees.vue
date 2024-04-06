<template>
  <div>
    <button @click="openModalForCreation()" class="wideButton" type="submit">Create Employee</button>
    <ul>
      <li v-for="employee in employees" :key="employee._id" class="listItem">
        <div class="itemText">
          {{ employee.name }} - {{ employee.position }} - {{ employee.level }}
        </div>
        <div>
          <button class="narrowButton" @click="openModalForEditing(employee)">Edit</button>
          <button class="narrowButton" @click="deleteEmployee(employee._id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
  <EmployeeModal :show="showModal" :title="modalTitle" :message="modalMessage" :is-editing="isEditing"
    :data="employeeToEdit" @close="closeModal" />
</template>


<script>
import EmployeeModal from './EmployeeModal.vue';
import axios from 'axios';

export default {
  components: {
    EmployeeModal
  },
  data() {
    return {
      employees: [],
      employee: {
        name: '',
        position: '',
      },
      isEditing: false,
      modalTitle: 'Add an employee',
      modalMessage: 'Message here',
      showModal: false,
      isEditing: false,
      employeeToEdit: null,
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
    openModalForCreation() {
      this.showModal = true;
      this.modalTitle = 'Create New Employee';
      this.isEditing = false;
      this.employeeToEdit = null;
    },
    openModalForEditing(employee) {
      this.showModal = true;
      this.modalTitle = 'Edit Employee';
      this.isEditing = true;
      this.employeeToEdit = employee;
    },
    closeModal() {
      this.showModal = false;
      this.modalTitle = '';
      this.isEditing = false;
      this.employeeToEdit = null;
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>

<style>
.listItem {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.itemText {
  text-align: center;
  margin: 4px;
}

/* Add this to ensure buttons are on the same row */
.listItem>div:last-child {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>