interface ChevronIconProps {
	className?: string;
}

export const ChevronIcon = ({ className }: ChevronIconProps) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		role="img"
		aria-label="chevron-icon"
	>
		<path
			d="M4 6l4 4 4-4"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
