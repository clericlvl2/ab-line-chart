import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import type { IThemeManager, Theme } from "./model";
import { themeService } from "./ThemeService";

const ThemeContext = createContext<IThemeManager | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<Theme>(() => themeService.get());

	const setTheme = useCallback((theme: Theme) => {
		themeService.set(theme);
		setThemeState(theme);
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): IThemeManager => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
