<template>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      office: undefined,
      desks: undefined,
      floorImageUrl: undefined,
    };
  },
  methods: {
    async fetchOfficeDetails() {
      try {
        const response = await axios.get(`/api/offices/`);
        this.office = response.data.find(office => office.name === "Blubito AG");
        this.desks = this.office.coordinates;
        this.floorImageUrl = this.office.chosenFloorplan;
      } catch (error) {
        console.error('Error fetching office details:', error);
      }
    },
    async mounted() {
      await this.fetchOfficeDetails();
    }
  },
};
</script>