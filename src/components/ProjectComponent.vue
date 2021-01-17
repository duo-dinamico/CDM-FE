<template>
  <Spinner v-if="isLoading" />
  <div class="project" v-else>
    <form @submit.prevent="handleEditProject" id="editProjectForm"></form>
    <h2>Project Details</h2>
    <div v-if="!isEditing">
      <button @click="toggleProjectEditable">📝</button>
      <button @click="handleDelete">❌</button>
    </div>
    <div v-else>
      <button @click="handleEditProject">✅</button>
      <button @click="cancelRecordEdit">🚫</button>
    </div>
    <h3>Project Number:</h3>
    <p>{{ $route.params.project_number }}</p>
    <label for="project_title"><h3>Project Title:</h3></label>
    <input
      type="text"
      form="editProjectForm"
      id="project_title"
      v-model="project_title"
      :disabled="!isEditing"
    />

    <label for="project_lead_office"><h3>Project Lead Office:</h3></label>
    <input
      type="text"
      form="editProjectForm"
      id="project_lead_office"
      v-model="project_lead_office"
      :disabled="!isEditing"
    />

    <label for="client"><h3>Client:</h3></label>
    <input
      type="text"
      form="editProjectForm"
      id="client"
      v-model="client"
      :disabled="!isEditing"
    />

    <label for="stage"><h3>Stage:</h3></label>
    <select id="stage" v-if="isEditing" v-model="stage" form="editProjectForm">
      <option v-for="stage in stageselect" :key="stage" :value="stage">
        {{ stage }}
      </option>
    </select>
    <input
      v-else
      type="text"
      form="editProjectForm"
      id="stage"
      v-model="stage"
      disabled
    />
  </div>
</template>

<script>
import removeProject from "@/composables/removeProject";
import patchProject from "@/composables/patchProject";
import Spinner from "@/components/Spinner";
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, reactive, toRefs } from "vue";

export default {
  props: ["project", "stageselect"],
  emits: ["reload", "reload-project"],
  components: { Spinner },
  setup(props, { emit }) {
    // this section is for editing a project
    const isEditing = ref(false);
    const isLoading = ref(false);
    const cachedProject = reactive({});
    Object.assign(cachedProject, props.project);
    const toggleProjectEditable = () => {
      isEditing.value = true;
    };
    const cancelRecordEdit = () => {
      Object.assign(cachedProject, props.project);
      isEditing.value = false;
    };
    const handleEditProject = async () => {
      isLoading.value = true;
      await patchProject(route.params.project_number, cachedProject);
      await emit("reload-project");
      isEditing.value = false;
      isLoading.value = false;
    };

    // this function will delete a project from the db
    const route = useRoute();
    const handleDelete = async () => {
      if (confirm("Are you sure you want to delete?")) {
        await removeProject(route.params.project_number);
        await emit("reload");
        await router.push({
          name: "Home",
        });
      }
    };

    return {
      ...toRefs(cachedProject),
      handleDelete,
      handleEditProject,
      isEditing,
      toggleProjectEditable,
      cancelRecordEdit,
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
  text-transform: uppercase;
}
.project {
  display: block;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
}
.project h3 {
  display: block;
  margin: 0px 0px 0px 10px;
}
.project input,
p,
select {
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 10px;
}
input {
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
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
input:disabled {
  background: white;
  box-sizing: border-box;
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  padding: 0px 0px 0px 0px;
  border: 1px solid white;
  color: black;
  cursor: default;
}
button {
  margin: 30px 0px 10px 10px;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 5%;
  min-width: 5%;
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
select {
  font-weight: 700;
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
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