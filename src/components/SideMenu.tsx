import React from "react";

interface Props {
	toggle: boolean;
}

const SideMenu = ({ toggle }: Props) => {
	return (
		<div
			className={`overflow-hidden h-screen bg-bgcolor-primary transition-width ease-out duration-300 ${
				toggle ? "w-1/5" : "w-0"
			}`}
		>
			SideMenu
		</div>
	);
};

export default SideMenu;
