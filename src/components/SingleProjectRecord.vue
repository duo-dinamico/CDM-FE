<template>
  <tr>
    <form @submit.prevent="handleEditRecord" id="editRecordForm"></form>
    <td>
      <button @click="toggleRecordEditable" v-if="!isEditing">📝</button>
      <div v-else>
        <button @click="handleEditRecord">✅</button>
        <button @click="cancelRecordEdit">🚫</button>
      </div>
      <button @click="handleDelete">❌</button>
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="version_number"
        disabled
      />
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="stage_issued"
        disabled
      />
    </td>
    <td v-if="isEditing">
      <select id="purpose" v-model="purpose" form="newRecordForm" required>
        <option v-for="option in purposelist" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </td>
    <td v-else>
      <input
        type="text"
        form="editRecordForm"
        v-model="purpose"
        :disabled="!isEditing"
      />
    </td>

    <td v-if="isEditing">
      <input type="date" form="editRecordForm" :disabled="!isEditing" />
    </td>
    <td v-else>
      {{ date.substring(0, 10) }}
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="prepared"
        :disabled="!isEditing"
      />
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="checked"
        :disabled="!isEditing"
      />
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="approved"
        :disabled="!isEditing"
      />
    </td>
    <td>
      <input
        type="text"
        form="editRecordForm"
        v-model="remarks"
        :disabled="!isEditing"
      />
    </td>
  </tr>
</template>

<script>
import patchProjectRecord from "@/composables/patchProjectRecord";
import delProjectRecord from "@/composables/delProjectRecord";
import { ref, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  props: ["projectRecord", "purposelist"],
  emits: ["reload-records", "toggle-loading"],
  setup(props, { emit }) {
    // route variable for route related actions
    const route = useRoute();

    // this section is for editing a record
    const isEditing = ref(false);
    const toggleRecordEditable = () => {
      isEditing.value = true;
    };
    const cancelRecordEdit = () => {
      isEditing.value = false;
    };
    const handleEditRecord = async () => {
      emit("toggle-loading");
      await patchProjectRecord(
        route.params.project_number,
        props.projectRecord.version_number,
        props.projectRecord
      );
      await emit("reload-records");
      await emit("toggle-loading");
      isEditing.value = false;
    };

    // this section is for deleting a record
    const handleDelete = async () => {
      emit("toggle-loading");
      await delProjectRecord(
        route.params.project_number,
        props.projectRecord.version_number
      );
      await emit("reload-records");
      emit("toggle-loading");
    };

    // ***DO NOT DELETE*** for future referece
    // watch(
    //   projectRecords,
    //   (oldValue, newValue) => {
    //     console.log(oldValue, newValue);
    //   },
    //   { deep: true }
    // );

    return {
      ...toRefs(props.projectRecord),
      handleDelete,
      handleEditRecord,
      toggleRecordEditable,
      isEditing,
      cancelRecordEdit,
    };
  },
};
</script>

<style>
</style>