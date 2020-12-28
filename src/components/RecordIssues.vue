<template>
  <Spinner v-if="isLoading" />
  <table v-else>
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
    <SingleProjectRecord
      v-for="projectRecord in projectRecords"
      :key="projectRecord.record_id"
      :projectRecord="projectRecord"
      @reload-records="loadProjectRecords"
      @toggle-loading="toggleLoading"
    />
    <AddProjectRecord
      @reload-records="loadProjectRecords"
      @toggle-loading="toggleLoading"
    />
  </table>
</template>

<script>
import getProjectRecords from "@/composables/getProjectRecords";
import Spinner from "@/components/Spinner";
import SingleProjectRecord from "@/components/SingleProjectRecord";
import AddProjectRecord from "@/components/AddProjectRecord";
import { ref } from "vue";

export default {
  components: { Spinner, SingleProjectRecord, AddProjectRecord },
  setup() {
    // this section fetches all records from a project
    const { projectRecords, loadProjectRecords } = getProjectRecords();
    loadProjectRecords();

    // this section related to the loading for all components
    const isLoading = ref(false);
    const toggleLoading = () => {
      isLoading.value = !isLoading.value;
    };

    // ***DO NOT DELETE*** for future referece
    // const isEditing = ref(
    //   projectRecords.value.reduce(
    //     (acc, record) => ({ ...acc, [record.record_id]: false }),
    //     {}
    //   )
    // );

    return {
      projectRecords,
      loadProjectRecords,
      toggleLoading,
      isLoading,
    };
  },
};
</script>

<style>
</style>