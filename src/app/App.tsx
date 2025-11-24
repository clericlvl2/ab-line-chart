import { Dashboard } from "@dashboard";
import styles from "./App.module.css";

export const App = () => {
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<h1>A/B Line Chart</h1>
			</header>
			<main>
				<Dashboard />
			</main>
		</div>
	);
};
