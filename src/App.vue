<template>
  <div id="app">
    <div class="content">
      <upload class="upload"></upload>
      <word></word>
    </div>
  </div>
</template>

<script>
import word from './components/word'
import upload from './components/upload'
import Word from './components/word.vue'
export default {
  name: 'App',
  components: {
    word,
    upload
  }
}

    Word</script>

<style lang="scss">
@import './scss/index.scss';

.upload{
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
