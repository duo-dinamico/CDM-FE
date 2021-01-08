<template>
  <tr class="single_register_table">
    <form @submit.prevent="handleClickAdd" id="new_risk"></form>
    <td>
      <button form="new_risk">
        ➕
      </button>
    </td>
    <td class="cell-input">
      <input type="text" form="new_risk" v-model="newRegister.description" />
    </td>
    <td>
      <select
        id="risk_status"
        form="new_risk"
        v-model="newRegister.risk_status"
        required
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
        required
      >
        <option value="C">C</option>
        <option value="O">O</option>
        <option value="M">M</option>
        <option value="D">D</option>
      </select>
    </td>
    <td>
      <select
        id="hs_risk"
        form="new_risk"
        v-model="newRegister.hs_risk"
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="env_risk"
        form="new_risk"
        v-model="newRegister.environmental_risk"
        required
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
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="other_risk"
        form="new_risk"
        v-model="newRegister.other_risk"
        required
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td>
      <select
        id="likelihood"
        form="new_risk"
        v-model="newRegister.likelihood"
        required
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
    </td>
    <td>
      <select
        id="severity"
        form="new_risk"
        v-model="newRegister.severity"
        required
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
    </td>

    <td :class="'risk-product-' + riskProduct">{{ riskProduct }}</td>

    <td>
      <input
        type="text"
        form="new_risk"
        v-model="newRegister.relevant_documentation"
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
    <td class="cell-input">
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
        required
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
    </td>
    <td>
      <select
        id="severity_mit"
        form="new_risk"
        v-model="newRegister.severity_mitigation"
        required
      >
        <option v-for="num in One2FiveList" :key="num" :value="num">
          {{ num }}
        </option>
      </select>
    </td>

    <td :class="'risk-product-' + riskProductMitigated">
      {{ riskProductMitigated }}
    </td>
    <td>
      <select
        id="further_action"
        form="new_risk"
        v-model="newRegister.further_action_required"
        required
      >
        <option value="true">Y</option>
        <option value="false">N</option>
      </select>
    </td>
    <td class="center-cell">
      {{
        !newRegister.description
          ? ""
          : newRegister.further_action_required === "true"
          ? "TBC"
          : ""
      }}
    </td>
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
import { computed, ref } from "vue";
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

    const One2FiveList = ["1", "2", "3", "4", "5"];

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
      disciplineList,
      One2FiveList,
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
