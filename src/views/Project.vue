<template>
  <div>
    <div class="project" v-if="project">
      <h1>Project {{ $route.params.project_number }}</h1>
      <h2>Project: {{ project.project_title }}</h2>
      <h2>Lead Office: {{ project.project_lead_office }}</h2>
      <h2>Client: {{ project.client }}</h2>
      <h2>Stage: {{ project.stage }}</h2>
    </div>
    <RecordIssues v-if="project" />
    <Spinner v-else />
  </div>
</template>

<script>
import getSingleProject from "@/composables/getSingleProject.js";
import removeProject from "@/composables/removeProject";
import router from "@/router";
import Spinner from "@/components/Spinner";
import RecordIssues from "@/components/RecordIssues";
import { useRoute } from 'vue-router';

export default {
  props: ["projects"],
  emits: ["reload"],
  components: { Spinner, RecordIssues },
  setup(_, {emit}) {
    const { project, loadSingleProject } = getSingleProject();
    loadSingleProject();
    const route = useRoute();

    const handleDelete = async () => {
      await removeProject(route.params.project_number);
      await router.push({
        name: "Home",
      });
      await emit("reload");
    };

    return { project, handleDelete };
  },
};
</script>

<style>

</style>
