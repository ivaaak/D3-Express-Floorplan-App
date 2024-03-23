<template>
    <form @submit.prevent="submitForm" class="employee-form">
       <div class="mat-mdc-form-field">
         <label>Name</label>
         <input v-model="employee.name" placeholder="Name" required />
         <div v-if="nameError" class="mat-mdc-error">Name must be at least 3 characters long.</div>
       </div>
   
       <div class="mat-mdc-form-field">
         <label>Position</label>
         <input v-model="employee.position" placeholder="Position" required />
         <div v-if="positionError" class="mat-mdc-error">Position must be at least 5 characters long.</div>
       </div>
   
       <div>
         <label>Select an option</label>
         <div>
           <input type="radio" id="junior" value="junior" v-model="employee.level" required>
           <label for="junior">Junior</label>
         </div>
         <div>
           <input type="radio" id="mid" value="mid" v-model="employee.level">
           <label for="mid">Mid</label>
         </div>
         <div>
           <input type="radio" id="senior" value="senior" v-model="employee.level">
           <label for="senior">Senior</label>
         </div>
       </div>
   
       <button type="submit" :disabled="!isFormValid">Add</button>
    </form>
   </template>
   
   <script>
   export default {
    data() {
       return {
         employee: {
           name: '',
           position: '',
           level: 'junior',
         },
       };
    },
    computed: {
       nameError() {
         return this.employee.name.length < 3;
       },
       positionError() {
         return this.employee.position.length < 5;
       },
       isFormValid() {
         return !this.nameError && !this.positionError;
       },
    },
    methods: {
       submitForm() {
         if (this.isFormValid) {
           this.$emit('form-submitted', this.employee);
         }
       },
    },
   };
   </script>
   
   <style scoped>
   .employee-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
   }
   .mat-mdc-form-field {
    width: 100%;
   }
   .mat-mdc-error {
    color: red;
   }
   </style>
   