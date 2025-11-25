import type { IRenderType } from "../../ui/DataRenderTypeSelect";

interface IDataKeysFilter {
	selectedKeys: string[];
	setSelectedKeys: (selectedKeys: string[]) => void;
}

export interface ChartDataPoint {
	date: string;

	[key: string]: number | string;
}

export interface IChartDataConfig {
	id: string;
	name: string;
	color: string;
}

export enum TimeRange {
	Day = "day",
	Week = "week",
}

interface ITimeRangeFilter {
	timeRange: TimeRange;
	setTimeRange: (timeRange: TimeRange) => void;
}

interface IRenderTypeFilter {
	dataRenderType: IRenderType;
	setDataRenderType: (type: IRenderType) => void;
}

export interface IDataManager
	extends IDataKeysFilter,
		ITimeRangeFilter,
		IRenderTypeFilter {
	chartData: ChartDataPoint[];
	chartDataConfigs: IChartDataConfig[];
	selectedChartDataConfigs: IChartDataConfig[];
}

export interface WeekMetrics {
	visits: Record<string, number>;
	conversions: Record<string, number>;
}
