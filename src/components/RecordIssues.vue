<template>
  <Spinner v-if="isLoading" />
  <div v-else>
    <form @submit.prevent="handleSubmitRecord" id="newRecordForm"></form>
    <table v-if="projectRecords">
      <tr>
        <th>Records of Issue</th>
        <th>Version Number</th>
        <th>Stage Issued</th>
        <th>Purpose</th>
        <th>Date</th>
        <th>Prepared</th>
        <th>Checked</th>
        <th>Approved</th>
        <th>Remarks</th>
      </tr>
      <tr
        v-for="projectRecord in projectRecords"
        :key="projectRecord.record_id"
      >
        <td>
          <button>📝</button
          ><button @click="handleDelete" :value="projectRecord.record_id">
            ❌
          </button>
        </td>
        <td>{{ projectRecord.version_number }}</td>
        <td>{{ projectRecord.stage_issued }}</td>
        <td>{{ projectRecord.purpose }}</td>
        <td>{{ projectRecord.date.substring(0, 10) }}</td>
        <td>{{ projectRecord.prepared }}</td>
        <td>{{ projectRecord.checked }}</td>
        <td>{{ projectRecord.approved }}</td>
        <td>{{ projectRecord.remarks }}</td>
      </tr>
      <tr>
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
          <input
            type="text"
            v-model="stage_issued"
            form="newRecordForm"
            required
          />
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
    </table>
    <Spinner v-else />
  </div>
</template>

<script>
import getProjectRecords from "@/composables/getProjectRecords";
import postProjectRecord from "@/composables/postProjectRecord";
import Spinner from "@/components/Spinner";
import { reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { Spinner },
  setup() {
    const { projectRecords, loadProjectRecords } = getProjectRecords();
    loadProjectRecords();

    const route = useRoute();
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

    const isLoading = ref(false);
    const handleSubmitRecord = async () => {
      isLoading.value = true;
      await postProjectRecord(newRecord.project_number, newRecord);
      await loadProjectRecords();
      isLoading.value = false;
    };

    const handleDelete = (event) => {
      console.log(event.target);
    };

    return {
      ...toRefs(newRecord),
      projectRecords,
      handleDelete,
      handleSubmitRecord,
      isLoading,
    };
  },
};
</script>

<style>
</style>