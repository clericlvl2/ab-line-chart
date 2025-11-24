import styles from "./Dashboard.module.css";
import { Chart } from "./ui/Chart";
import { Toolbar } from "./ui/Toolbar";

export const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<Toolbar />

			<main className={styles.content}>
				<Chart />
			</main>
		</div>
	);
};
