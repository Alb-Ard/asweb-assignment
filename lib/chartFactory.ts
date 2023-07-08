import ChartBaseData from "~/lib/types/chart";


class ChartFactory {
    static createChart(type: String): ChartBaseData {
        if (type == "doughnut") {
            return  {
                chartName: "doughnut-chart",
                chartType: "doughnut"
            }
        }
        else {
            return {
                chartName: "radar-chart",
                chartType: "radar"
            }
        }
    }
}

export default ChartFactory;