<template>
  <div class="home" v-if="projects.length">
    <ProjectCard
      class="project-card"
      v-for="project in projects"
      :project="project"
      :key="project.project_number"
      @click="handleProjectSelect(project.project_number)"
    />
  </div>
  <p v-else>No projects available</p>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import router from "@/router";

export default {
  props: ["projects"],
  emits: ["reload"],
  components: { ProjectCard },
  setup() {
    const handleProjectSelect = (project_number) => {
      router.push({
        name: "Project",
        params: { project_number: project_number },
      });
    };

    return { handleProjectSelect };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  margin: 0 0 0 0;
  flex-wrap: wrap;
}
.project-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: white;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
  cursor: pointer;
}
.project-card:hover {
  background: var(--very-light);
}
</style>
