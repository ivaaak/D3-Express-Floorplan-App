<template>
  <div>
    <button @click="openModalForCreation()" class="wideButton"> Create Office </button>

    <ul>
      <li v-for="office in offices" :key="office._id">
        {{ office.name }}
        <button @click="openModalForEditing(office)" class="narrowButton">Edit</button>
        <button @click="deleteOffice(office._id)" class="narrowButton">Delete</button>
      </li>
    </ul>
    <OfficeModal :show="showModal" :title="modalTitle" :is-editing="isEditing" :data="officeToEdit"
      :message="modalMessage" @close="closeModal" />
  </div>
</template>

<script>
import OfficeModal from './OfficeModal.vue';
import axios from 'axios';

export default {
  components: {
    OfficeModal
  },
  data() {
    return {
      offices: [],
      desk: {
        name: '',
      },
      isEditing: false,
      selectionCompleted: false,
      pointsSelected: [],
      modalTitle: 'Add an employee',
      modalMessage: 'Message here',
      showModal: false,
      officeToEdit: undefined,
    };
  },
  methods: {
    openModalForCreation() {
      this.showModal = true;
      this.modalTitle = 'Create New Office';
      this.isEditing = false;
      this.officeToEdit = null;
    },
    openModalForEditing(office) {
      this.showModal = true;
      this.modalTitle = 'Edit Office';
      this.isEditing = true;
      this.officeToEdit = office;
    },
    closeModal() {
      this.showModal = false;
      this.modalTitle = '';
      this.isEditing = false;
      this.officeToEdit = null;
      this.fetchOffices(); // refetch on action
    },
    async fetchOffices() {
      try {
        const response = await axios.get('/api/offices');
        this.offices = response.data;
      } catch (error) {
        console.error('Error fetching offices:', error);
      }
    },
    async deleteOffice(officeId) {
      // Confirmation dialog
      const confirmation = confirm('Are you sure you want to delete this office?');
      if (confirmation) {
        try {
          await axios.delete(`/api/offices/${officeId}`);
          this.offices = this.offices.filter(desk => desk._id !== officeId);
        } catch (error) {
          console.error('Error deleting desk:', error);
        }
      }
    },
    editDesk(desk) {
      this.desk = { ...desk };
      this.isEditing = true;
    },
  },
  created() {
    this.fetchOffices();
  },
};
</script>