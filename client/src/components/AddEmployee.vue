<template>
  <v-card>
     <v-card-title>
       Add a New Employee
     </v-card-title>
     <v-card-text>
       <app-employee-form @submit="addEmployee"></app-employee-form>
     </v-card-text>
  </v-card>
</template>
 
<script>
 import EmployeeFormComponent from '../components/EmployeeForm.vue';
 import EmployeeService from '../services/employeeService.js';

 export default {
  mixins: [EmployeeService],
  components: {
     'app-employee-form': EmployeeFormComponent // Corrected component name
  },
  created() {
      this.getEmployees();
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
 
<style>
</style>
