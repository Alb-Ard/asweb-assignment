<script setup lang="ts">

import Chart from "~/components/Chart.vue";


const data = ref([3, 4, 1, 6, 8]);

//TO DO: wrap chart name and type (along with options) in an interface

</script>



<template>
  <Chart :data-values="data" :chart-name = "'doughnut-chart'" :chart-type = "'doughnut'"></Chart>
  <Chart :data-values="data" chart-name="'radar-chart'" chart-type="radar"></Chart>
</template>

<style scoped>

</style>