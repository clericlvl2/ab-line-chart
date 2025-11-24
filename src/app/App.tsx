import { Dashboard } from "@dashboard";
import styles from "./App.module.css";

export const App = () => {
	return (
		<div className={styles.app}>
			<h1>AB-test visualization app</h1>
			<Dashboard />
		</div>
	);
};
