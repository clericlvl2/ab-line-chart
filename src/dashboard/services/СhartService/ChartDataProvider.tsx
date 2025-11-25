import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import { Line, LineChart } from "recharts";
import type { IRenderType } from "../../ui/DataRenderTypeSelect";
import { dataService } from "../DataService/DataService";
import { chartService, ORIGINAL_DATA_KEY } from "./ChartService";
import { type IDataManager, TimeRange } from "./model";

const DEFAULT_TIME_RANGE = TimeRange.Day;
const DEFAULT_DATA_KEYS = [ORIGINAL_DATA_KEY];
const DEFAULT_DATA_RENDER_TYPE: IRenderType = {
	id: "linearLine",
	component: Line,
	container: LineChart,
	props: {
		type: "linear",
	},
};

const ChartDataContext = createContext<IDataManager | null>(null);

export const ChartDataProvider = ({ children }: { children: ReactNode }) => {
	const [selectedKeys, setSelectedKeys] = useState<string[]>(DEFAULT_DATA_KEYS);
	const [timeRange, setTimeRange] = useState<TimeRange>(DEFAULT_TIME_RANGE);
	const [dataRenderType, setDataRenderType] = useState<IRenderType>(
		DEFAULT_DATA_RENDER_TYPE,
	);

	const chartDataConfigs = useMemo(() => {
		const dataConfigs = dataService.getDataConfigs();
		return chartService.createChartDataConfig(dataConfigs);
	}, []);

	const selectedChartDataConfigs = useMemo(
		() => chartDataConfigs.filter(({ id }) => selectedKeys.includes(id)),
		[chartDataConfigs, selectedKeys],
	);

	const chartData = useMemo(() => {
		const data = dataService.getData();

		return chartService.transformToChartData(data, selectedKeys, timeRange);
	}, [selectedKeys, timeRange]);

	return (
		<ChartDataContext.Provider
			value={{
				chartData,
				chartDataConfigs,
				selectedChartDataConfigs,
				timeRange,
				setTimeRange,
				selectedKeys,
				setSelectedKeys,
				dataRenderType,
				setDataRenderType,
			}}
		>
			{children}
		</ChartDataContext.Provider>
	);
};

export const useChartData = (): IDataManager => {
	const context = useContext(ChartDataContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
