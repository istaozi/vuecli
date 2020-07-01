<template>
  <div id="app">
   <!-- <HelloWorld msg="Hi Vue"/>
    <table01></table01>
    <tablePage></tablePage>
      <excel-file></excel-file>-->
      <hi-checkbox></hi-checkbox>
  </div>
</template>

<script>/*
import HelloWorld from './components/HelloWorld.vue'
import table01 from "./demo/table01.vue";*/
//import tablePage from "./demo/tablePage.vue";
//import excelFile from "./demo/excelFile.vue";
import HiCheckbox from './components/HiCheckbox/index'

//import mm from "./demo/mm.vue";
export default {
  name: 'App',
  components: {
    /*HelloWorld,
    table01,
    tablePage
    excelFile*/
      HiCheckbox,
  }
}
</script>

<style>
#app {
}
</style>
