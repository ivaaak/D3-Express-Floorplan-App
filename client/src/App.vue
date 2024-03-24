<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="floorplanContainer">
        <FloorplanHeader></FloorplanHeader>
        <div id="demo"></div>
      </div>
      <div id="sidepanel">
        <AddEmployee></AddEmployee>
        <ManageDesks></ManageDesks>
        <Calendar></Calendar>
      </div>
    </div>
  </main>
</template>

<script>
import AddEmployee from './components/AddEmployee.vue';
import ManageDesks from './components/ManageDesks.vue';
import Calendar from './components/Calendar.vue';
import HeaderMenu from './components/HeaderMenu.vue';
import FloorplanHeader from './components/FloorplanHeader.vue';


export default {
  components: {
    AddEmployee,
    ManageDesks,
    Calendar,
    HeaderMenu,
    FloorplanHeader
  },
};
</script>

<style scoped>
svg {
  border: 4px solid black;
}
</style>
