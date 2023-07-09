<script setup lang="ts">


import {ref} from 'vue'

import Chart from "~/components/Chart.vue";

import ChartFactory from "~/lib/chartFactory";
import ChartBaseData from "~/lib/types/chart";
import {ChartType} from "chart.js";


const props =defineProps<{
    data: number[],
}>();


const dataLabels = ref(['0','1','2','3','4','5'].map(x => x + " star"));



const DoughnutChart: ChartBaseData<ChartType> = ChartFactory.createChart("doughnut");
const RadarChart: ChartBaseData<ChartType> = ChartFactory.createChart("radar");

function computeStatData(data: number[] ,approx = true) {
    data = data.map(x => approx ? Math.round(x) : x)
    const arr: number[] = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < data.length; i++) {
        arr[data[i]] += 1
    }

    return arr;
}

</script>



<template>
  <div class="chartbox">
    <Chart :data-values="computeStatData(data)" :data-labels="dataLabels" :chart-data="DoughnutChart"></Chart>
    <Chart :data-values="computeStatData(data)" :data-labels="dataLabels" :chart-data="RadarChart"></Chart>
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