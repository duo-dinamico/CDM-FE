<template>
  <nav class="sec-nav-bar">
    <router-link v-if="route.name === 'Home'" :to="{ name: 'Add New Project' }"
      >Add New Project</router-link
    >
    <router-link v-if="route.name === 'Project'" :to="{ name: 'Register' }">
      Master Register</router-link
    >
    <router-link v-if="route.name === 'Register'" :to="{ name: 'Project' }">
      Master Record</router-link
    >
  </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    // route variable for route related actions
    const route = useRoute();

    return { route };
  },
};
</script>

<style>
.sec-nav-bar {
  background: #cacaca;
  height: 2rem;
  top: 50px;
  margin: 0px 0 0 0;
}

.sec-nav-bar a {
  display: inline-block;
  text-decoration: none;
  margin: 0px 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
}
</style>
