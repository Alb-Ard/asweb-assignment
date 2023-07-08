<script setup lang="ts">
import {computed, ref} from 'vue'
import {defineChartComponent} from 'vue-chart-3';
import {Chart, ChartData, ChartOptions, ChartTypeRegistry, LegendOptions, registerables} from "chart.js";
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
      //backgroundColor: ['blue', 'red', 'white', 'green', 'yellow'],
      backgroundColor: ["rgba(255, 0, 0, 0.6)", "rgba(0, 255, 0, 0.6)", "rgba(0, 0, 255, 0.6)", "rgba(128, 128, 0,0.6)", "rgba(0, 128, 128, 0.6)"],
      borderColor: "black",
      pointBackgroundColor: "yellow",
      pointBorderColor: "black",
    },
  ],
});



const options: ChartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
      color: "green"
    },

  },
});




</script>



<template>
  <div class="chart">
    <ChartJs :chartData = "testData" :options="options"></ChartJs>
  </div>
</template>

<style scoped>
  .chart {
    width: 50%;
    display: inline-block;
    background-color: rgb(255, 255, 0, 0.1);
    border-style: dotted;
    border-color: blue;
  }
</style>