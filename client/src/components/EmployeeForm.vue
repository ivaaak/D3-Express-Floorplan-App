<template>
    <form @submit.prevent="submitForm" class="employee-form">
       <div class="mat-mdc-form-field">
         <input v-model="employee.name" placeholder="Name" required />
         <div v-if="nameError" class="mat-mdc-error">Name must be at least 3 characters long.</div>
       </div>
   
       <div class="mat-mdc-form-field">
         <input v-model="employee.position" placeholder="Position" required />
         <div v-if="positionError" class="mat-mdc-error">Position must be at least 5 characters long.</div>
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
/* General form styling */
.employee-form {
 width: 100%;
 max-width: 400px;
 margin: 0 auto;
 padding: 20px;
 background-color: #f8f8f8;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styling for form fields and labels */
.mat-mdc-form-field {
 margin-bottom: 20px;
}

.mat-mdc-form-field label {
 display: block;
 margin-bottom: 5px;
 font-weight: bold;
}

.mat-mdc-form-field input {
 width: 100%;
 padding: 10px;
 border: 1px solid #ccc;
 border-radius: 4px;
 font-size: 16px;
}

/* Styling for error messages */
.mat-mdc-error {
 color: #ff4d4d;
 font-size: 14px;
 margin-top: 5px;
}

/* Styling for radio buttons */
.mat-mdc-form-field input[type="radio"] {
 margin-right: 5px;
}

/* Styling for the submit button */
.employee-form button[type="submit"] {
 width: 100%;
 padding: 10px;
 background-color: #4CAF50;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 font-size: 16px;
 transition: background-color 0.3s ease;
}

.employee-form button[type="submit"]:hover {
 background-color: #45a049;
}

.employee-form button[type="submit"]:disabled {
 background-color: #ccc;
 cursor: not-allowed;
}
</style>
   