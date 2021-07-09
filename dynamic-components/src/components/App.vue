<template>
  <div>
    <select v-model="componentName">
      <option value="Home">Home</option>
      <option value="About">About</option>
    </select>
    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
import About from './About.vue';
import Home from './Home.vue';
export default {
  name: 'App',
  components: {About, Home},
  data() {
    return {
      componentName: "Home"
    }
  }
};
</script>
