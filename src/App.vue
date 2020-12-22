<template>
  <div id="app">
    <NavBar :projects="projects"/>
    <SecNavBar :projects="projects" />
    <router-view />
  </div>
</template>

<script>
import SecNavBar from "@/components/SecNavBar.vue";
import NavBar from "@/components/NavBar";
import getProjects from "@/composables/getProjects";

export default {
  components: { NavBar, SecNavBar },
  setup() {
    const { projects, loadProjects } = getProjects();

    loadProjects();

    return { projects };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0px;
}
body {
  margin: 0 0 0 0;
}
</style>
