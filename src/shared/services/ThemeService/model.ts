export enum Theme {
	Dark = "dark",
	Light = "light",
}

export enum StorageKey {
	Theme = "theme",
}

export interface IStorageSchema {
	[StorageKey.Theme]: Theme;
}

export const DEFAULT_THEME = Theme.Light;

export interface IThemeManager {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}
