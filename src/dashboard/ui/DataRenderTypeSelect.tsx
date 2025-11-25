import { type Option, Select } from "@shared";
import { Area, AreaChart, Line, LineChart } from "recharts";
import type { Props as AreaProps } from "recharts/types/cartesian/Area";
import type { Props as LineProps } from "recharts/types/cartesian/Line";
import { useChartData } from "../services/СhartService/ChartDataProvider";

export type IRenderType =
	| {
			id: string;
			component: typeof Line;
			container: typeof LineChart;
			props: Partial<LineProps>;
	  }
	| {
			id: string;
			container: typeof AreaChart;
			component: typeof Area;
			props: Partial<AreaProps>;
	  };

const OPTIONS: Option<IRenderType>[] = [
	{
		value: {
			id: "linearLine",
			component: Line,
			container: LineChart,
			props: {
				type: "linear",
			},
		},
		label: "Line",
	},
	{
		value: {
			id: "smoothLine",
			component: Line,
			container: LineChart,
			props: {
				type: "monotone",
			},
		},
		label: "Smooth Line",
	},
	{
		value: {
			id: "areaShape",
			component: Area,
			container: AreaChart,
			props: {},
		},
		label: "Area",
	},
];

export const DataRenderTypeSelect = () => {
	const { dataRenderType, setDataRenderType } = useChartData();
	const keyGetter = (value: IRenderType | null) => value?.id ?? null;

	return (
		<Select
			keyGetter={keyGetter}
			options={OPTIONS}
			value={dataRenderType}
			onChange={setDataRenderType}
		/>
	);
};
