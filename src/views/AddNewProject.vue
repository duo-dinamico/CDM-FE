<template>
  <Spinner v-if="isLoading" />
  <form @submit.prevent="handleSubmitProject" v-else class="add-project">
    <h2>Please input information related to the new project</h2>
    <label for="project_number">Project Number:</label>
    <input
      type="text"
      id="project_number"
      v-model="newProject.project_number"
      @keyup="checkProjectNumber"
      @change="checkIfProjectExists"
      required
    />
    <span v-if="projectNumberError">{{ projectNumberError }}</span>
    <label for="project_title">Project Title:</label>
    <input
      type="text"
      id="project_title"
      v-model="newProject.project_title"
      required
    />
    <label for="project_lead_office">Project Lead Office:</label>
    <input
      type="text"
      id="project_lead_office"
      v-model="newProject.project_lead_office"
      required
    />
    <label for="client">Client:</label>
    <input type="text" id="client" v-model="newProject.client" required />

    <label for="stage">Stage:</label>
    <select id="stage" @change="changeStage">
      <option v-for="option in stageselect" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <button>Submit Project</button>
  </form>
</template>

<script>
import Spinner from "@/components/Spinner";
import insertProject from "../composables/postProject.js";
import { reactive, ref } from "vue";
import router from "@/router";

export default {
  props: ["projects", "stageselect"],
  emits: ["reload"],
  components: { Spinner },
  setup(props, { emit }) {
    const newProject = reactive({
      project_number: "",
      project_title: "",
      project_lead_office: "",
      client: "",
      stage: "Approval in Principle",
    });
    const projectNumberError = ref(null);
    const isLoading = ref(false);

    const checkProjectNumber = () => {
      const regexPattern = /^[0-9]{6}-[0-9]{2}$/gm;
      if (regexPattern.test(newProject.project_number)) {
        projectNumberError.value = null;
      } else {
        projectNumberError.value =
          "The project number must follow the standard '123456-78'";
      }
    };

    const changeStage = (event) => {
      newProject.stage = event.target.value;
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
        isLoading.value = true;
        await insertProject(newProject);
        isLoading.value = false;
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
      handleSubmitProject,
      projectNumberError,
      checkProjectNumber,
      checkIfProjectExists,
      isLoading,
    };
  },
};
</script>

<style scoped>
h2 {
  background-color: var(--medium);
  border-radius: 10px 10px 0px 0px;
  padding: 10px 5px 5px 10px;
  margin: 0px 0px 0px 0px;
  cursor: pointer;
}
.add-project {
  display: block;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
}
.add-project input,
select,
label,
span {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}
span {
  font-size: 12px;
  color: red;
}
button {
  margin: 30px 0px 10px 10px;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
button:hover {
  background-color: var(--very-dark);
  color: white;
}
input {
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
select {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #444;
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  border: 1px solid #aaa;
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
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