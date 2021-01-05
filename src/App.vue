<template>
  <div id="app">
    <NavBar :projects="projects" />
    <SecNavBar />
    <router-view
      :stageselect="stageSelect"
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

    const stageSelect = [
      "Approval in Principle",
      "As-Built",
      "Construction",
      "Demolition",
      "Detailed Design",
      "Feasibility / Masterplanning",
      "Operation / Maintenance",
      "Outline Design",
      "Rail - GRIP 3 - Option Selection",
      "Rail - GRIP 4 - Approval in Principle",
      "Rail - GRIP 5 - Detail Design / AFC",
      "Rail - GRIP 6 - Construction on Site",
      "Rail - GRIP 7 - As-Built Records",
    ];

    return { projects, loadProjects, stageSelect };
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
