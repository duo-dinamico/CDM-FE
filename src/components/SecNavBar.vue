<template>
  <nav class="sec-nav-bar">
    <router-link v-if="route.name === 'Home'" :to="{ name: 'Add New Project' }"
      >Add New Project</router-link
    >
    <div
      v-if="
        route.name === 'Project' ||
        route.name === 'Register' ||
        route.name === 'Risk'
      "
    >
      <router-link :to="{ name: 'Project' }"> Document Control</router-link>
      <router-link :to="{ name: 'Register' }"> Master Register</router-link>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    // route variable for route related actions
    const route = useRoute();

    return { route };
  },
};
</script>

<style scoped>
.router-link-active {
  cursor: not-allowed;
  color: var(--very-dark);
}
.sec-nav-bar {
  font-weight: bold;
  background: var(--dark);
  height: 2.5rem;
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.sec-nav-bar a {
  text-decoration: none;
  text-transform: uppercase;
  margin: 0px 10px;
  padding: 5px;
}
:not(.router-link-active) {
  color: white;
  text-decoration: none;
}
.sec-nav-bar a:hover {
  color: var(--very-dark);
}
</style>
