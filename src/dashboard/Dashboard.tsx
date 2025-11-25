import styles from "./Dashboard.module.css";
import { ChartDataProvider } from "./services/СhartService/ChartDataProvider";
import { Chart } from "./ui/Chart";
import { Toolbar } from "./ui/Toolbar";

export const Dashboard = () => {
	return (
		<ChartDataProvider>
			<div className={styles.dashboard}>
				<div className={styles.dashboard__toolbar}>
					<Toolbar />
				</div>

				<main className={styles.dashboard__content}>
					<Chart />
				</main>
			</div>
		</ChartDataProvider>
	);
};
