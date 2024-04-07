<template>
    <button v-if="canEditDesks" @click="emitToggleDesksEditable()" class="wideButton">
      Edit Desk Positons:
    </button>
    <button class="wideButton"> Add a Desk </button>
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
    };
  },
  methods: {
    emitToggleDesksEditable() {
      this.deskObjectsEditable = !this.deskObjectsEditable;
      this.hasBeenEdited = true;
      this.$emit('toggle-desks-editable', this.deskObjectsEditable);
    },
    //TODO get all desks locations
    //TODO save all desks in current locations

  },
};
</script>