<template>
  <div id="app">
    <table01></table01>
  </div>
</template>

<script>
import table01 from "./demo/table01";
export default {
  name: 'App',
  components: {
    table01,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
