<template>
  <h1 v-if="$route.params.register_id">{{ risk.risk_number }}</h1>
</template>

<script>
import Registers from "@/composables/Registers";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  setup() {
    // route variable for route related actions
    const route = useRoute();

    console.log(route.params.register_id);

    if (route.params.register_id) {
      const { risk, loadSingleRisk } = Registers();
      loadSingleRisk(route.params.project_number, route.params.register_id);
      console.log(risk.value);

      return { loadSingleRisk, risk };
    } else {
      router.push({
        name: "Register",
        params: {
          project_number: route.params.project_number,
        },
      });
    }
  },
};
</script>

<style></style>
