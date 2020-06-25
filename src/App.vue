<template>
  <div id="app">
   <!-- <HelloWorld msg="Hi Vue"/>
    <table01></table01>-->
    <tablePage></tablePage>
  </div>
</template>

<script>/*
import HelloWorld from './components/HelloWorld.vue'
import table01 from "./demo/table01.vue";*/
import tablePage from "./demo/tablePage.vue";
export default {
  name: 'App',
  components: {
    /*HelloWorld,
    table01,*/
    tablePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
