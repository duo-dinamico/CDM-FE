<template>
  <div id="app">
    <NavBar :projects="projects" />
    <SecNavBar :projects="projects" />
    <router-view
      :key="$route.fullPath"
      :projects="projects"
      @reload="loadProjects"
      v-if="projects.length"
    />
    <Spinner v-else />
  </div>
</template>

<script>
import SecNavBar from "@/components/SecNavBar.vue";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/Spinner";
import getProjects from "@/composables/getProjects";

export default {
  components: { NavBar, SecNavBar, Spinner },
  setup() {
    const { projects, loadProjects } = getProjects();

    loadProjects();

    return { projects, loadProjects };
  },
};
</script>

<style>
#app {
  display: inline-flexbox;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0 0 0 0;
  background: #dfdede8c;
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0 0 0 0;
}
</style>
