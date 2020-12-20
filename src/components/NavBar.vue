<template>
  <nav id="nav-bar">
    <router-link to="/">CDM Risk Register</router-link>
    <label for="project">Project:</label>
    <select id="project" @change="changeProject" >
      <option value="none" selected disabled hiden>Select an option</option>
      <option v-for="project in projects" :key="project.project_number" :value="project.project_number">
        {{ project.project_title }}
      </option>
    </select>
  </nav>
</template>

<script>
import router from "@/router"
export default {
  props: ["projects"],
  setup() {
    const changeProject = ($event) => {
      router.push({
        name: "Project",
        params: { project_number: $event.target.value}
      })
    }

    return {changeProject}
  }
};
</script>

<style>
#nav-bar {
  background: #f05023;
  height: 2rem;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
