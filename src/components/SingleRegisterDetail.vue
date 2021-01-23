<template>
  <div class="risk-detail">
    <Spinner v-if="isRiskLoading" />
    <div v-else>
      <h2 v-if="isAdd">Add a new risk:</h2>
      <h2 v-if="!isAdd">Risk: {{ route.params.risk_number }}</h2>
      <form @submit.prevent="handleSaveEdit" id="new_risk"></form>

      <div v-if="isAdd">
        <button form="new_risk" id="add_button" type="submit" value="Submit">
          ➕
        </button>
      </div>
      <div v-else-if="!isRiskEditing">
        <button form="new_risk" id="edit_button" @click="handleClickEdit">
          📝
        </button>
      </div>
      <div v-else>
        <button form="new_risk" id="save_button" type="submit" value="Submit">
          ✅
        </button>
        <button form="new_risk" id="cancel_button" @click="handleCancelEdit">
          ↩
        </button>
      </div>

      <label for="input_desc"> <h3>Description:</h3></label>
      <input
        type="text"
        form="new_risk"
        v-model="cachedRisk.description"
        id="input_desc"
        :disabled="!isRiskEditing"
      />
      <label for="input_risk_status"><h3>Risk Status:</h3></label>
      <select
        :class="'risk-status-' + cachedRisk.risk_status"
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

      <label for="input_risk_status"><h3>Discipline:</h3></label>
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

      <label for="input_risk_number"><h3>Risk Number:</h3></label>
      <input
        type="text"
        form="new_risk"
        v-model="risk_number"
        id="input_risk_number"
        :disabled="true"
      />

      <label for="input_risk_revision"><h3>Revision:</h3></label>
      <input
        type="text"
        form="new_risk"
        v-model="cachedRisk.revision"
        id="input_risk_revision"
        required
        :disabled="!isRiskEditing"
      />

      <label for="input_risk_lf_stage"><h3>Lifecycle Stage:</h3></label>
      <select
        :class="'risk-lifecycle-stage-' + cachedRisk.project_lifecycle_stage"
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

      <label for="input_risk_hs_risk"><h3>HS Risk:</h3></label>
      <input
        v-if="!isRiskEditing && cachedRisk.hs_risk"
        class="HS-H"
        type="text"
        value="H"
        :disabled="true"
      />
      <input
        v-else-if="!isRiskEditing && !cachedRisk.hs_risk"
        type="text"
        value=""
        :disabled="true"
      />
      <select
        v-else
        id="input_risk_hs_risk"
        form="new_risk"
        v-model="cachedRisk.hs_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>

      <label for="input_risk_env_risk"><h3>Environmental Risk:</h3></label>
      <input
        v-if="!isRiskEditing && cachedRisk.environmental_risk"
        class="Env-E"
        type="text"
        value="E"
        :disabled="true"
      />
      <input
        v-else-if="!isRiskEditing && !cachedRisk.environmental_risk"
        type="text"
        value=""
        :disabled="true"
      />
      <select
        v-else
        id="input_risk_env_risk"
        form="new_risk"
        v-model="cachedRisk.environmental_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>

      <label for="input_risk_prog_risk"><h3>Programme Risk:</h3></label>
      <input
        v-if="!isRiskEditing && cachedRisk.programme_risk"
        class="Prog-P"
        type="text"
        value="P"
        :disabled="true"
      />
      <input
        v-else-if="!isRiskEditing && !cachedRisk.programme_risk"
        type="text"
        value=""
        :disabled="true"
      />
      <select
        v-else
        id="input_risk_prog_risk"
        form="new_risk"
        v-model="cachedRisk.programme_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>

      <label for="input_risk_other_risk"><h3>Other Risk:</h3></label>
      <input
        v-if="!isRiskEditing && cachedRisk.other_risk"
        class="Other-O"
        type="text"
        value="O"
        :disabled="true"
      />
      <input
        v-else-if="!isRiskEditing && !cachedRisk.other_risk"
        type="text"
        value=""
        :disabled="true"
      />
      <select
        v-else
        id="input_risk_other_risk"
        form="new_risk"
        v-model="cachedRisk.other_risk"
        required
        :disabled="!isRiskEditing"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>

      <label for="input_risk_likelihood"><h3>Likelihood:</h3></label>
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

      <label for="input_risk_severity"><h3>Severity:</h3></label>
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

      <label for="input_risk_product"><h3>Risk Product:</h3></label>
      <input
        id="input_risk_product"
        type="text"
        form="new_risk"
        :class="'risk-product-' + riskProduct"
        v-model="riskProduct"
        :disabled="true"
      />

      <label for="input_risk_doc"><h3>Relevant Documentation:</h3></label>
      <input
        id="input_risk_doc"
        type="text"
        form="new_risk"
        v-model="cachedRisk.relevant_documentation"
        :disabled="!isRiskEditing"
      />

      <label for="input_risk_owner"><h3>Owner of Risk:</h3></label>
      <input
        id="input_risk_owner"
        type="text"
        form="new_risk"
        v-model="cachedRisk.owner_of_risk"
        required
        :disabled="!isRiskEditing"
      />

      <label for="input_risk_mit_action"><h3>Mitigation Action:</h3></label>
      <input
        id="input_risk_mit_action"
        type="text"
        form="new_risk"
        v-model="cachedRisk.mitigation_action"
        required
        :disabled="!isRiskEditing"
      />

      <label for="input_risk_lh_mitigated"
        ><h3>Likelihood Mitigated:</h3></label
      >
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

      <label for="input_risk_sev_mitigation"
        ><h3>Severity Mitigation:</h3></label
      >
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

      <label for="input_risk_prod_mit"><h3>Product Mitigated:</h3></label>
      <input
        id="input_risk_prod_mit"
        type="text"
        form="new_risk"
        :class="'risk-product-' + riskProductMitigated"
        v-model="riskProductMitigated"
        :disabled="true"
      />

      <label for="input_risk_further_action"
        ><h3>Further action required:</h3></label
      >
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

      <label for="input_risk_cont_ref"
        ><h3>Continuation Risk Reference:</h3></label
      >
      <input
        id="input_risk_cont_ref"
        type="text"
        form="new_risk"
        v-model="contRiskRef"
        :disabled="true"
      />

      <label for="input_risk_ident"><h3>Identified by:</h3></label>
      <input
        id="input_risk_ident"
        type="text"
        form="new_risk"
        v-model="cachedRisk.identified_by"
        required
        :disabled="!isRiskEditing"
      />

      <label for="input_risk_date"><h3>Date:</h3></label>
      <input
        v-if="isRiskEditing"
        type="date"
        form="new_risk"
        v-model="cachedRisk.date"
        id="input_risk_date"
      />
      <span v-else>{{ cachedRisk.date.substring(0, 10) }}</span>
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
      if (!cachedRisk.value.description) {
        return "";
      } else if (cachedRisk.value.further_action_required === true) {
        return "TBC";
      } else {
        return "";
      }
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

<style scoped>
.risk-detail {
  display: block;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  min-width: 250px;
  padding: 0px 50px 0px 0px;
}
.risk-detail div {
  padding: 0px 0px 20px 0px;
}
.risk-detail h2 {
  background-color: var(--medium);
  border-radius: 10px 10px 0px 0px;
  padding: 10px 5px 5px 10px;
  margin: 0px 0px 0px 0px;
  text-transform: uppercase;
}
.risk-detail h3 {
  display: block;
  margin: 0px 0px 0px 10px;
}
.risk-detail input,
p,
select,
span {
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.risk-detail input {
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.risk-detail input:disabled {
  background: white;
  box-sizing: border-box;
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  padding: 0px 0px 0px 0px;
  border: 1px solid white;
  color: black;
  cursor: default;
}
.risk-detail button {
  margin: 30px 0px 10px 10px;
  font-weight: 700;
  line-height: 1.5;
  padding: 0.2em 1em 0.2em 0.5em;
  width: 5%;
  min-width: 5%;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.risk-detail button:hover {
  background-color: var(--very-dark);
  color: white;
}
.risk-detail select {
  font-weight: 700;
  line-height: 1.5;
  padding: 0px 0px 0px 0px;
  width: 25%;
  min-width: 20%;
  box-sizing: border-box;
  border: 1px solid var(--very-dark);
  border-radius: 0.25em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.risk-detail select::-ms-expand {
  display: none;
}
.risk-detail select:hover {
  border-color: #888;
}
.risk-detail select option {
  font-weight: normal;
}

/* risk status styles */
.risk-status-ACTIVE {
  background-image: unset !important;
  background-color: red;
  color: white;
  font-weight: bold;
}

.risk-status-RESOLVED {
  background-image: unset !important;
  background: white;
  color: green;
  font-weight: bold;
}
.risk-status-CONTINUED {
  background-image: unset !important;
  background: white;
  color: rgb(78, 4, 100);
  font-style: italic;
  font-weight: bold;
}

/* risk lifecycle-stage styles */
.risk-lifecycle-stage-C {
  background-image: unset !important;
  background: rgb(86, 157, 238);
  color: black;
  font-weight: bold;
}
.risk-lifecycle-stage-O {
  background-image: unset !important;
  background: rgb(186, 233, 241);
  color: black;
  font-weight: bold;
}
.risk-lifecycle-stage-M {
  background-image: unset !important;
  background: rgb(186, 233, 241);
  color: black;
  font-weight: bold;
}
.risk-lifecycle-stage-D {
  background-image: unset !important;
  background: rgb(186, 233, 241);
  color: black;
  font-weight: bold;
}

/* risk H&S styles */
.HS-H {
  color: red !important;
  font-weight: bold;
}

/* risk Environment styles */
.Env-E {
  color: green !important;
  font-weight: bold;
}

/* risk Programme styles */
.Prog-P {
  color: black !important;
  font-weight: bold;
}

/* risk Other styles */
.Other-O {
  color: rgb(80, 163, 231) !important;
  font-weight: bold;
}

/* risk Risk Product styles */
.risk-product-L {
  background: white !important;
  color: green !important;
  font-weight: bold;
}
.risk-product-M {
  background: orange !important;
  color: black !important;
  font-weight: bold;
}
.risk-product-H {
  background: red !important;
  color: white !important;
  font-weight: bold;
}
</style>
