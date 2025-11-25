import { ChartDataSelect } from "./ChartDataSelect";
import { DataRenderTypeSelect } from "./DataRenderTypeSelect";
import { ThemePicker } from "./ThemePicker";
import { TimeRangeSelect } from "./TimeRangeSelect";
import styles from "./Toolbar.module.css";

export const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<ChartDataSelect />
			<TimeRangeSelect />
			<DataRenderTypeSelect />
			<div className={styles.toolbar__panel}>
				<ThemePicker />
			</div>
		</div>
	);
};
