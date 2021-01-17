<template>
  <div>
    <SingleRegisterDetail :isAdd="isAdd" />
  </div>
</template>

<script>
import SingleRegisterDetail from "@/components/SingleRegisterDetail";
import { useRoute } from "vue-router";

export default {
  components: { SingleRegisterDetail },
  setup() {
    // route variable for route related    actions
    const route = useRoute();

    let isAdd = false;

    if (route.params.risk_number === "Add") {
      isAdd = true;
    }

    return { isAdd };
  },
};
</script>

<style></style>
