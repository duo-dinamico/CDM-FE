<template>
  <div class="register">
    <h1>Registers for project {{ route.params.project_number }}</h1>
    <form @submit.prevent="" id="new_risk"></form>
    <table>
      <tr>
        <!-- 23 colunas -->
        <th>Registers</th>
        <th>Description of risk or hazard</th>
        <th>Risk status</th>
        <th>Discipline</th>
        <th>Risk number (unmitigated) (calculated)</th>
        <th>Revision</th>
        <th>Project lifecycle stage</th>
        <th>HS risk</th>
        <th>Environmental risk</th>
        <th>Programme risk</th>
        <th>Other risk</th>
        <th>Likelihood</th>
        <th>Severity</th>
        <th>Risk product (calculated)</th>
        <th>Relevant documentation</th>
        <th>Owner of risk</th>
        <th>Mitigation action</th>
        <th>Likelihood mitigated</th>
        <th>Severity mitigation</th>
        <th>Risk product (Mitigated) (calculated)</th>
        <th>Further action required</th>
        <th>Continuation Risk reference (calculated)</th>
        <th>Identified by</th>
        <th>Date</th>
      </tr>
      <tr
        class="single_register"
        v-for="register in registers"
        :key="register.register_id"
      >
        <single-register :register="register" />
      </tr>
      <!-- Add new line -->
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
          <select
            id="discipline"
            form="new_risk"
            v-model="newRegister.discipline"
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
        <td>XXX</td>
        <td>
          <input type="text" form="new_risk" v-model="newRegister.revision" />
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
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </td>
        <td>
          <select
            id="env_risk"
            form="new_risk"
            v-model="newRegister.environmental_risk"
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </td>
        <td>
          <select
            id="program_risk"
            form="new_risk"
            v-model="newRegister.programme_risk"
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </td>
        <td>
          <select
            id="other_risk"
            form="new_risk"
            v-model="newRegister.other_risk"
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </td>
        <td>
          <select
            id="likelihood"
            form="new_risk"
            v-model="newRegister.likelihood"
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
          <select id="severity" form="new_risk" v-model="newRegister.severity">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td>XXX</td>
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
          />
        </td>
        <td>
          <input
            type="text"
            form="new_risk"
            v-model="newRegister.mitigation_action"
          />
        </td>
        <td>
          <select
            id="likelihood_mit"
            form="new_risk"
            v-model="newRegister.likelihood_mitigated"
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
            v-model="newRegister.severity_mitigation"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td>XXX</td>
        <td>
          <select
            id="further_action"
            form="new_risk"
            v-model="newRegister.further_action_required"
          >
            <option value="True">Y</option>
            <option value="False">N</option>
          </select>
        </td>
        <td>XXX</td>
        <td>
          <input
            type="text"
            form="new_risk"
            v-model="newRegister.identified_by"
          />
        </td>
        <td>
          <input type="text" form="new_risk" v-model="newRegister.date" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import getRegisters from "@/composables/getRegisters";
import singleRegister from "@/components/singleRegister";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  components: { singleRegister },
  setup() {
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
    const route = useRoute();

    const { registers, loadRegisters } = getRegisters();

    loadRegisters(route.params.project_number);

    const handleClickAdd = () => {
      console.log("Add", newRegister.value);
    };

    return { registers, route, handleClickAdd, newRegister };
  },
};
</script>

<style>
.register {
  background: lightcoral;
}
.single_register {
  background: #aaa;
  margin: 5px;
  padding: 0 5px;
}
</style>
