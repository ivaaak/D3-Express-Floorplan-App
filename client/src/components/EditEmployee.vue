<template>
    <div>
       <h1>Edit an Employee</h1>
       <employee-form
         :initial-state="employee"
         @form-submitted="editEmployee"
       ></employee-form>
    </div>
   </template>
   
   <script>
   import EmployeeForm from './EmployeeForm.vue';
   import { ref, onMounted } from 'vue';
   import { useRouter } from 'vue-router';
   import { useEmployeeService } from './employeeService';
   
   export default {
    components: {
       EmployeeForm,
    },
    setup() {
       const router = useRouter();
       const employeeService = useEmployeeService();
       const employee = ref({});
   
       onMounted(async () => {
         const id = router.currentRoute.value.params.id;
         if (!id) {
           alert('No id provided');
           return;
         }
   
         try {
           const fetchedEmployee = await employeeService.getEmployee(id);
           employee.value = fetchedEmployee;
         } catch (error) {
           console.error('Failed to fetch employee', error);
         }
       });
   
       const editEmployee = async (updatedEmployee) => {
         try {
           await employeeService.updateEmployee(updatedEmployee);
           router.push('/');
         } catch (error) {
           alert('Failed to update employee');
           console.error(error);
         }
       };
   
       return {
         employee,
         editEmployee,
       };
    },
   };
   </script>
   
   <style scoped>
   /* Add your styles here */
   </style>
   