import {ChartOptions, ChartType} from "chart.js";



interface ChartBaseData<T extends ChartType> {
    readonly chartName: string,
    readonly chartType: ChartType,
    readonly options: ChartOptions<T>
}

export default ChartBaseData;