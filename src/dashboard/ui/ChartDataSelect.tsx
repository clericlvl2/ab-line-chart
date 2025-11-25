import { MultiSelect } from "@shared";
import { useChartData } from "../services/СhartService/ChartDataProvider";

const MIN_SELECTED_OPTIONS = 1;

export const ChartDataSelect = () => {
	const { selectedKeys, setSelectedKeys, chartDataConfigs } = useChartData();

	const options = chartDataConfigs.map((c) => ({
		value: c.id,
		label: c.name,
	}));

	const label =
		selectedKeys.length === options.length
			? "All variations selected"
			: `Variations selected: ${selectedKeys.length}`;

	return (
		<MultiSelect
			label={label}
			options={options}
			selectedKeys={selectedKeys}
			onSelectedKeysChanged={setSelectedKeys}
			minSelectedOptions={MIN_SELECTED_OPTIONS}
		/>
	);
};
