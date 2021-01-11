<template>
  <div id="app">
    <NavBar :projects="projects" />
    <SecNavBar />
    <router-view
      :stageselect="stageSelect"
      :key="$route.fullPath"
      :projects="projects"
      @reload="toggleLoading"
      v-if="!isLoading"
    />
    <Spinner v-else />
  </div>
</template>

<script>
import SecNavBar from "@/components/SecNavBar.vue";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/Spinner";
import getProjects from "@/composables/getProjects";
import { ref } from "vue";

export default {
  components: { NavBar, SecNavBar, Spinner },
  setup() {
    const { projects, loadProjects } = getProjects();

    const isLoading = ref(false);
    const toggleLoading = async () => {
      isLoading.value = true;
      await loadProjects();
      isLoading.value = false;
    };
    toggleLoading();

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

    return {
      projects,
      toggleLoading,
      stageSelect,
      isLoading,
    };
  },
};
</script>

<style>
:root {
  --very-dark: #dfdede8c;
}

#app {
  display: inline-flexbox;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0 0 0 0;
  background: var(--very-dark);
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0 0 0 0;
}
</style>
