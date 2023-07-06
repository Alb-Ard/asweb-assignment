<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
import {Chart, ChartData, registerables} from "chart.js";
import {integer} from "vscode-languageserver-types";


Chart.register(...registerables);

const props =defineProps<{
  dataValues: Array<integer>
}>();


const dataLabels = ['5', '4', '3', '2', '1'].map(x => x + " star");



const testData: ChartData = ref({
  labels: dataLabels,
  datasets: [
    {
      data: props.dataValues,
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