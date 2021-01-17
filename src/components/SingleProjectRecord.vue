<template>
  <tr v-if="projectRecord">
    <form @submit.prevent="handleEditRecord" id="editRecordForm"></form>
    <td>
      <div v-if="!isEditing">
        <button @click="toggleRecordEditable">📝</button>
        <button @click="handleDelete">❌</button>
      </div>
      <div v-else>
        <button @click="handleEditRecord">✅</button>
        <button @click="cancelRecordEdit">🚫</button>
      </div>
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
import { reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  props: ["projectRecord", "purposelist"],
  emits: ["reload-records", "toggle-loading"],
  setup(props, { emit }) {
    // route variable for route related actions
    const route = useRoute();

    // this section is for editing a record
    const isEditing = ref(false);
    const cachedProjectRecord = reactive({
      version_number: "",
      stage_issued: "",
      purpose: "",
      date: "",
      prepared: "",
      checked: "",
      approved: "",
      remarks: "",
    });
    if (props.projectRecord) {
      Object.assign(cachedProjectRecord, props.projectRecord);
    }
    const toggleRecordEditable = () => {
      isEditing.value = true;
    };
    const cancelRecordEdit = () => {
      Object.assign(cachedProjectRecord, props.projectRecord);
      isEditing.value = false;
    };
    const handleEditRecord = async () => {
      emit("toggle-loading");
      await Object.assign(props.projectRecord, cachedProjectRecord);
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
      if (confirm("Are you sure you want to delete?")) {
        emit("toggle-loading");
        await delProjectRecord(
          route.params.project_number,
          props.projectRecord.version_number
        );
        await emit("reload-records");
        emit("toggle-loading");
      }
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
      ...toRefs(cachedProjectRecord),
      handleDelete,
      handleEditRecord,
      toggleRecordEditable,
      isEditing,
      cancelRecordEdit,
    };
  },
};
</script>

<style scoped>
input {
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
}
input:disabled {
  background: rgba(255, 255, 255, 0);
  border-radius: 0.25em;
  padding: 0px 0px 0px 0px;
  border: 1px solid white;
  color: black;
  cursor: default;
}
button {
  font-weight: 700;
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
}
button:hover {
  background-color: var(--very-dark);
  color: white;
}
select {
  font-weight: 700;
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
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