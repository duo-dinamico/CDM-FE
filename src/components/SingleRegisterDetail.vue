<template>
  <form @submit.prevent="handleClickAdd" id="new_risk"></form>

  <label for="add_button">Add new register:</label>
  <button form="new_risk" id="add_button">➕</button>
  <br />
  <label for="input_desc">Description:</label>
  <input
    type="text"
    form="new_risk"
    v-model="newRegister.description"
    id="input_desc"
  />
  <br />
  <label for="input_risk_status">Risk Status:</label>
  <select
    id="input_risk_status"
    form="new_risk"
    v-model="newRegister.risk_status"
    required
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
    v-model="newRegister.discipline"
    required
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
    v-model="newRegister.revision"
    id="input_risk_revision"
    required
  />
  <br />
  <label for="input_risk_lf_stage">Lifecycle Stage:</label>
  <select
    id="input_risk_lf_stage"
    form="new_risk"
    v-model="newRegister.project_lifecycle_stage"
    required
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
    v-model="newRegister.hs_risk"
    required
  >
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
  <br />
  <label for="input_risk_env_risk">Environmental Risk:</label>
  <select
    id="input_risk_env_risk"
    form="new_risk"
    v-model="newRegister.environmental_risk"
    required
  >
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
  <br />
  <label for="input_risk_prog_risk">Programme Risk:</label>
  <select
    id="input_risk_prog_risk"
    form="new_risk"
    v-model="newRegister.programme_risk"
    required
  >
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
  <br />
  <label for="input_risk_other_risk">Other Risk:</label>
  <select
    id="input_risk_other_risk"
    form="new_risk"
    v-model="newRegister.other_risk"
    required
  >
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
  <br />
  <label for="input_risk_likelihood">Likelihood:</label>
  <select
    id="input_risk_likelihood"
    form="new_risk"
    v-model="newRegister.likelihood"
    required
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
    v-model="newRegister.severity"
    required
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
    v-model="newRegister.riskProduct"
  />
  <br />
  <label for="input_risk_doc">Relevant Documentation:</label>
  <input
    id="input_risk_doc"
    type="text"
    form="new_risk"
    v-model="newRegister.relevant_documentation"
  />
  <br />
  <label for="input_risk_owner">Owner of Risk:</label>
  <input
    id="input_risk_owner"
    type="text"
    form="new_risk"
    v-model="newRegister.owner_of_risk"
    required
  />
  <br />
  <label for="input_risk_mit_action">Mitigation Action:</label>
  <input
    id="input_risk_mit_action"
    type="text"
    form="new_risk"
    v-model="newRegister.mitigation_action"
    required
  />
  <br />
  <label for="input_risk_lh_mitigated">Likelihood Mitigated:</label>
  <select
    id="input_risk_lh_mitigated"
    form="new_risk"
    v-model="newRegister.likelihood_mitigated"
    required
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
    v-model="newRegister.severity_mitigation"
    required
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
  />
  <br />
  <label for="input_risk_further_action">Further action required:</label>
  <select
    id="input_risk_further_action"
    form="new_risk"
    v-model="newRegister.further_action_required"
    required
  >
    <option value="true">Y</option>
    <option value="false">N</option>
  </select>
  <br />
  <label for="input_risk_cont_ref">Continuation Risk Reference:</label>
  <input
    type="text"
    id="input_risk_cont_ref"
    value="{{
    !newRegister.description
      ? ''
      : newRegister.further_action_required === 'true'
      ? 'TBC'
      : ''
  }}"
  />
  <br />
  <label for="input_risk_ident">Identified by:</label>
  <input
    id="input_risk_ident"
    type="text"
    form="new_risk"
    v-model="newRegister.identified_by"
    required
  />
  <br />
  <label for="input_risk_date">Date:</label>
  <input
    type="date"
    form="new_risk"
    v-model="newRegister.date"
    id="input_risk_date"
    required
  />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
export default {
  props: ["disciplineList", "One2FiveList", "isAdd"],
  emits: ["reloadregisters"],
  setup(props, { emit }) {
    console.log(props.register);
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

    const copyDataFromRegister = () => {
      for (let key in newRegister.value) {
        newRegister.value[key] = props.register[key];
      }
    };

    onMounted(() => {
      console.log("component is mounted!");
      if (!props.isAdd) {
        copyDataFromRegister();
      } else {
        console.log("else isAdd: ", props.isAdd);
      }
    });

    // Copy data to new register

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

    const riskProduct = computed(() => {
      let product = newRegister.value.likelihood * newRegister.value.severity;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    const riskProductMitigated = computed(() => {
      let product =
        newRegister.value.likelihood_mitigated *
        newRegister.value.severity_mitigation;
      if (product < 4) {
        return "L";
      } else if (product < 10) {
        return "M";
      } else {
        return "H";
      }
    });

    return {
      newRegister,
      handleClickAdd,
      riskProduct,
      riskProductMitigated,
    };
  },
};
</script>

<style scoped>
.single_register_table td {
  background: lightgray;
  border: 1px solid;
  text-align: left;
  vertical-align: middle;
  padding: 0;
}

/* risk status styles */
.single_register_table .ACTIVE {
  background: red;
  color: white;
  font-weight: bold;
}
.single_register_table .RESOLVED {
  background: white;
  color: green;
  font-weight: bold;
}
.single_register_table .CONTINUED {
  background: white;
  color: rgb(78, 4, 100);
  font-style: italic;
  font-weight: bold;
}

/* risk lifecycle-stage styles */
.single_register_table .stage-C {
  background: rgb(86, 157, 238);
  color: black;
  text-align: center;
  font-weight: bold;
}
.single_register_table .stage-O {
  background: rgb(186, 233, 241);
  color: black;
  text-align: center;
  font-weight: bold;
}
.single_register_table .stage-M {
  background: rgb(186, 233, 241);
  color: black;
  text-align: center;
  font-weight: bold;
}
.single_register_table .stage-D {
  background: rgb(186, 233, 241);
  color: black;
  text-align: center;
  font-weight: bold;
}

/* risk H&S styles */
.single_register_table .HS-H {
  /* background: rgb(86, 157, 238); */
  color: red;
  text-align: center;
  font-weight: bold;
}

/* risk Environment styles */
.single_register_table .Env-E {
  /* background: rgb(86, 157, 238); */
  color: green;
  text-align: center;
  font-weight: bold;
}

/* risk Programme styles */
.single_register_table .Prog-P {
  /* background: rgb(86, 157, 238); */
  color: black;
  text-align: center;
  font-weight: bold;
}

/* risk Other styles */
.single_register_table .Other-O {
  /* background: rgb(86, 157, 238); */
  color: rgb(80, 163, 231);
  text-align: center;
  font-weight: bold;
}

/* risk Centered Cells styles */
.single_register_table .center-cell {
  color: black;
  text-align: center;
  font-weight: bold;
}

/* risk Risk Product styles */
.single_register_table .risk-product-L {
  background: white;
  color: green;
  text-align: center;
  font-weight: bold;
}
.single_register_table .risk-product-M {
  background: orange;
  color: black;
  text-align: center;
  font-weight: bold;
}
.single_register_table .risk-product-H {
  background: red;
  color: white;
  text-align: center;
  font-weight: bold;
}

/* risk Further styles */
.single_register_table .Further-Y {
  background: rgb(220, 233, 149);
  color: black;
  text-align: center;
  font-weight: bold;
}

.single_register_table .cell-input input,
select {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.single_register_table td:hover {
  /* background: #f5f5f5; */
}
</style>
