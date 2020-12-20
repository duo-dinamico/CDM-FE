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
import { reactive } from "vue";
import { useRoute } from "vue-router";
import getProjects from "@/composables/getProjects.js";

export default {
  // props: ["projects"],
  setup() {
    const { projects, loadProjects } = getProjects();

    const route = useRoute();
    console.log("route params", route.params);

    let project = reactive({});

    for (let i; i < projects.length; i++) {
      console.log("iiiiii: ", i);
    }

    const singleProject = () => {
      console.log("temp: ", tempProject);
      // console.log("Params: ", $route.params.project_number)
      // const tempProject = props.projects.filter(
      //   (proj) => {
      //     console.log(proj.project_number, props.project_number, proj.project_number === props.project_number)
      //     return proj.project_number === props.project_number}
      // );
      const tempProject = () => {
        console.log("start of temp");
        // console.log("start of temp projects", props.projects)
        for (let i; i < projects.length; i++) {
          console.log(
            "inside temp, project number: ",
            route.params.project_number
          );
          if (projects[i].project_number == route.params.project_number) {
            console.log("inside temp, proj: ", projects[i]);
            return projects[i];
          } else {
            console.log("fail");
          }
        }
      };
      console.log("outside temp, tempProject: ", tempProject);
      project = tempProject();
      console.log("outside temp, project: ", project);
    };
    loadProjects();
    console.log(projects);
    singleProject();

    return { project };
  },
};
</script>

<style>
.project {
  background: lightblue;
}
</style>
