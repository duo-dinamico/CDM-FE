<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/project/:project_number">Project</router-link>
      <router-link to="/project/:project_number/register">Register</router-link>
    </div>
    <button @click="load">Click here</button>
    <div v-for="project in projects" :key="project.project_number">
      
          {{ project.project_title }}
      
    </div>
    <router-view />
  </div>
</template>

<script>
import { getProjects } from "@/api";
import { reactive } from "vue";

export default {
  setup() {
    const projects = reactive([]);

    const load = async () => {
        projects.value = await getProjects()
        console.log(projects.value)
    }

    return { projects, load };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
