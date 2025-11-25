import { Select } from "@shared";
import { useChartData } from "../services/СhartService/ChartDataProvider";
import { TimeRange } from "../services/СhartService/model";

const OPTIONS = [
	{ value: TimeRange.Day, label: "Day" },
	{ value: TimeRange.Week, label: "Week" },
];

export const TimeRangeSelect = () => {
	const { timeRange, setTimeRange } = useChartData();

	return <Select options={OPTIONS} value={timeRange} onChange={setTimeRange} />;
};
