import {
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useChartData } from "../services/СhartService/ChartDataProvider";
import styles from "./Chart.module.css";

const YAXIS_LABEL_CONFIG = {
	value: "Conversion Rate, %",
	angle: -90,
	position: "insideLeft",
	textAnchor: "middle",
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
			// isAnimationActive={false}
		/>
	));

	return (
		<div className={styles.chart}>
			<ResponsiveContainer width="100%" height="100%">
				<ChartContainer data={chartData}>
					<CartesianGrid />
					{lines}
					<XAxis dataKey="date" />
					<YAxis label={YAXIS_LABEL_CONFIG} />
					<Tooltip />
				</ChartContainer>
			</ResponsiveContainer>
		</div>
	);
};
