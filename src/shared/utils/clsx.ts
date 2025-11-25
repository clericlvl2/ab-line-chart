type TClassValue = string | number | boolean | null | undefined;

export const clsx = (...args: TClassValue[]): string =>
	args.filter(Boolean).join(" ");
