import { Dashboard } from "@dashboard";
import styles from "./App.module.css";

export const App = () => {
	return (
		<div className={styles.app}>
			<header className={styles.app__header}>
				<h1>A/B Test Statistics</h1>
			</header>
			<main className={styles.app__main}>
				<Dashboard />
			</main>
		</div>
	);
};
