<template>
  <div class="register">
    <h1>Register for project {{ route.params.project_number }}</h1>
    <div
      class="single_register"
      v-for="register in registers"
      :key="register.register_id"
    >
      <p>Date: {{ register.date }}</p>
      <p>Id: {{ register.register_id }}</p>
      <p>Desc: {{ register.description }}</p>
      <p>Discipline: {{ register.discipline }}</p>
      <p>Environmental risk: {{ register.environmental_risk }}</p>
      <p>Further action required: {{ register.further_action_required }}</p>
      <p>HS risk: {{ register.hs_risk }}</p>
      <p>Identified by: {{ register.identified_by }}</p>
    </div>
  </div>
</template>

<script>
import getRegisters from "@/composables/getRegisters";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const { registers, loadRegisters } = getRegisters();

    loadRegisters(route.params.project_number);

    return { registers, route };
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
