<template>
  <form @submit.prevent="handleSubmitProject">
    <label for="project_number">Project Number:</label>
    <input
      type="text"
      id="project_number"
      v-model="newProject.project_number"
      @keyup="checkProjectNumber"
      @change="checkIfProjectExists"
      required
    />
    <span v-if="projectNumberError">{{ projectNumberError }}</span
    ><br />

    <label for="project_title">Project Title:</label>
    <input
      type="text"
      id="project_title"
      v-model="newProject.project_title"
      required
    /><br />

    <label for="project_lead_office">Project Lead Office:</label>
    <input
      type="text"
      id="project_lead_office"
      v-model="newProject.project_lead_office"
      required
    /><br />

    <label for="client">Client:</label>
    <input type="text" id="client" v-model="newProject.client" required /><br />

    <label for="stage">Stage:</label>
    <select id="stage" @change="changeStage">
      <option v-for="option in stageSelect" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <button>Submit Project</button>
  </form>
</template>

<script>
import insertProject from "../composables/postProject.js";
import { reactive, ref } from "vue";
import router from "@/router";

export default {
  props: ["projects"],
  emits: ["reload"],
  setup(props, { emit }) {
    const stageSelect = [
      "Approval in Principle",
      "As-Built",
      "Construction",
      "Demolition",
      "Detailed Design",
      "Feasibility / Masterplanning",
      "Operation / Maintenance",
      "Outline Design",
      "Rail - GRIP 3 - Option Selection",
      "Rail - GRIP 4 - Approval in Principle",
      "Rail - GRIP 5 - Detail Design / AFC",
      "Rail - GRIP 6 - Construction on Site",
      "Rail - GRIP 7 - As-Built Records",
    ];
    const newProject = reactive({
      project_number: "",
      project_title: "",
      project_lead_office: "",
      client: "",

      stage: "Approval in Principle",
    });

    const projectNumberError = ref(null);

    const checkProjectNumber = () => {
      const regexPattern = /^[0-9]{6}-[0-9]{2}$/gm;
      if (regexPattern.test(newProject.project_number)) {
        projectNumberError.value = null;
      } else {
        projectNumberError.value =
          "The project number must follow the standard '123456-78'";
      }
    };

    const changeStage = ($event) => {
      newProject.stage = $event.target.value;
    };

    const checkIfProjectExists = () => {
      for (const project of props.projects) {
        if (
          project.project_number === newProject.project_number &&
          newProject.project_number.length === 9
        ) {
          projectNumberError.value = `${newProject.project_number} already exists.`;
        }
      }
    };

    const handleSubmitProject = async () => {
      if (projectNumberError.value === null) {
        await insertProject(newProject);
        await router.push({
          name: "Project",
          params: { project_number: newProject.project_number },
        });
        await emit("reload");
      }
    };

    return {
      newProject,
      changeStage,
      stageSelect,
      handleSubmitProject,
      projectNumberError,
      checkProjectNumber,
      checkIfProjectExists,
    };
  },
};
</script>

<style>
</style>