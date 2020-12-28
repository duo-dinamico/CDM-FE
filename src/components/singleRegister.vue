<template>
  <!-- if not editing -->
  <tr class="single_register_table" v-if="!isEdit">
    <td>
      <button @click="handleClickEdit">
        📝
      </button>
      <button @click="handleClickDelete">❌</button>
    </td>
    <td>{{ register.description }}</td>
    <td>{{ register.risk_status }}</td>
    <td>{{ register.discipline }}</td>
    <td>{{ register.risk_number }}</td>
    <td>{{ register.revision }}</td>
    <td>{{ register.project_lifecycle_stage }}</td>
    <td v-if="register.hs_risk">H</td>
    <td v-else></td>
    <td v-if="register.environmental_risk">E</td>
    <td v-else></td>
    <td v-if="register.programme_risk">P</td>
    <td v-else></td>
    <td v-if="register.other_risk">O</td>
    <td v-else></td>
    <td>{{ register.likelihood }}</td>
    <td>{{ register.severity }}</td>
    <td></td>
    <td>{{ register.relevant_documentation }}</td>
    <td>{{ register.owner_of_risk }}</td>
    <td>{{ register.mitigation_action }}</td>
    <td>{{ register.likelihood_mitigated }}</td>
    <td>{{ register.severity_mitigation }}</td>
    <td></td>

    <td v-if="register.further_action_required">Y</td>
    <td v-else>N</td>

    <td></td>
    <td>{{ register.identified_by }}</td>
    <td>{{ register.date.substring(0, 10) }}</td>
  </tr>

  <!-- if editing -->
  <tr v-if="isEdit">
    <td>
      <button @click="handleSaveEdit">
        ✅
      </button>
      <button @click="handleCancelEdit">
        ↩
      </button>
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="editedRegister.description"
        required
      />
    </td>
    <td>
      <select
        id="risk_status"
        form="new_risk"
        v-model="editedRegister.risk_status"
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CONTINUED">CONTINUED</option>
      </select>
    </td>
    <td>
      <select
        id="discipline"
        form="new_risk"
        v-model="editedRegister.discipline"
      >
        <option value="GEN">GEN</option>
        <option value="MULTI">MULTI</option>
        <option value="OTHER">OTHER</option>
        <option value="ACOU">ACOU</option>
        <option value="ARCH">ARCH</option>
        <option value="CIV">CIV</option>
        <option value="ELEC">ELEC</option>
        <option value="FACM">FACM</option>
        <option value="FCDE">FCDE</option>
        <option value="FIN">FIN</option>
        <option value="FIRE">FIRE</option>
        <option value="M&E">M&E</option>
        <option value="MECH">MECH</option>
        <option value="PM">PM</option>
        <option value="R-3R">R-3R</option>
        <option value="R-OLE">R-OLE</option>
        <option value="R-PH">R-PH</option>
        <option value="R-PS">R-PS</option>
        <option value="R-PW">R-PW</option>
        <option value="STR">STR</option>
      </select>
    </td>
    <td></td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="editedRegister.revision"
        required
      />
    </td>
    <td>
      <select
        id="proj_lifecycle"
        form="new_risk"
        v-model="editedRegister.project_lifecycle_stage"
      >
        <option value="C">C</option>
        <option value="O">O</option>
        <option value="M">M</option>
        <option value="D">D</option>
      </select>
    </td>
    <td>
      <select id="hs_risk" form="new_risk" v-model="editedRegister.hs_risk">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="env_risk"
        form="new_risk"
        v-model="editedRegister.environmental_risk"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="program_risk"
        form="new_risk"
        v-model="editedRegister.programme_risk"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="other_risk"
        form="new_risk"
        v-model="editedRegister.other_risk"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="likelihood"
        form="new_risk"
        v-model="editedRegister.likelihood"
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td>
      <select id="severity" form="new_risk" v-model="editedRegister.severity">
        <option value="0">0</option>
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
        v-model="editedRegister.relevant_documentation"
        required
      />
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="editedRegister.owner_of_risk"
        required
      />
    </td>
    <td>
      <input
        type="text"
        form="new_risk"
        v-model="editedRegister.mitigation_action"
        required
      />
    </td>
    <td>
      <select
        id="likelihood_mit"
        form="new_risk"
        v-model="editedRegister.likelihood_mitigated"
      >
        <option value="0">0</option>
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
        v-model="editedRegister.severity_mitigation"
      >
        <option value="0">0</option>
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
        v-model="editedRegister.further_action_required"
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
        v-model="editedRegister.identified_by"
        required
      />
    </td>
    <td>
      <input
        type="date"
        form="new_risk"
        v-model="editedRegister.date"
        required
      />
    </td>
  </tr>
</template>

<script>
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  props: ["register"],
  emits: ["reloadregisters"],
  setup(props, { emit }) {
    const editedRegister = ref({
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

    const isEdit = ref(false);
    const { delRegister, patchRegister } = Registers();

    const route = useRoute();

    const handleClickEdit = () => {
      // Change to edit mode
      isEdit.value = !isEdit.value;

      // copy data to the editedRegister
      for (let key in editedRegister.value) {
        editedRegister.value[key] = props.register[key];
      }
    };

    const handleClickDelete = async () => {
      await delRegister(
        route.params.project_number,
        props.register.risk_number
      );
      await emit("reloadregisters");
    };

    const handleCancelEdit = () => {
      // Cancel edit mode
      isEdit.value = !isEdit.value;

      // Reset editedRegister
      for (let key in editedRegister.value) {
        editedRegister.value[key] = "";
      }
    };

    const handleSaveEdit = async () => {
      await patchRegister(
        route.params.project_number,
        props.register.risk_number,
        editedRegister.value
      );

      await emit("reloadregisters");
      // Cancel edit mode
      isEdit.value = !isEdit.value;
    };

    return {
      handleClickEdit,
      handleClickDelete,
      isEdit,
      editedRegister,
      handleCancelEdit,
      handleSaveEdit,
    };
  },
};
</script>

<style>
.single_register_table td {
  background: lightgray;
  /* border: 1px solid; */
  text-align: left;
  vertical-align: middle;
}
.single_register_table td:hover {
  background: #f5f5f5;
}
</style>
