<script setup lang="ts">
import Chart from "~/components/Chart.vue";
import ChartFactory from "~/lib/chartFactory";
import ChartBaseData from "~/lib/types/chart";
import { ChartType } from "chart.js";

defineProps<{
    data: number[],
}>();

const dataLabels = ref(['1','2','3','4','5'].map(x => x + " star"));
const doughnutChart: ChartBaseData<ChartType> = ChartFactory.createChart("doughnut");
const radarChart: ChartBaseData<ChartType> = ChartFactory.createChart("radar");
</script>

<template>
    <div class="chart-list-container">
        <Chart :data-values="data" :data-labels="dataLabels" :chart-data="doughnutChart"></Chart>
        <Chart :data-values="data" :data-labels="dataLabels" :chart-data="radarChart"></Chart>
    </div>
</template>

<style scoped>
.chart-list-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    width: min(90vw, 72rem);
    margin-inline: auto;
}

@media screen and (width <= 1024px) {    
    .chart-list-container {
    grid-template-columns: 1fr;
    }
}
</style>