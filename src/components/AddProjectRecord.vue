<template>
  <tr>
    <form @submit.prevent="handleSubmitRecord" id="newRecordForm"></form>
    <td>
      <button form="newRecordForm">➕</button>
    </td>
    <td>
      <input
        @keyup="handleVersionError"
        type="text"
        v-model="version_number"
        form="newRecordForm"
        required
      />
      <p v-if="versionError">{{ versionError }}</p>
    </td>
    <td>
      {{ stage }}
    </td>
    <td>
      <select id="purpose" v-model="purpose" form="newRecordForm" required>
        <option v-for="option in purposelist" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </td>
    <td>
      <input type="date" v-model="date" form="newRecordForm" required />
    </td>
    <td>
      <input type="text" v-model="prepared" form="newRecordForm" required />
    </td>
    <td>
      <input type="text" v-model="checked" form="newRecordForm" required />
    </td>
    <td>
      <input type="text" v-model="approved" form="newRecordForm" required />
    </td>
    <td>
      <input type="text" v-model="remarks" form="newRecordForm" />
    </td>
  </tr>
</template>

<script>
import postProjectRecord from "@/composables/postProjectRecord";
import { reactive, toRefs, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  props: ["stage", "versionlist", "purposelist"],
  emits: ["reload-records", "toggle-loading"],
  setup(props, { emit }) {
    // route variable for route related actions
    const route = useRoute();

    // error handling for the possibility that the version number already exists
    const versionError = ref("");
    const handleVersionError = (event) => {
      if (props.versionlist) {
        if (props.versionlist.includes(event.target.value)) {
          versionError.value = "Version number already exists";
        } else {
          versionError.value = "";
        }
      }
    };

    // this section is for posting a new record
    const newRecord = reactive({
      version_number: "",
      purpose: "",
      date: "",
      prepared: "",
      checked: "",
      approved: "",
      remarks: "",
    });

    const handleSubmitRecord = async () => {
      if (!versionError.value) {
        emit("toggle-loading");
        newRecord.stage_issued = props.stage;
        await postProjectRecord(route.params.project_number, newRecord);
        for (let key in newRecord) {
          if (key !== "stage_issued") {
            newRecord[key] = "";
          }
        }
        await emit("reload-records");
        emit("toggle-loading");
      }
    };

    return {
      ...toRefs(newRecord),
      handleSubmitRecord,
      versionError,
      handleVersionError,
    };
  },
};
</script>

<style>
</style>