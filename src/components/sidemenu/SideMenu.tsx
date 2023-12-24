import React from "react";
import SideMenuItem from "./SideMenuItem";

interface Props {
	toggle: boolean;
}

const SideMenu = ({ toggle }: Props) => {
	return (
		<div
			className={`overflow-hidden h-screen bg-bgcolor-primary transition-all ease-in-out duration-300 ${
				toggle ? "w-full sm:w-1/2 lg:w-1/5" : "w-0"
			}`}
		>
			<div className="flex flex-col justify-start pt-5 space-y-5">
				<SideMenuItem
					item={{
						title: "Explore",
						link: "/explore",
						icon: "./explore.svg",
					}}
				></SideMenuItem>
				<SideMenuItem
					item={{
						title: "Portfolio",
						link: "/portfolio",
						icon: "./portfolio.svg",
					}}
				></SideMenuItem>
				<SideMenuItem
					item={{
						title: "Watchlist",
						link: "/watchlist",
						icon: "./watchlist.svg",
					}}
				></SideMenuItem>
			</div>
		</div>
	);
};

export default SideMenu;
