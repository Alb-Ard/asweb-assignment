<script setup lang="ts">


import {ref} from 'vue'

import Chart from "~/components/Chart.vue";

import ChartFactory from "~/lib/chartFactory";
import ChartBaseData from "~/lib/types/chart";
import ManagementPage from "~/pages/management.vue";


const data = ref([3, 4, 1, 6, 8]);
const dataLabels = ref(['5', '4', '3', '2', '1'].map(x => x + " star"));

const DoughnutChart: ChartBaseData = ChartFactory.createChart("doughnut");
const RadarChart: ChartBaseData = ChartFactory.createChart("radar");


</script>



<template>
  <div class="chartbox">
    <Chart :data-values="data" :data-labels="dataLabels" :chart-data="DoughnutChart"></Chart>
    <Chart :data-values="data" :data-labels="dataLabels" :chart-data="RadarChart"></Chart>
  </div>
</template>

<style scoped>

.chartbox {
  display: inline-block;
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
}


</style>