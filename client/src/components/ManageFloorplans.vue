<template>
  <button v-if="canEditDesks" @click="emitToggleDesksEditable()" class="wideButton">
    Edit Desk Positons:
  </button>
  <button class="wideButton" @click="getAllDeskLocations()"> Add a Desk </button>
  <button class="wideButton" v-bind:disabled="!hasBeenEdited"> Save Desk Positions </button>

</template>

<script>
import axios from 'axios';

export default {
  emits: ['toggleDesksEditable'],
  data() {
    return {
      toggleDesksEditable: false,
      hasBeenEdited: false,
      canEditDesks: true,
      deskCoordinatesArray: [],
    };
  },
  methods: {
    emitToggleDesksEditable() {
      this.deskObjectsEditable = !this.deskObjectsEditable;
      this.hasBeenEdited = true;
      this.$emit('toggle-desks-editable', this.deskObjectsEditable);
    },
    getAllDeskLocations() {
      this.deskCoordinatesArray = [];
      var pathElements = document.querySelectorAll('path');
      pathElements.forEach((path) => {
        var title = path.querySelector('title');
        if (title) {
          var deskCoordinates = this.normalizeCoordinates(path.getAttribute("d"));
          this.deskCoordinatesArray.push(deskCoordinates);
        }
      });
      console.log("deskCoordinatesArray", this.deskCoordinatesArray)
    },
    normalizeCoordinates(polygonValues) {
      const coordinatesArray = polygonValues.split(/M|L/);
      if (coordinatesArray[coordinatesArray.length - 1].endsWith('Z')) {
        const lastCoordinate = coordinatesArray.pop().slice(0, -1);
        coordinatesArray.push(lastCoordinate);
      }
      const normalizedCoordinates = coordinatesArray.map(function (coordinate) {
        const trimmedCoordinate = coordinate.trim();
        const [x, y] = trimmedCoordinate.split(',').map(Number);
        return { x, y };
      });
      normalizedCoordinates.shift();
      return normalizedCoordinates;
    },
    //TODO save all desks in current locations
    async saveAllDeskLocations() {
      this.getAllDeskLocations();
      try {
        const response = await axios.post('/api/offices/update-overlays', {
          deskCoordinates: this.deskCoordinatesArray,
        });
      } catch (error) {
        console.error('Error adding reservation:', error);
      }
    }
  },
};
</script>