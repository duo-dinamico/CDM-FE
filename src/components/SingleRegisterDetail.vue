<template>
  <div>
    <Spinner v-if="isRiskLoading" />
    <div v-else>
      <form @submit.prevent="handleClickAdd" id="new_risk"></form>

      <br />
      <label for="input_desc">Description:</label>
      <input
        type="text"
        form="new_risk"
        v-model="newRisk.description"
        id="input_desc"
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_status">Risk Status:</label>
      <select
        id="input_risk_status"
        form="new_risk"
        v-model="newRisk.risk_status"
        required
        :disabled="!isRiskEditing"
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CONTINUED">CONTINUED</option>
      </select>
      <br />
      <label for="input_risk_status">Discipline:</label>
      <select
        id="input_risk_status"
        form="new_risk"
        v-model="newRisk.discipline"
        required
        :disabled="!isRiskEditing"
      >
        <option
          v-for="discipline in disciplineList"
          :key="discipline"
          :value="discipline"
          >{{ discipline }}</option
        >
      </select>
      <br />
      <label for="input_risk_revision">Revision:</label>
      <input
        type="text"
        form="new_risk"
        v-model="newRisk.revision"
        id="input_risk_revision"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_lf_stage">Lifecycle Stage:</label>
      <select
        id="input_risk_lf_stage"
        form="new_risk"
        v-model="newRisk.project_lifecycle_stage"
        required
        :disabled="!isRiskEditing"
      >
        <option value="C">C</option>
        <option value="O">O</option>
        <option value="M">M</option>
        <option value="D">D</option>
      </select>
      <br />
      <label for="input_risk_hs_risk">HS Risk:</label>
      <select
        id="input_risk_hs_risk"
        form="new_risk"
        v-model="newRisk.hs_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br />
      <label for="input_risk_env_risk">Environmental Risk:</label>
      <select
        id="input_risk_env_risk"
        form="new_risk"
        v-model="newRisk.environmental_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br />
      <label for="input_risk_prog_risk">Programme Risk:</label>
      <select
        id="input_risk_prog_risk"
        form="new_risk"
        v-model="newRisk.programme_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br />
      <label for="input_risk_other_risk">Other Risk:</label>
      <select
        id="input_risk_other_risk"
        form="new_risk"
        v-model="newRisk.other_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <br />
      <label for="input_risk_likelihood">Likelihood:</label>
      <select
        id="input_risk_likelihood"
        form="new_risk"
        v-model="newRisk.likelihood"
        required
        :disabled="!isRiskEditing"
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
      <br />
      <label for="input_risk_severity">Severity:</label>
      <select
        id="input_risk_severity"
        form="new_risk"
        v-model="newRisk.severity"
        required
        :disabled="!isRiskEditing"
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
      <br />
      <label for="input_risk_product">Risk Product:</label>
      <input
        type="text"
        :class="'risk-product-' + riskProduct"
        v-model="riskProduct"
        :disabled="true"
      />
      <br />
      <label for="input_risk_doc">Relevant Documentation:</label>
      <input
        id="input_risk_doc"
        type="text"
        form="new_risk"
        v-model="newRisk.relevant_documentation"
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_owner">Owner of Risk:</label>
      <input
        id="input_risk_owner"
        type="text"
        form="new_risk"
        v-model="newRisk.owner_of_risk"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_mit_action">Mitigation Action:</label>
      <input
        id="input_risk_mit_action"
        type="text"
        form="new_risk"
        v-model="newRisk.mitigation_action"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_lh_mitigated">Likelihood Mitigated:</label>
      <select
        id="input_risk_lh_mitigated"
        form="new_risk"
        v-model="newRisk.likelihood_mitigated"
        required
        :disabled="!isRiskEditing"
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
      <br />
      <label for="input_risk_sev_mitigation">Severity Mitigation:</label>
      <select
        id="input_risk_sev_mitigation"
        form="new_risk"
        v-model="newRisk.severity_mitigation"
        required
        :disabled="!isRiskEditing"
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
      <br />
      <label for="input_risk_prod_mit">Product Mitigated:</label>
      <input
        type="text"
        :class="'risk-product-' + riskProductMitigated"
        v-model="riskProductMitigated"
        :disabled="true"
      />
      <br />
      <label for="input_risk_further_action">Further action required:</label>
      <select
        id="input_risk_further_action"
        form="new_risk"
        v-model="newRisk.further_action_required"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">Y</option>
        <option value="false">N</option>
      </select>
      <br />
      <label for="input_risk_cont_ref">Continuation Risk Reference:</label>
      <input
        type="text"
        id="input_risk_cont_ref"
        v-model="contRiskRef"
        :disabled="true"
      />
      <br />
      <label for="input_risk_ident">Identified by:</label>
      <input
        id="input_risk_ident"
        type="text"
        form="new_risk"
        v-model="newRisk.identified_by"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_date">Date:</label>
      <input
        type="date"
        form="new_risk"
        v-model="newRisk.date"
        id="input_risk_date"
        required
        :disabled="!isRiskEditing"
      />

      <div v-if="isAdd">
        <label for="add_button">Add new risk:</label>
        <button form="new_risk" id="add_button" @click="handleClickAdd">
          ➕
        </button>
      </div>
      <div v-else-if="!isRiskEditing">
        <label for="edit_button">Edit risk:</label>
        <button form="new_risk" id="edit_button" @click="handleClickEdit">
          📝
        </button>
        <br />
        <label for="delete_button">Delete risk:</label>
        <button form="new_risk" id="delete_button" @click="handleClickDelete">
          ❌
        </button>
      </div>
      <div v-else>
        <label for="save_button">Save risk:</label>
        <button form="new_risk" id="save_button" @click="handleSaveEdit">
          ✅
        </button>
        <br />
        <label for="cancel_button">Cancel risk edit:</label>
        <button form="new_risk" id="cancel_button" @click="handleCancelEdit">
          ↩
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
import Spinner from "@/components/Spinner";

export default {
  components: { Spinner },
  props: ["isAdd"],
  emits: ["reloadregisters"],
  setup(props, { emit }) {
    const isRiskLoading = ref(false);
    const isRiskEditing = ref(false);

    const newRisk = ref({
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

    const One2FiveList = ["1", "2", "3", "4", "5"];

    const {
      addRegister,
      risk,
      loadSingleRisk,
      loadRegisters,
      registers,
    } = Registers();

    const route = useRoute();

    const lookupRisk = async () => {
      isRiskLoading.value = true;
      // Check if is Add, and copy data to new  register
      if (!props.isAdd) {
        const register_id = ref(0);
        await loadRegisters(route.params.project_number);
        for (let register of registers.value) {
          if (register.risk_number === route.params.risk_number) {
            register_id.value = register.register_id;
          }
        }
        await loadSingleRisk(route.params.project_number, register_id.value);

        for (let key in newRisk.value) {
          newRisk.value[key] = risk.value[key];
        }
      } else {
        console.log("else isAdd: ", props.isAdd);
      }
      isRiskLoading.value = false;
    };

    const handleClickAdd = async () => {
      isRiskLoading.value = true;

      // Add new register to the database
      await addRegister(newRisk, route.params.project_number);

      // Send an emit to the parent, for reload
      await emit("reloadregisters");

      // Clear the data of newRisk
      for (let key in newRisk.value) {
        newRisk.value[key] = "";
      }
      isRiskLoading.value = false;
    };

    const handleClickEdit = () => {
      isRiskEditing.value = true;
    };

    const handleCancelEdit = () => {
      isRiskEditing.value = false;
    };

    const riskProduct = computed(() => {
      let product = newRisk.value.likelihood * newRisk.value.severity;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    const contRiskRef = computed(() => {
      return !newRisk.value.description
        ? ""
        : newRisk.value.further_action_required === "true"
        ? "TBC"
        : "";
    });
    const riskProductMitigated = computed(() => {
      let product =
        newRisk.value.likelihood_mitigated * newRisk.value.severity_mitigation;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    lookupRisk();

    return {
      newRisk,
      handleClickAdd,
      riskProduct,
      riskProductMitigated,
      disciplineList,
      One2FiveList,
      isRiskEditing,
      handleClickEdit,
      contRiskRef,
      handleCancelEdit,
      isRiskLoading,
    };
  },
};
</script>

<style scoped></style>
