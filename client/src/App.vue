<template>
  <header>
    <h1>
      <div class="title">D3 JS Floorplan App<img alt="Vue logo" class="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png" 
        width="35" height="35" />
      </div>
      <!-- <div class="search">
        Search for:
        <input> </input>
      </div> -->
    </h1>
  </header>


  <main>
    <div class='parent'>
      <div id="demo">
      <div id="sidepanel">
        <AddEmployee></AddEmployee>
        <ManageDesks></ManageDesks>
      </div>
    </div>
</div>
    
  </main>
</template>

<script>
import AddEmployee from './components/AddEmployee.vue';
import ManageDesks from './components/ManageDesks.vue'
export default {
 components: {
    AddEmployee,
    ManageDesks
 },
 // other options...
};
</script>

<style scoped>
svg {
  border: 4px solid black;
}
</style>
