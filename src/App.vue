<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/project/:project_number">Project</router-link>
      <router-link to="/project/:project_number/register">Register</router-link>
    </div>
    <NavBar />
    <SecNavBar />
    <router-view />
  </div>
</template>

<script>
import { getProjects } from "@/api";
import { reactive } from "vue";
import SecNavBar from "./components/SecNavBar.vue";
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar, SecNavBar },
  setup() {
    let projects = reactive([]);

    const load = async () => {
      let data = await getProjects();
      console.log(data);
      for (let proj of data) {
        projects.push(proj);
      }
    };
    load();

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
  margin-top: 0px;
}
</style>
