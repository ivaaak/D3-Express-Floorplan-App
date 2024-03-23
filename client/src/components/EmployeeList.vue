<template>
    <div>
       <h1>Employees List</h1>
       <table>
         <thead>
           <tr>
             <th>Name</th>
             <th>Position</th>
             <th>Level</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="employee in employees" :key="employee._id">
             <td>{{ employee.name }}</td>
             <td>{{ employee.position }}</td>
             <td>{{ employee.level }}</td>
             <td>
               <router-link :to="`/edit/${employee._id}`">Edit</router-link>
               <button @click="deleteEmployee(employee._id)">Delete</button>
             </td>
           </tr>
         </tbody>
       </table>
       <button @click="addNewEmployee">Add a New Employee</button>
    </div>
   </template>
   
   <script>
   import { ref, onMounted } from 'vue';
   import { useRouter } from 'vue-router';
   import { useEmployeeService } from './employeeService';
   
   export default {
    setup() {
       const router = useRouter();
       const employeeService = useEmployeeService();
       const employees = ref([]);
   
       onMounted(async () => {
         employees.value = await employeeService.getEmployees();
       });
   
       const deleteEmployee = async (id) => {
         await employeeService.deleteEmployee(id);
         employees.value = await employeeService.getEmployees();
       };
   
       const addNewEmployee = () => {
         router.push('/new');
       };
   
       return {
         employees,
         deleteEmployee,
         addNewEmployee,
       };
    },
   };
   </script>
   
   <style scoped>
   table {
    width: 100%;
   }
   button:first-of-type {
    margin-right: 1rem;
   }
   </style>
   