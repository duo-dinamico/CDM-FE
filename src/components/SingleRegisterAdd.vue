<template>
  <tr>
    <td>
      <button @click="handleClickAdd">
        ➕
      </button>
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.description"
        required
      />
    </td>
    <td>
      <select
        id="risk_status"
        form="new_risk"
        v-model="newRegister.risk_status"
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CONTINUED">CONTINUED</option>
      </select>
    </td>
    <td>
      <select id="discipline" form="new_risk" v-model="newRegister.discipline">
        <option
          v-for="discipline in disciplineList"
          :key="discipline"
          :value="discipline"
          >{{ discipline }}</option
        >
      </select>
    </td>
    <td></td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.revision"
        required
      />
    </td>
    <td>
      <select
        id="proj_lifecycle"
        form="new_risk"
        v-model="newRegister.project_lifecycle_stage"
      >
        <option value="C">C</option>
        <option value="O">O</option>
        <option value="M">M</option>
        <option value="D">D</option>
      </select>
    </td>
    <td>
      <select id="hs_risk" form="new_risk" v-model="newRegister.hs_risk">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="env_risk"
        form="new_risk"
        v-model="newRegister.environmental_risk"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="program_risk"
        form="new_risk"
        v-model="newRegister.programme_risk"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select id="other_risk" form="new_risk" v-model="newRegister.other_risk">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select id="likelihood" form="new_risk" v-model="newRegister.likelihood">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td>
      <select id="severity" form="new_risk" v-model="newRegister.severity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td></td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.relevant_documentation"
        required
      />
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.owner_of_risk"
        required
      />
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.mitigation_action"
        required
      />
    </td>
    <td>
      <select
        id="likelihood_mit"
        form="new_risk"
        v-model="newRegister.likelihood_mitigated"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td>
      <select
        id="severity_mit"
        form="new_risk"
        v-model="newRegister.severity_mitigation"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td></td>
    <td>
      <select
        id="further_action"
        form="new_risk"
        v-model="newRegister.further_action_required"
      >
        <option value="true">Y</option>
        <option value="false">N</option>
      </select>
    </td>
    <td></td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.identified_by"
        required
      />
    </td>
    <td>
      <input type="date" form="new_risk" v-model="newRegister.date" required />
    </td>
  </tr>
</template>

<script>
import { ref } from "vue";
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
export default {
  props: [],
  emits: ["reloadregisters"],
  setup(_, { emit }) {
    const isLoading = ref(false);
    const newRegister = ref({
      description: "",
      risk_status: "",
      discipline: "",
      revision: "",
      project_lifecycle_stage: "",
      hs_risk: "",
      environmental_risk: "",
      programme_risk: "",
      other_risk: "",
      likelihood: "",
      severity: "",
      relevant_documentation: "",
      owner_of_risk: "",
      mitigation_action: "",
      likelihood_mitigated: "",
      severity_mitigation: "",
      further_action_required: "",
      identified_by: "",
      date: "",
    });

    const disciplineList = [
      "GEN",
      "MULTI",
      "OTHER",
      "ACOU",
      "ARCH",
      "CIV",
      "ELEC",
      "FACM",
      "FCDE",
      "FIN",
      "FIRE",
      "M&E",
      "MECH",
      "PM",
      "R-3R",
      "R-OLE",
      "R-PH",
      "R-PS",
      "R-PW",
      "STR",
    ];

    const { addRegister } = Registers();

    const route = useRoute();

    const handleClickAdd = async () => {
      isLoading.value = true;

      // Add new register to the database
      await addRegister(newRegister, route.params.project_number);

      // Send an emit to the parent, for reload
      await emit("reloadregisters");

      // Clear the data of newRegister
      for (let key in newRegister.value) {
        newRegister.value[key] = "";
      }
      isLoading.value = false;
    };

    return { newRegister, handleClickAdd, disciplineList };
  },
};
</script>

<style></style>
