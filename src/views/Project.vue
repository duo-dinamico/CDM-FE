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
import { useRoute} from "vue-router"

export default {
  props: ["projects", "project_number"],
  setup(props) {
    const route = useRoute();
    console.log(route.params)
    let project = reactive({});

    const singleProject = () => {
      console.log("temp: ", tempProject)
      // console.log("Params: ", $route.params.project_number)
      // const tempProject = props.projects.filter(
      //   (proj) => {
      //     console.log(proj.project_number, props.project_number, proj.project_number === props.project_number)
      //     return proj.project_number === props.project_number}
      // );
      const tempProject = () => {
        console.log("start of temp")
        console.log("start of temp projects", props.projects)
        for (let proj of props.projects) {
          console.log("inside temp, project number: ", proj.project_number)
          if (proj.project_number == route.params.project_number) {
            console.log("inside temp, proj: ", proj)
            return proj
          }
          else {
            console.log("fail")
          }
      }}
      console.log("outside temp, tempProject: ", tempProject)
      project = tempProject();
      console.log("outside temp, project: ", project);
    };

    singleProject();

    return { singleProject, project };
  },
};
</script>

<style>
.project {
  background: lightblue;
}
</style>
