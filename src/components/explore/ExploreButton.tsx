import { ExploreSelection } from "@/types/types";
import React from "react";

interface Props {
	selected: ExploreSelection;
	setSelected: (selected: ExploreSelection) => void;
	text: ExploreSelection;
}

const ExploreButton = ({ selected, setSelected, text }: Props) => {
	return (
		<div
			className={`${
				selected == text ? "bg-accent" : "bg-bgcolor-primary"
			} text-white text-xl rounded-full font-light px-4 py-2 capitalize drop-shadow-bg transition-all duration-200 hover:bg-accent`}
			onClick={() => setSelected(text)}
		>
			{text}
		</div>
	);
};

export default ExploreButton;
