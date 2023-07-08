<script setup lang="ts">
import {computed, ref} from 'vue'
import {defineChartComponent} from 'vue-chart-3';
import {Chart, ChartData, ChartTypeRegistry, registerables} from "chart.js";
import ChartBaseData from "~/lib/types/chart";



Chart.register(...registerables);

const props =defineProps<{
  dataValues: Array<number>,
  dataLabels: Array<string>,
  chartData: ChartBaseData
}>();


const dataLabels = ['5', '4', '3', '2', '1'].map(x => x + " star");

const ChartJs = computed(() => defineChartComponent(props.chartData.chartName, props.chartData.chartType))


const testData: ChartData = ref({
  labels: props.dataLabels,
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