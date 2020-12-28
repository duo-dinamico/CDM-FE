<template>
  <section>
    <h1>
      {{ project.project_title }}
    </h1>
    <h3>{{ project.project_number }}</h3>
    <h5>{{ project.client }}</h5>
    <h5>{{ project.stage }}</h5>
  </section>
</template>

<script>
export default {
  props: ["project"],
  setup() {},
};
</script>

<style>
h1 {
  padding: 10px 5px 5px 10px;
  margin: 0px 0px 0px 0px;
  cursor: pointer;
}
h3 {
  padding: 5px 5px 5px 10px;
  margin: 0px 0px 100px 0px;
  cursor: pointer;
}
h5 {
  padding: 5px 5px 5px 10px;
  margin: 0px 0px 0px 0px;
  cursor: pointer;
}
</style>