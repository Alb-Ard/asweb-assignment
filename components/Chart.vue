<script setup lang="ts">
import { defineChartComponent } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, ChartType, registerables } from "chart.js";
import ChartBaseData from "~/lib/types/chart";

Chart.register(...registerables);

const props = defineProps<{
    dataValues: Array<number>,
    dataLabels: Array<string>,
    chartData: ChartBaseData<ChartType>
}>();

const getCssVariableValue = (name: string) => !!document.documentElement ? window.getComputedStyle(document.documentElement).getPropertyValue(name) : "";

const ChartJs = computed(() => defineChartComponent(props.chartData.chartName, props.chartData.chartType));
const type = props.chartData.chartType;
const displayData: Ref<ChartData<typeof type>> = ref({
    labels: props.dataLabels,
    datasets: [
        {
            data: props.dataValues,
        }
    ]
});
const options: Ref<ChartOptions<typeof type>> = ref({
    ...props.chartData.options,
    plugins: {
        ...props.chartData.options.plugins,
        colors: {
            forceOverride: true
        }
    }
});

onMounted(() => {
    displayData.value = {
        labels: props.dataLabels,
        datasets: [
            {
                data: props.dataValues,
                backgroundColor: [
                    getCssVariableValue("--color-primary-100"),
                    getCssVariableValue("--color-grey-300"),
                    getCssVariableValue("--color-primary-400"),
                    getCssVariableValue("--color-grey-500"),
                    getCssVariableValue("--color-primary-600"),
                ],
                borderColor: getCssVariableValue("--color-grey-900"),
                pointBackgroundColor: getCssVariableValue("--color-primary-400"),
                pointBorderColor: "transparent",
            },
        ],
    };
    options.value = {
        ...options.value,
        color: getCssVariableValue("--color-on-800"),
        plugins: {
            ...options.value.plugins,
            title: {
                ...options.value.plugins?.title,
                color: getCssVariableValue("--color-on-800"),
            }
        }
    };
})
</script>

<template>
    <Panel level="800" radius="3">
        <ChartJs :chartData="displayData" :options="options" /> 
    </Panel>
</template>