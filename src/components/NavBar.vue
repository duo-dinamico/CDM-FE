<template>
  <nav class="nav-bar">
    <router-link :to="{ name: 'Home' }">CDM Risk Register</router-link>
    <select id="project" @change="changeProject">
      <option value="none" selected disabled hidden>Select a project</option>
      <option
        v-for="project in projects"
        :key="project.project_number"
        :value="project.project_number"
      >
        {{ `${project.project_number} - ${project.project_title}` }}
      </option>
    </select>
  </nav>
</template>

<script>
import router from "@/router";

export default {
  props: ["projects"],
  setup() {
    const changeProject = (event) => {
      router.push({
        name: "Project",
        params: { project_number: event.target.value },
      });
      event.target.selectedIndex = 0;
    };

    return { changeProject };
  },
};
</script>

<style scoped>
.nav-bar {
  font-weight: bold;
  background: var(--very-dark);
  height: 2.5rem;
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}
.nav-bar a {
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  margin: 0px 10px;
  padding: 5px;
}
.nav-bar a:visited,
a:active {
  color: white;
  text-decoration: none;
}
.nav-bar a:hover {
  color: var(--dark);
}
select {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
select::-ms-expand {
  display: none;
}
select:hover {
  border-color: #888;
}
select option {
  font-weight: normal;
}
</style>
