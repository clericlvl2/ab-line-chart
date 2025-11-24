import { ThemePicker } from "./ThemePicker";
import styles from "./Toolbar.module.css";

export const Toolbar = () => {
	return (
		<div className={styles.toolbar}>
			<ThemePicker />
		</div>
	);
};
