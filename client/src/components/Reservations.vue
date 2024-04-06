<template>
  <div>
    <ul>
      <li v-for="(reservation, index) in reservations" :key="index">
        <ul>
          <li><strong>ID:</strong> {{ reservation._id }}</li>
          <!-- <li><strong>Desk ID:</strong> {{ reservation.deskId }}</li> -->
          <li><strong>Date:</strong> {{ reservation.date }}</li>
          <li><strong>Office ID:</strong> {{ reservation.officeId }}</li>
          <li><strong>Employee ID:</strong> {{ reservation.employeeId }}</li>
          <li><strong>Desks:</strong>
            <ul>
              <li v-for="(desk, deskIndex) in reservation.deskIds" :key="deskIndex">{{ desk }}</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      canEditOfficeName: true,
      currentDate: '',
      modalTitle: '',
      modalMessage: '',
      reservations: undefined,
    };
  },
  props: {
    datePicked: {
      type: Date,
      required: false,
    },
  },
  methods: {
    async fetchReservations(datePicked) {
      try {
        const response = await axios.get(`/api/reservations/${datePicked}`);
        this.reservations = response.data;
      } catch (error) {
        console.error('Error fetching office details:', error);
      }
    },
  },
  async mounted() {
    if (!this.datePicked) {
      await this.fetchReservations(this.currentDate);
    } else {
      await this.fetchReservations(this.datePicked);
    }
  },
  computed: {
    currentTime() {
      this.currentDate = moment().format('YYYY-MM-DD');
      return this.currentDate;
    }
  }
};
</script>