import { LocalStorageService } from "@shared";
import {
	DEFAULT_THEME,
	type IStorageSchema,
	StorageKey,
	type Theme,
} from "./model";

export class ThemeService {
	private storage = new LocalStorageService<StorageKey, IStorageSchema>();

	constructor() {
		this.init();
	}

	private applyTheme(theme: Theme) {
		document.documentElement.setAttribute("data-theme", theme);
	}

	private init() {
		const current = this.storage.get(StorageKey.Theme);

		if (current) {
			return;
		}

		this.storage.set(StorageKey.Theme, DEFAULT_THEME);
		this.applyTheme(DEFAULT_THEME);
	}

	get(): Theme {
		const saved = this.storage.get(StorageKey.Theme);

		return saved ?? DEFAULT_THEME;
	}

	set(theme: Theme) {
		this.storage.set(StorageKey.Theme, theme);
		this.applyTheme(theme);
	}
}

export const themeService = new ThemeService();
