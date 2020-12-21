<template>
  <div class="project">
    <h1>Project {{ $route.params.project_number }}</h1>
    <h2>Project: {{ project.project_title }}</h2>
    <h2>Lead Office: {{ project.project_lead_office }}</h2>
    <h2>Client: {{ project.client }}</h2>
    <h2>Stage: {{ project.stage }}</h2>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import getSingleProject from "@/composables/getSingleProject.js";

export default {
  setup() {
    const route = useRoute();

    const { project, loadSingleProject } = getSingleProject();
    loadSingleProject(route.params.project_number);

    return { project };
  },
};
</script>

<style>
.project {
  background: lightblue;
}
</style>
