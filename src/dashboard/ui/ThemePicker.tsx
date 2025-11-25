import { clsx, Theme, useTheme } from "@shared";
import styles from "./ThemePicker.module.css";

export const ThemePicker = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className={styles.themePicker}>
			<button
				type="button"
				className={clsx(
					styles.themePicker__button,
					theme === Theme.Light && styles["themePicker__button--active"],
				)}
				onClick={() => setTheme(Theme.Light)}
			>
				🌞
			</button>
			<button
				type="button"
				className={clsx(
					styles.themePicker__button,
					theme === Theme.Dark && styles["themePicker__button--active"],
				)}
				onClick={() => setTheme(Theme.Dark)}
			>
				🌙
			</button>
		</div>
	);
};
