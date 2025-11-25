import { Dropdown } from "./Dropdown";
import styles from "./Select.module.css";

type TOptionValue = string | Record<string, unknown>;

export interface Option<T extends TOptionValue> {
	value: T;
	label: string;
}

interface SelectProps<T extends TOptionValue> {
	options: Option<T>[];
	value: T | null;
	onChange: (value: T) => void;
	keyGetter?: (value: T | null) => string | null;
	placeholder?: string;
}

export const Select = <T extends TOptionValue>({
	options,
	value,
	keyGetter,
	onChange,
	placeholder = "Select an option",
}: SelectProps<T>) => {
	const isSelectedValue = (current: T | null) => {
		return keyGetter
			? keyGetter(current) === keyGetter(value)
			: current === value;
	};
	const selectedOption = options.find((opt) => isSelectedValue(opt.value));
	const label = selectedOption ? selectedOption.label : placeholder;

	return (
		<Dropdown trigger={<span>{label}</span>}>
			{options.map((option) => (
				<button
					key={option.label}
					type="button"
					className={styles.select__item}
					onClick={() => onChange(option.value)}
				>
					<span className={styles.select__label}>{option.label}</span>
					{isSelectedValue(option.value) && (
						<span className={styles.select__checkmark}>✓</span>
					)}
				</button>
			))}
		</Dropdown>
	);
};
