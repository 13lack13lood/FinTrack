import React from "react";
import SideMenuItem from "./SideMenuItem";
import explore from "../../../public/explore.svg";
import news from "../../../public/news.svg";
import watchlist from "../../../public/watchlist.svg";

interface Props {
	toggle: boolean;
	setToggle: (toggle: boolean) => void;
}

const SideMenu = ({ toggle, setToggle }: Props) => {
	return (
		<div
			className={`overflow-hidden h-screen bg-bgcolor-primary transition-all ease-in-out duration-300 ${
				toggle ? "w-[380px]" : "w-0"
			}`}
		>
			<div className="flex flex-col justify-start pt-5 space-y-5">
				<SideMenuItem
					item={{
						title: "Explore",
						link: "/explore",
						icon: explore,
					}}
					setToggle={setToggle}
				></SideMenuItem>
				<SideMenuItem
					item={{
						title: "News",
						link: "/news",
						icon: news,
					}}
					setToggle={setToggle}
				></SideMenuItem>
				<SideMenuItem
					item={{
						title: "Watchlist",
						link: "/watchlist",
						icon: watchlist,
					}}
					setToggle={setToggle}
				></SideMenuItem>
			</div>
		</div>
	);
};

export default SideMenu;
