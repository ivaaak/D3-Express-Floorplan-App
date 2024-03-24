<template>
  <main>
    <HeaderMenu></HeaderMenu>
    <div class='parent'>
      <div id="demo">
        <div id="sidepanel">
          <AddEmployee></AddEmployee>
          <ManageDesks></ManageDesks>
          <Calendar></Calendar>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AddEmployee from './components/AddEmployee.vue';
import ManageDesks from './components/ManageDesks.vue';
import Calendar from './components/Calendar.vue';
import HeaderMenu from './components/HeaderMenu.vue';

export default {
 components: {
    AddEmployee,
    ManageDesks,
    Calendar,
    HeaderMenu
 },
};
</script>

<style scoped>
svg {
  border: 4px solid black;
}
</style>
