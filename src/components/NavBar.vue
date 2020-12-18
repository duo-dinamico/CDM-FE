<template>
  <div class="nav-bar">
    <h1>NAV</h1>
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/project/:project_number">Project</router-link>
      <router-link to="/project/:project_number/register">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  background: red;
}

.nav-bar a {
    color: yellow;
    display: inline-block;
    padding: 10px;
}
</style>
