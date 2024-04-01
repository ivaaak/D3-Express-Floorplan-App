<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="floorplanContainer">
        <FloorplanHeader></FloorplanHeader>
        <div id="demo"></div>
        <div id="tooltip" style="position: absolute; opacity: 0;"></div>

      </div>
      <Accordion id="sidepanel">
      </Accordion>
    </div>
  </main>
</template>

<script>
import ManageDesks from './components/ManageDesks.vue';
import HeaderMenu from './components/HeaderMenu.vue';
import FloorplanHeader from './components/FloorplanHeader.vue';
import Accordion from './components/Accordion.vue'

export default {
  components: {
    ManageDesks,
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
