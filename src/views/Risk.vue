<template>
  <div>
    <SingleRegisterDetail :isAdd="false" />
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

    return { route };
  },
};
</script>

<style></style>
