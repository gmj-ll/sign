<template>
  <div id="app">
    <word></word>
  </div>
</template>

<script>
import word from './components/word'
export default {
  name: 'App',
  components: {
    word
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
