<script setup lang="ts">


import {ref} from 'vue'

import Chart from "~/components/Chart.vue";

import ChartFactory from "~/lib/chartFactory";
import ChartBaseData from "~/lib/types/chart";


const data = ref([3, 4, 1, 6, 8]);
const dataLabels = ref(['5', '4', '3', '2', '1'].map(x => x + " star"));

const DoughnutChart: ChartBaseData = ChartFactory.createChart("doughnut");
const RadarChart: ChartBaseData = ChartFactory.createChart("radar");


</script>



<template>
  <Chart :data-values="data" :data-labels="dataLabels" :chart-data="DoughnutChart"></Chart>
  <Chart :data-values="data" :data-labels="dataLabels" :chart-data="RadarChart"></Chart>
  <PlaceCard></PlaceCard>
</template>

<style scoped>

</style>