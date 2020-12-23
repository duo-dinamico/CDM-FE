<template>
  <div class="home">
    <ProjectCard
      class="project-card"
      v-for="project in projects"
      :project="project"
      :key="project.project_number"
      :title="project.project_number"
      @click.self="handleProjectSelect"
    />
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import router from "@/router";

export default {
  props: ["projects"],
  emits: ["reload"],
  components: { ProjectCard },
  setup() {
    const handleProjectSelect = ($event) => {
      router.push({
        name: "Project",
        params: { project_number: $event.target.title },
      });
    };
    return { handleProjectSelect };
  },
};
</script>

<style>
.home {
  display: flex;
  margin: 0 0 0 0;
  flex-wrap: wrap;
}
.project-card {
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
  cursor: pointer;
}
</style>
