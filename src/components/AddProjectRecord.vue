<template>
  <tr>
    <form @submit.prevent="handleSubmitRecord" id="newRecordForm"></form>
    <td>
      <button form="newRecordForm">➕</button>
    </td>
    <td>
      <input
        type="text"
        v-model="version_number"
        form="newRecordForm"
        required
      />
    </td>
    <td>
      <input type="text" v-model="stage_issued" form="newRecordForm" required />
    </td>
    <td>
      <input type="text" v-model="purpose" form="newRecordForm" required />
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
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  emits: ["reload-records", "toggle-loading"],
  setup(_, { emit }) {
    // route variable for route related actions
    const route = useRoute();

    // this section is for posting a new record
    const newRecord = reactive({
      project_number: route.params.project_number,
      version_number: "",
      stage_issued: "",
      purpose: "",
      date: "",
      prepared: "",
      checked: "",
      approved: "",
      remarks: "",
    });

    const handleSubmitRecord = async () => {
      emit("toggle-loading");
      await postProjectRecord(newRecord.project_number, newRecord);
      await emit("reload-records");
      emit("toggle-loading");
    };

    return { ...toRefs(newRecord), handleSubmitRecord };
  },
};
</script>

<style>
</style>