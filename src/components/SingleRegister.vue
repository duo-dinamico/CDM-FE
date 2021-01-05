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

    <td :class="register.risk_status">{{ register.risk_status }}</td>

    <td>{{ register.discipline }}</td>
    <td>{{ register.risk_number }}</td>
    <td>{{ register.revision }}</td>

    <td :class="'stage-' + register.project_lifecycle_stage">
      {{ register.project_lifecycle_stage }}
    </td>

    <td v-if="register.hs_risk" class="HS-H">H</td>
    <td v-else></td>

    <td v-if="register.environmental_risk" class="Env-E">E</td>
    <td v-else></td>

    <td v-if="register.programme_risk" class="Prog-P">P</td>
    <td v-else></td>

    <td v-if="register.other_risk" class="Other-O">O</td>
    <td v-else></td>

    <td class="center-cell">{{ register.likelihood }}</td>
    <td class="center-cell">{{ register.severity }}</td>

    <td :class="'risk-product-' + register.risk_product">
      {{ register.risk_product }}
    </td>

    <td>{{ register.relevant_documentation }}</td>
    <td>{{ register.owner_of_risk }}</td>
    <td>{{ register.mitigation_action }}</td>

    <td class="center-cell">{{ register.likelihood_mitigated }}</td>
    <td class="center-cell">{{ register.severity_mitigation }}</td>
    <td :class="'risk-product-' + register.risk_product">
      {{ register.risk_product_mitigated }}
    </td>

    <td v-if="register.further_action_required" class="Further-Y">Y</td>
    <td v-else class="center-cell">N</td>

    <td class="center-cell">
      {{
        !register.description
          ? ""
          : register.further_action_required
          ? "TBC"
          : ""
      }}
    </td>

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
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td>
      <select id="severity" form="new_risk" v-model="editedRegister.severity">
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
      disciplineList,
    };
  },
};
</script>

<style>
.single_register_table td {
  background: lightgray;
  border: 1px solid;
  text-align: left;
  vertical-align: middle;
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

.single_register_table td:hover {
  /* background: #f5f5f5; */
}
</style>
