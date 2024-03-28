<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="floorplanContainer">
        <FloorplanHeader></FloorplanHeader>
        <div id="demo"></div>
      </div>
      <Accordion id="sidepanel">
      </Accordion>
    </div>
  </main>
</template>

<script>
import ManageDesks from './components/ManageDesks.vue';
import Calendar from './components/Calendar.vue';
import HeaderMenu from './components/HeaderMenu.vue';
import FloorplanHeader from './components/FloorplanHeader.vue';
import Accordion from './components/Accordion.vue'

export default {
  components: {
    ManageDesks,
    Calendar,
    HeaderMenu,
    FloorplanHeader,
    Accordion
  }
};
</script>

<style scoped>
svg {
  border: 4px solid black;
}
</style>
