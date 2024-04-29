<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <VueSlider 
    v-model="zoom" 
    @change="updateZoom" 
    :lazy="true" 
    :min="1"
    :max="20"
    :interval="0.1"
    :tooltip="'none'"
    >
  </VueSlider>
  <svg id="viewer" width="100%"></svg>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SequenceViewer from '@/components/SequenceViewer.js'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'


export default {
  name: 'App',
  components: {
    HelloWorld,
    VueSlider
  },
  data() {
    return {
      zoom: 5, // initial value
    }
  },
  methods: {
    updateZoom(zoom) {
      SequenceViewer(zoom)
    },
    zoomOut () {
        this.zoom = (this.zoom - 1) || 1
    },
    zoomIn () {
      this.zoom = (this.zoom + 1) || 10
    },
  },
  mounted() {
    SequenceViewer(5)
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
