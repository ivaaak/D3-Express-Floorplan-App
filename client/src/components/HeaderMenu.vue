<template>
  <div class="header">
     <div class="title">D3 JS Floorplan App</div>
     <nav class="menu">
       <ul>
         <li v-for="item in items" :key="item.id" @click="openDialog(item.message)">{{ item.name }}</li>
       </ul>
     </nav>
     <ModalDialog :show="showModal" :title="modalTitle" :message="modalMessage" @close="closeModal"/>
  </div>
 </template>
 
 <script>
 import ModalDialog from './ModalDialog.vue';
 
 export default {
  components: {
     ModalDialog,
  },
  data() {
     return {
       items: [
         { id: 1, name: 'Manage Users', message: 'Manage Users clicked' },
         { id: 2, name: 'Manage Desks', message: 'Manage Desks clicked' },
         { id: 3, name: 'Floorplan', message: 'Floorplan clicked' },
         { id: 4, name: 'Search', message: 'Search clicked' },
         { id: 5, name: 'Login', message: 'Login clicked' },
       ],
       showModal: false,
       modalTitle: '',
       modalMessage: '',
     };
  },
  methods: {
     openDialog(message) {
       this.modalTitle = 'Dialog';
       this.modalMessage = message;
       this.showModal = true;
     },
     closeModal() {
       this.showModal = false;
     },
  },
 };
 </script>
 

<style scoped>
.header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-top: 10px;
 padding: 10px 30px 10px 30px;
 background-color: #f8f9fa;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 border-radius: 32px;
}

.title {
 font-size: 24px;
 font-weight: bold;
}

.menu ul {
 list-style: none;
 padding: 0;
 margin: 0;
 display: flex;
}

.menu li {
 margin-left: 20px;
}

.menu a {
 text-decoration: none;
 color: #333;
}
</style>
