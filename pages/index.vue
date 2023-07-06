<script setup lang="ts">

import Chart from "~/components/Chart.vue";

const data = ref([3, 4, 1, 6, 8]);
</script>



<template>
  <Chart :data-values="data"></Chart>
</template>

<style scoped>

</style>