import { Dropdown } from "./Dropdown";
import styles from "./MultiSelect.module.css";

interface Option {
	value: string;
	label: string;
}

interface MultiSelectProps {
	options: Option[];
	selectedKeys: string[];
	onSelectedKeysChanged: (selected: string[]) => void;
	label: string;
	minSelectedOptions?: number;
}

const MIN_SELECTED_OPTIONS = 0;

export const MultiSelect = ({
	options,
	selectedKeys,
	onSelectedKeysChanged,
	label,
	minSelectedOptions = MIN_SELECTED_OPTIONS,
}: MultiSelectProps) => {
	const isOptionDisabled = (value: string) => {
		return (
			selectedKeys.includes(value) && selectedKeys.length <= minSelectedOptions
		);
	};

	const toggleOption = (value: string) => {
		if (isOptionDisabled(value)) {
			return;
		}

		const newSelected = selectedKeys.includes(value)
			? selectedKeys.filter((v) => v !== value)
			: [...selectedKeys, value];
		onSelectedKeysChanged(newSelected);
	};

	return (
		<Dropdown trigger={<span>{label}</span>}>
			{options.map((option) => (
				<label key={option.value} className={styles.multiselect__item}>
					<input
						type="checkbox"
						className={styles.multiselect__checkbox}
						checked={selectedKeys.includes(option.value)}
						onChange={() => toggleOption(option.value)}
						disabled={isOptionDisabled(option.value)}
					/>
					<span className={styles.multiselect__label}>{option.label}</span>
				</label>
			))}
		</Dropdown>
	);
};
