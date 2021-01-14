<template>
  <h1>{{ risk.description }}</h1>
</template>

<script>
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    // route variable for route related actions
    const route = useRoute();

    const { registers, risk, loadRegisters, loadSingleRisk } = Registers();

    const lookupRisk = async () => {
      const register_id = ref(0);
      await loadRegisters(route.params.project_number);
      for (let register of registers.value) {
        if (register.risk_number === route.params.risk_number) {
          register_id.value = register.register_id;
        }
      }
      await loadSingleRisk(route.params.project_number, register_id.value);
    };
    lookupRisk();

    return { loadSingleRisk, risk };
  },
};
</script>

<style></style>
