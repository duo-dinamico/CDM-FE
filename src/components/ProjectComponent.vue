<template>
  <Spinner v-if="isLoading" />
  <div class="project" v-else>
    <form @submit.prevent="handleEditProject" id="editProjectForm"></form>
    <div v-if="!isEditing">
      <button @click="toggleProjectEditable">📝</button>
      <button @click="handleDelete">❌</button>
    </div>
    <div v-else>
      <button @click="handleEditProject">✅</button>
      <button @click="cancelRecordEdit">🚫</button>
    </div>
    <p>Project Number: {{ $route.params.project_number }}</p>
    <label for="project_title">Project Title: </label>
    <input
      type="text"
      form="editProjectForm"
      id="project_title"
      v-model="project_title"
      :disabled="!isEditing"
    />
    <br />
    <label for="project_lead_office">Project Lead Office: </label>
    <input
      type="text"
      form="editProjectForm"
      id="project_lead_office"
      v-model="project_lead_office"
      :disabled="!isEditing"
    />
    <br />
    <label for="client">Client: </label>
    <input
      type="text"
      form="editProjectForm"
      id="client"
      v-model="client"
      :disabled="!isEditing"
    />
    <br />
    <label for="stage">Stage: </label>
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

<style>
input:disabled {
  background: #dfdede8c;
  border: 0px;
  color: black;
  font-size: 16px;
}
</style>