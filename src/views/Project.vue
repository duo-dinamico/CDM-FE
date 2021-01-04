<template>
  <div v-if="project">
    <ProjectComponent
      @reload="$emit('reload')"
      @reload-project="loadSingleProject"
      :project="project"
      :stageselect="stageselect"
    />
    <RecordIssues :stage="project.stage" />
  </div>
  <Spinner v-else />
</template>

<script>
import getSingleProject from "@/composables/getSingleProject";
import Spinner from "@/components/Spinner";
import RecordIssues from "@/components/RecordIssues";
import ProjectComponent from "@/components/ProjectComponent";

export default {
  props: ["stageselect"],
  emits: ["reload"],
  components: { Spinner, RecordIssues, ProjectComponent },
  setup() {
    // this section is for fetching a single project
    const { project, loadSingleProject } = getSingleProject();
    loadSingleProject();

    return { project, loadSingleProject };
  },
};
</script>

<style>
</style>
