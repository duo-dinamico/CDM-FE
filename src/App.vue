<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/project/:project_number">Project</router-link>
      <router-link to="/project/:project_number/register">Register</router-link>
    </div>
    <button @click="addProject">Click to add new project</button>
    <div>
      <ul>
        <li v-for="project in projects" :key="project.project_number">{{ project.project_title }}</li>
      </ul>
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

    const load = () => {
      getProjects().then((res) => {
        for (let x of res) {
          projects.push(x)
        }
      })
    }

    const addProject = () => {
      projects.push({"project_number":"454545","project_title":"New Project","project_lead_office":"Atenas","client":"Arup","stage":"Demolition"})
    }

    return { projects, load, addProject };
  },
  mounted() {
    this.load()
  }
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
