<template>
  <div>
    <ul v-if="reservations">
      <li v-for="(reservation, index) in reservations" :key="index">
        <ul>
          <li><strong>ID:</strong> {{ reservation._id }}</li>
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
    <div v-if="(!reservations)" class="noResults">
      No reservations found for {{ datePicked ? datePicked : currentDate }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

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
        this.reservations = null;
      }
    },
    getTodaysDate() {
      this.currentDate = moment().format('YYYY-MM-DD');
      return this.currentDate;
    }
  },
  async mounted() {
    if (!this.datePicked) {
      this.getTodaysDate();
      await this.fetchReservations(this.currentDate);
    } else {
      await this.fetchReservations(this.datePicked);
    }
  },
  watch: {
    datePicked: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const formattedDate = moment(newValue).format('YYYY-MM-DD');
          this.fetchReservations(formattedDate);
        }
      }
    }
  }
};
</script>

<style>
ul {
  width: 150%;
}

.noResults {
  width: 400px;
  font-size: 20px;
}
</style>