<template>
  <div class="register">
    <h1>Registers for project {{ route.params.project_number }}</h1>
    <p>Button status: {{ showAll }}</p>
    <button @click="showAll = !showAll">Show All</button>
    <!-- Show as table -->
    <div v-if="!showAll">
      <table>
        <tr>
          <th>Date</th>
          <th>Desc</th>
          <th>Risk status</th>
        </tr>
        <tr
          class="single_register"
          v-for="register in registers"
          :key="register.register_id"
        >
          <single-register :register="register" :showAll="showAll" />
        </tr>
      </table>
    </div>

    <!-- Show as div -->
    <div v-else>
      <div
        class="single_register"
        v-for="register in registers"
        :key="register.register_id"
      >
        <single-register :register="register" :showAll="showAll" />
      </div>
    </div>
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
    const showAll = ref(false);

    const route = useRoute();
    const { registers, loadRegisters } = getRegisters();

    loadRegisters(route.params.project_number);

    return { registers, route, showAll };
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
