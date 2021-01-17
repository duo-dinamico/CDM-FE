<template>
  <Spinner v-if="isLoading" />
  <div class="record-issues" v-else>
    <h2>record of issues</h2>
    <table>
      <tr>
        <th class="edit-column"></th>
        <th class="version-number">Version Number</th>
        <th class="stage-issued">Stage Issued</th>
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
  </div>
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

<style scoped>
h2 {
  background-color: var(--medium);
  border-radius: 10px 10px 0px 0px;
  padding: 10px 5px 5px 10px;
  margin: 0px 0px 0px 0px;
  text-transform: uppercase;
}
.record-issues {
  display: block;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
}
.edit-column {
  width: 3%;
}
.version-number {
  width: 5%;
}
.stage-issued {
  width: 21%;
}
table {
  display: table;
  empty-cells: hide;
  border: 0px;
  border-collapse: separate;
  width: 100%;
  table-layout: fixed;
}
th {
  border: 1px solid black;
}
tr {
  vertical-align: middle;
}
tr:hover :not(th) {
  background-color: var(--medium);
}
</style>