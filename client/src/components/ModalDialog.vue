<template>
    <div v-if="show" class="modal-overlay">
       <div class="modal-content">
         <h2>{{ title }}</h2>
         <p>{{ message }}</p>
         <button @click="close">Close</button>
       </div>
    </div>
   </template>
   
   <script>
   export default {
    props: ['show', 'title', 'message'],
    methods: {
       close() {
         this.$emit('close');
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
   }
   </style>
   