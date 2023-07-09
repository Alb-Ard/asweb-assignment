import ChartBaseData from "~/lib/types/chart";
import {ChartType} from "chart.js";


class ChartFactory {
    static createChart(type: String): ChartBaseData<ChartType> {
        if (type == "doughnut") {
            return  {
                chartName: "doughnut-chart",
                chartType: "doughnut",
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Doughnut Chart',
                            color: "green"
                        },

                    },
                }
            }
        }
        else if (type =="radar"){
            return {
                chartName: "radar-chart",
                chartType: "radar",
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Radar Chart',
                            color: "green"
                        },

                    },
                }
            }
        }
        else return this.createChart("doughnut");
    }
}

export default ChartFactory;