export interface IDataConfig {
	id?: string;
	name: string;
}

export interface IDailyData {
	date: string;
	visits: Record<string, number>;
	conversions: Record<string, number>;
}

export interface IDataDTO {
	variations: IDataConfig[];
	data: IDailyData[];
}
