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
      class="record-row"
      v-for="projectRecord in projectRecords"
      :key="projectRecord.record_id"
      :projectRecord="projectRecord"
      :purposelist="purposeList"
      @reload-records="loadProjectRecords"
      @toggle-loading="toggleLoading"
    />
    <AddProjectRecord
      @reload-records="loadProjectRecords"
      @toggle-loading="toggleLoading"
      :stage="stage"
      :versionlist="versionNumberList"
      :purposelist="purposeList"
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
  props: ["stage"],
  components: { Spinner, SingleProjectRecord, AddProjectRecord },
  setup() {
    // this section fetches all records from a project
    const {
      projectRecords,
      loadProjectRecords,
      versionNumberList,
    } = getProjectRecords();
    loadProjectRecords();

    // array of all purpose status available
    const purposeList = [
      "Draft",
      "Information",
      "Acceptance",
      "Approval",
      "H&S File",
      "Residual Risks",
    ];

    // this section related to the loading spinner for all components
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
      versionNumberList,
      purposeList,
    };
  },
};
</script>

<style>
table {
  border: 0px;
  border-collapse: collapse;
}
.record-row {
  background: white;
}
.record-row:hover {
  background: #dfdede8c;
}
input:disabled:hover {
  background: #dfdede8c;
}
input:disabled {
  background: white;
  border: 0px solid white;
  color: black;
  font-size: 16px;
}
</style>