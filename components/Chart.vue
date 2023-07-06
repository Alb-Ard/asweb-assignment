<script setup lang="ts">
import {defineChartComponent} from 'vue-chart-3';
import {Chart, ChartData, ChartTypeRegistry, registerables} from "chart.js";
import {integer} from "vscode-languageserver-types";


Chart.register(...registerables);

const props =defineProps<{
  dataValues: Array<integer>,
  chartName: string,
  chartType: keyof ChartTypeRegistry
}>();


const dataLabels = ['5', '4', '3', '2', '1'].map(x => x + " star");

const ChartJs = defineChartComponent(props.chartName, props.chartType)


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
  <ChartJs :chartData = "testData"></ChartJs>
</template>

<style scoped>

</style>