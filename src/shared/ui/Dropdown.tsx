import { clsx } from "@shared";
import { type ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../utils/useOutsideClick";
import { ChevronIcon } from "./ChevronIcon";
import styles from "./Dropdown.module.css";

interface DropdownProps {
	trigger: ReactNode;
	children: ReactNode;
	className?: string;
}

export const Dropdown = ({ trigger, children, className }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useClickOutside(dropdownRef, () => setIsOpen(false));

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={clsx(styles.dropdown, className)} ref={dropdownRef}>
			<button
				type="button"
				className={styles.dropdown__button}
				onClick={handleToggle}
			>
				{trigger}
				<ChevronIcon
					className={clsx(
						styles.dropdown__icon,
						isOpen && styles["dropdown__icon--open"],
					)}
				/>
			</button>

			{isOpen && <div className={styles.dropdown__menu}>{children}</div>}
		</div>
	);
};
