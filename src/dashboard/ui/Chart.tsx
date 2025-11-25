import {
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { Props as YAxisProps } from "recharts/types/cartesian/YAxis";
import { useChartData } from "../services/СhartService/ChartDataProvider";
import styles from "./Chart.module.css";

const YAXIS_CONFIG: YAxisProps = {
	// Нижняя граница -> 0. Вверхняя граница -> округляем вверх до ближайшего числа, кратного 5
	domain: [0, (dataMax: number) => Math.ceil((dataMax + 5) / 5) * 5],
	label: {
		value: "Conversion Rate, %",
		angle: -90,
		position: "insideLeft",
		textAnchor: "middle",
	},
};

export const Chart = () => {
	const { chartData, chartDataConfigs, dataRenderType } = useChartData();
	const {
		container: ChartContainer,
		component: DataRenderComponent,
		props: dataRenderComponentProps,
	} = dataRenderType;

	const lines = chartDataConfigs.map(({ id, color, name }) => (
		// @ts-expect-error
		<DataRenderComponent
			{...dataRenderComponentProps}
			key={id}
			dataKey={id}
			stroke={color}
			fill={color}
			name={name}
			isAnimationActive={false}
		/>
	));

	return (
		<div className={styles.chart}>
			<ResponsiveContainer width="100%" height="100%">
				<ChartContainer data={chartData}>
					<CartesianGrid />
					{lines}
					<XAxis dataKey="date" />
					<YAxis {...YAXIS_CONFIG} />
					<Tooltip />
				</ChartContainer>
			</ResponsiveContainer>
		</div>
	);
};
