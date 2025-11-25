import type { IDailyData, IDataConfig, IDataDTO } from "../DataService/model";
import {
	type ChartDataPoint,
	type IChartDataConfig,
	TimeRange,
	type WeekMetrics,
} from "./model";

const PRECISION = 2;
const DEFAULT_COLOR = "#000000";
const CHART_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];
export const ORIGINAL_DATA_KEY = "0";

const SUNDAY = 0;
const MONDAY = 1;
const DAYS_IN_WEEK = 6;

class ChartService {
	transformToChartData(
		rawData: IDataDTO,
		selectedDataKeys: string[],
		timeRange: TimeRange,
	): ChartDataPoint[] {
		const trimmedData = this.trimDataEdges(rawData.data, selectedDataKeys);

		return timeRange === TimeRange.Week
			? this.aggregateWeeklyData(trimmedData, selectedDataKeys)
			: this.transformDailyData(trimmedData, selectedDataKeys);
	}

	createChartDataConfig(dataConfigs: IDataConfig[]): IChartDataConfig[] {
		return dataConfigs.map((dataConfig, index) => ({
			id: String(dataConfig.id ?? ORIGINAL_DATA_KEY),
			name: dataConfig.name,
			color: CHART_COLORS[index] ?? DEFAULT_COLOR,
		}));
	}

	private trimDataEdges(
		data: IDailyData[],
		selectedDataKeys: string[],
	): IDailyData[] {
		if (data.length === 0) return [];

		const hasValue = (day: IDailyData) =>
			this.hasAnyData(day, selectedDataKeys);
		const firstIndex = data.findIndex(hasValue);

		if (firstIndex === -1) return [];

		const lastIndex = [...data].reverse().findIndex(hasValue);
		const actualLastIndex = data.length - 1 - lastIndex;

		return data.slice(firstIndex, actualLastIndex + 1);
	}

	private transformDailyData(
		dailyData: IDailyData[],
		selectedDataKeys: string[],
	): ChartDataPoint[] {
		return dailyData.map((day) => this.transformDay(day, selectedDataKeys));
	}

	private transformDay(
		day: IDailyData,
		selectedKeys: string[],
	): ChartDataPoint {
		const point: ChartDataPoint = { date: day.date };

		selectedKeys.forEach((dataKey) => {
			const visits = day.visits[dataKey];
			const conversions = day.conversions[dataKey];

			if (conversions && visits && this.hasValidMetrics(visits, conversions)) {
				point[dataKey] = this.calculateConversionRate(conversions, visits);
			}
		});

		return point;
	}

	private aggregateWeeklyData(
		data: IDailyData[],
		selectedVariations: string[],
	): ChartDataPoint[] {
		const weekMap = this.groupByWeek(data);
		const result: ChartDataPoint[] = [];

		weekMap.forEach((days, weekStart) => {
			const metrics = this.aggregateWeekMetrics(days, selectedVariations);
			const point = this.createWeeklyPoint(
				weekStart,
				metrics,
				selectedVariations,
			);
			result.push(point);
		});

		return result;
	}

	private groupByWeek(data: IDailyData[]): Map<string, IDailyData[]> {
		const weekMap = new Map<string, IDailyData[]>();

		data.forEach((day) => {
			const weekStart = this.getWeekStart(day.date);

			if (!weekMap.has(weekStart)) {
				weekMap.set(weekStart, []);
			}

			weekMap.get(weekStart)?.push(day);
		});

		return weekMap;
	}

	private aggregateWeekMetrics(
		days: IDailyData[],
		selectedKeys: string[],
	): WeekMetrics {
		const metrics: WeekMetrics = { visits: {}, conversions: {} };

		days.forEach((day) => {
			selectedKeys.forEach((varId) => {
				const visits = day.visits[varId];
				const conversions = day.conversions[varId];

				if (visits !== undefined && conversions !== undefined) {
					metrics.visits[varId] = (metrics.visits[varId] || 0) + visits;
					metrics.conversions[varId] =
						(metrics.conversions[varId] || 0) + conversions;
				}
			});
		});

		return metrics;
	}

	private createWeeklyPoint(
		date: string,
		metrics: WeekMetrics,
		selectedKeys: string[],
	): ChartDataPoint {
		const point: ChartDataPoint = { date };

		selectedKeys.forEach((varId) => {
			const visits = metrics.visits[varId];
			const conversions = metrics.conversions[varId];

			if (visits && conversions) {
				point[varId] = this.calculateConversionRate(conversions, visits);
			}
		});

		return point;
	}

	private getWeekStart(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDay();
		const diff =
			date.getDate() - day + (day === SUNDAY ? -DAYS_IN_WEEK : MONDAY);
		const monday = new Date(date.setDate(diff));
		return monday.toISOString().split("T")[0] ?? "";
	}

	private formatNumber(value: number, precision = PRECISION): number {
		const multiplier = 10 ** precision;
		return Math.round(value * multiplier) / multiplier;
	}

	private calculateConversionRate(conversions: number, visits: number): number {
		if (visits === 0) return 0;
		const rate = (conversions / visits) * 100;
		return this.formatNumber(rate);
	}

	private hasValidMetrics(
		visits: number | undefined,
		conversions: number | undefined,
	): boolean {
		return visits !== undefined && conversions !== undefined && visits > 0;
	}

	private hasAnyData(day: IDailyData, selectedKeys: string[]): boolean {
		return selectedKeys.some((key) =>
			this.hasValidMetrics(day.visits[key], day.conversions[key]),
		);
	}
}

export const chartService = new ChartService();
