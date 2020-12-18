<template>
  <div id="app">
    <NavBar />
    
    <button @click="addProject">Click to add new project</button>
    <div v-if="projects.length">
      <ul>
        <li v-for="project in projects" :key="project.project_number">
          {{ project.project_title }}
        </li>
      </ul>
    </div>
    <div v-else>
      <h1>Loading</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getProjects } from "@/api";
import { reactive } from "vue";
import NavBar from "@/components/NavBar"

export default {
  components: {NavBar},
  setup() {
    let projects = reactive([]);

    const load = async () => {
      let data = await getProjects()
      console.log(data)
      for (let proj of data) {
        projects.push(proj)
      }
    }

    const addProject = () => {
      projects.push({
        project_number: "454545",
        project_title: "New Project",
        project_lead_office: "Atenas",
        client: "Arup",
        stage: "Demolition",
      });
    };

    load();

    return { projects, load, addProject };
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
