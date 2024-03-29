<template>
  <v-card>
    <v-card-title>
      Add a New Employee
    </v-card-title>
    <v-card-text>
      <button type="submit">List Employees</button>
    </v-card-text>
    <v-card-text>
      <button type="submit">Add Employee</button>
    </v-card-text>
    <v-card-text>
      <EmployeeForm @submit="addEmployee"></EmployeeForm>
    </v-card-text>
  </v-card>
</template>

<script>
import EmployeeForm from '../components/EmployeeForm.vue';
import EmployeeService from '../services/employeeService.js';

export default {
  mixins: [EmployeeService],
  components: {
    EmployeeForm,
  },
  created() {
    this.getEmployees()
  },
  methods: {
    addEmployee(employee) {
      console.log(this)
      this.employeeService.createEmployee(employee).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        alert('Failed to create employee');
        console.error(error);
      });
      this.employeeService.getEmployees();
    }
  }
};
</script>

<style></style>
