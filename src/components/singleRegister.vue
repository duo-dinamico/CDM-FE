<template>
  <td v-if="!showAll">{{ register.date }}</td>
  <td v-if="!showAll">{{ register.description }}</td>
  <td v-if="!showAll">{{ register.risk_status }}</td>

  <div v-if="showAll">
    <p>Date: {{ register.date }}</p>
    <p>Desc: {{ register.description }}</p>
    <p>Discipline: {{ register.discipline }}</p>
    <p>Environmental risk: {{ register.environmental_risk }}</p>
    <p>Further action required: {{ register.further_action_required }}</p>
    <p>HS risk: {{ register.hs_risk }}</p>
    <p>Identified by: {{ register.identified_by }}</p>
    <p>Likelihood: {{ register.likelihood }}</p>
    <p>Likelihood mitigated: {{ register.likelihood_mitigated }}</p>
    <p>Mitigation action: {{ register.mitigation_action }}</p>
    <p>Other risk: {{ register.other_risk }}</p>
    <p>Owner of risk: {{ register.owner_of_risk }}</p>
    <p>Programme risk: {{ register.programme_risk }}</p>
    <p>Project lifecycle stage: {{ register.project_lifecycle_stage }}</p>
    <p>Project number: {{ register.project_number }}</p>
    <p>Id: {{ register.register_id }}</p>
    <p>Relevant documentation: {{ register.relevant_documentation }}</p>
    <p>Revision: {{ register.revision }}</p>
    <p>Risk status: {{ register.risk_status }}</p>
    <p>Severity: {{ register.severity }}</p>
    <p>Severity mitigation: {{ register.severity_mitigation }}</p>
  </div>
</template>

<script>
export default {
  props: ["register", "showAll"],
  setup() {},
};
</script>

<style></style>
