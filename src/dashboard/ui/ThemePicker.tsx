import { Theme, useTheme } from "@shared";
import styles from "./ThemePicker.module.css";

export const ThemePicker = () => {
	const themeController = useTheme();

	const setLightTheme = () => {
		themeController.setTheme(Theme.Light);
	};

	const setDarkTheme = () => {
		themeController.setTheme(Theme.Dark);
	};

	return (
		<div>
			<button type="button" className={styles.button} onClick={setLightTheme}>
				🌞
			</button>
			<button type="button" className={styles.button} onClick={setDarkTheme}>
				🌙
			</button>
		</div>
	);
};
