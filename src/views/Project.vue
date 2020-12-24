<template>
  <div class="project" v-if="project">
    <h1>Project {{ $route.params.project_number }}</h1>
    <h2>Project: {{ project.project_title }}</h2>
    <h2>Lead Office: {{ project.project_lead_office }}</h2>
    <h2>Client: {{ project.client }}</h2>
    <h2>Stage: {{ project.stage }}</h2>
  </div>
  <button class="delButton" @click="handleDelete">Delete this project</button>
  <RecordIssues :project="project" v-if="project" />
  <Spinner v-else />
</template>

<script>
import { useRoute } from "vue-router";
import getSingleProject from "@/composables/getSingleProject.js";
import removeProject from "@/composables/removeProject";
import router from "@/router";
import Spinner from "@/components/Spinner";
import RecordIssues from "@/components/RecordIssues";

export default {
  components: { Spinner, RecordIssues },
  setup(props, { emit }) {
    const route = useRoute();

    const { project, loadSingleProject } = getSingleProject();
    loadSingleProject(route.params.project_number);

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
.project {
  background: lightblue;
}
.delButton {
  display: inline-block;
  background: red;
  border: 2px solid;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
}
.delButton:active {
  color: green;
}
.delButton:hover {
  color: blue;
}
</style>
