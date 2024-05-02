<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <VueSlider 
    v-model="zoom" 
    :lazy="true" 
    :min="1"
    :max="20"
    :interval="0.1"
    :tooltip="'none'"
    >
  </VueSlider>
  <SequenceViewer 
    :zoom_level="zoom"
    :key="zoom">
  </SequenceViewer>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SequenceViewer from './components/SequenceViewer.jsx'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'


export default {
  name: 'App',
  components: {
    HelloWorld,
    VueSlider,
    SequenceViewer
  },

  data() {
    return {
      zoom: 20
    }
  },

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
