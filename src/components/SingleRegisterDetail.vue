<template>
  <div>
    <Spinner v-if="isRiskLoading" />
    <div v-else>
      <h3 v-if="isAdd">Add a new risk:</h3>
      <h3 v-if="!isAdd">Risk: {{ route.params.risk_number }}</h3>
      <form @submit.prevent="handleSaveEdit" id="new_risk"></form>

      <br />
      <label for="input_desc">Description:</label>
      <input
        type="text"
        form="new_risk"
        v-model="cachedRisk.description"
        id="input_desc"
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_status">Risk Status:</label>
      <select
        id="input_risk_status"
        form="new_risk"
        v-model="cachedRisk.risk_status"
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
        v-model="cachedRisk.discipline"
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
      <label for="input_risk_number">Risk Number:</label>
      <input
        type="text"
        form="new_risk"
        v-model="risk_number"
        id="input_risk_number"
        :disabled="true"
      />

      <br />
      <label for="input_risk_revision">Revision:</label>
      <input
        type="text"
        form="new_risk"
        v-model="cachedRisk.revision"
        id="input_risk_revision"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_lf_stage">Lifecycle Stage:</label>
      <select
        id="input_risk_lf_stage"
        form="new_risk"
        v-model="cachedRisk.project_lifecycle_stage"
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
        v-model="cachedRisk.hs_risk"
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
        v-model="cachedRisk.environmental_risk"
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
        v-model="cachedRisk.programme_risk"
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
        v-model="cachedRisk.other_risk"
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
        v-model="cachedRisk.likelihood"
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
        v-model="cachedRisk.severity"
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
        id="input_risk_product"
        type="text"
        form="new_risk"
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
        v-model="cachedRisk.relevant_documentation"
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_owner">Owner of Risk:</label>
      <input
        id="input_risk_owner"
        type="text"
        form="new_risk"
        v-model="cachedRisk.owner_of_risk"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_mit_action">Mitigation Action:</label>
      <input
        id="input_risk_mit_action"
        type="text"
        form="new_risk"
        v-model="cachedRisk.mitigation_action"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_lh_mitigated">Likelihood Mitigated:</label>
      <select
        id="input_risk_lh_mitigated"
        form="new_risk"
        v-model="cachedRisk.likelihood_mitigated"
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
        v-model="cachedRisk.severity_mitigation"
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
        id="input_risk_prod_mit"
        type="text"
        form="new_risk"
        :class="'risk-product-' + riskProductMitigated"
        v-model="riskProductMitigated"
        :disabled="true"
      />
      <br />
      <label for="input_risk_further_action">Further action required:</label>
      <select
        id="input_risk_further_action"
        form="new_risk"
        v-model="cachedRisk.further_action_required"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">Y</option>
        <option value="false">N</option>
      </select>
      <br />
      <label for="input_risk_cont_ref">Continuation Risk Reference:</label>
      <input
        id="input_risk_cont_ref"
        type="text"
        form="new_risk"
        v-model="contRiskRef"
        :disabled="true"
      />
      <br />
      <label for="input_risk_ident">Identified by:</label>
      <input
        id="input_risk_ident"
        type="text"
        form="new_risk"
        v-model="cachedRisk.identified_by"
        required
        :disabled="!isRiskEditing"
      />
      <br />
      <label for="input_risk_date">Date:</label>
      <input
        v-if="isRiskEditing"
        type="date"
        form="new_risk"
        v-model="cachedRisk.date"
        id="input_risk_date"
      />
      <span v-else>{{ cachedRisk.date.substring(0, 10) }}</span>

      <div v-if="isAdd">
        <label for="add_button">Save new risk:</label>
        <button form="new_risk" id="add_button" type="submit" value="Submit">
          ➕
        </button>
      </div>
      <div v-else-if="!isRiskEditing">
        <label for="edit_button">Edit risk:</label>
        <button form="new_risk" id="edit_button" @click="handleClickEdit">
          📝
        </button>
      </div>
      <div v-else>
        <label for="save_button">Save risk:</label>
        <button form="new_risk" id="save_button" type="submit" value="Submit">
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
import router from "../router";

export default {
  components: { Spinner },
  props: ["isAdd"],
  setup(props) {
    const isRiskLoading = ref(false);
    const isRiskEditing = ref(false);
    const risk_number = ref("");

    const cachedRisk = ref({
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
      patchRegister,
    } = Registers();

    const route = useRoute();

    const lookupRisk = async () => {
      // Start spinner
      isRiskLoading.value = true;

      const register_id = ref(0);
      await loadRegisters(route.params.project_number);
      for (let register of registers.value) {
        if (register.risk_number === route.params.risk_number) {
          register_id.value = register.register_id;
          risk_number.value = register.risk_number;
        }
      }
      await loadSingleRisk(route.params.project_number, register_id.value);

      // Copy each key value pair from risk to cachedRisk
      for (let key in cachedRisk.value) {
        cachedRisk.value[key] = risk.value[key];
      }

      // Stop spinner
      isRiskLoading.value = false;
    };

    const handleClickAdd = async () => {
      // Start spinner
      isRiskLoading.value = true;

      // Add new register to the database
      await addRegister(cachedRisk, route.params.project_number);

      // Clear the data of cachedRisk
      for (let key in cachedRisk.value) {
        cachedRisk.value[key] = "";
      }

      // Stop spinner
      isRiskLoading.value = false;
    };

    const handleSaveEdit = async () => {
      if (!props.isAdd) {
        // This is a patch
        await patchRegister(
          route.params.project_number,
          risk.value.register_id,
          cachedRisk.value
        );
      } else {
        // This is an add, Add new register to the database
        await addRegister(cachedRisk, route.params.project_number);

        // Return to the register page
        router.push({
          name: "Register",
          params: {
            project_number: route.params.project_number,
          },
        });
      }

      // After save, must reload risk
      lookupRisk();

      // Cancel edit mode
      isRiskEditing.value = false;
    };

    const handleClickEdit = () => {
      isRiskEditing.value = true;
    };

    const handleCancelEdit = () => {
      isRiskEditing.value = false;

      // Need to reload risk, because could be changed
      lookupRisk();
    };

    const riskProduct = computed(() => {
      let product = cachedRisk.value.likelihood * cachedRisk.value.severity;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    const contRiskRef = computed(() => {
      return !cachedRisk.value.description
        ? ""
        : cachedRisk.value.further_action_required === "true"
        ? "TBC"
        : "";
    });
    const riskProductMitigated = computed(() => {
      let product =
        cachedRisk.value.likelihood_mitigated *
        cachedRisk.value.severity_mitigation;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    // load risk at startup, if it's not Add
    if (!props.isAdd) {
      lookupRisk();
    } else {
      isRiskEditing.value = true;
    }

    return {
      cachedRisk,
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
      handleSaveEdit,
      route,
      risk_number,
    };
  },
};
</script>

<style scoped></style>
