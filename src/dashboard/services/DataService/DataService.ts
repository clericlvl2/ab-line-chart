import ABTestData from "./data.json";
import type { IDailyData, IDataConfig, IDataDTO } from "./model";

class DataService {
	constructor(private data: IDataDTO = ABTestData as IDataDTO) {}

	getData(): IDataDTO {
		return this.data;
	}

	getDataConfigs(): IDataConfig[] {
		return this.data.variations;
	}

	getDailyData(): IDailyData[] {
		return this.data.data;
	}
}

export const dataService = new DataService();
