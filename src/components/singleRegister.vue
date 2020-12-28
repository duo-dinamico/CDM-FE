<template>
  <tr>
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
    <td>XXX</td>
    <td>{{ register.relevant_documentation }}</td>
    <td>{{ register.owner_of_risk }}</td>
    <td>{{ register.mitigation_action }}</td>
    <td>{{ register.likelihood_mitigated }}</td>
    <td>{{ register.severity_mitigation }}</td>
    <td>XXX</td>

    <td v-if="register.further_action_required">Y</td>
    <td v-else>N</td>

    <td>XXX</td>
    <td>{{ register.identified_by }}</td>
    <td>{{ register.date }}</td>
  </tr>
</template>

<script>
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";

export default {
  props: ["register"],
  emits: ["reloadregisters"],
  setup(props, { emit }) {
    const { delRegister } = Registers();

    const route = useRoute();

    const handleClickEdit = () => {
      console.log("Edit");
    };

    const handleClickDelete = async () => {
      await delRegister(
        route.params.project_number,
        props.register.risk_number
      );
      await emit("reloadregisters");
    };

    return { handleClickEdit, handleClickDelete };
  },
};
</script>

<style></style>
