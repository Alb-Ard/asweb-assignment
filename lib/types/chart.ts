import {ChartTypeRegistry} from "chart.js";

interface ChartBaseData {
    readonly chartName: string,
    readonly chartType: keyof ChartTypeRegistry
}

export default ChartBaseData;