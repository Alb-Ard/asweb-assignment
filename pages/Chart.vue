<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);

const dataValues = ref([3, 4, 1, 6, 8]);
const dataLabels = ref(['5', '4', '3', '2', '1']);



const testData = reactive({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['blue', 'red', 'white', 'green', 'yellow'],
    },
  ],
});

</script>



<template>
  <DoughnutChart :chartData = "testData"></DoughnutChart>
</template>

<style scoped>

</style>