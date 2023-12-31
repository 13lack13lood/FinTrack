import React from "react";
import Image from "next/image";
import { MenuItem } from "@/types/types";
import { useRouter } from "next/navigation";

interface Props {
	item: MenuItem;
	setToggle: (toggle: boolean) => void;
}

const SideMenuItem = ({ item, setToggle }: Props) => {
	const router = useRouter();

	return (
		<div
			className="flex flex-row w-full items-center justify-start py-8 px-5 cursor-pointer space-x-5 group h-12"
			onClick={() => {
				setToggle(false);
				router.push(item.link);
			}}
		>
			<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:w-1 group-hover:h-12 group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
			<div className="flex flex-row items-center transition-all translate-x-0 duration-300 space-x-5 group-hover:transition-all group-hover:translate-x-8 group-hover:duration-300 grow">
				<Image
					className="transition ease-out drop-shadow-bg-light"
					src={item.icon}
					alt="icon"
					width="40"
					height="40"
				></Image>
				<div className="text-white text-2xl">{item.title}</div>
			</div>
			<svg
				className="transition-all duration-300 ease-out -mt-1 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:transform group-hover:scale-150 fill-white ml-auto"
				viewBox="0 0 46 16"
				height="10"
				width="30"
				xmlns="http://www.w3.org/2000/svg"
				id="arrow-horizontal"
			>
				<path
					transform="translate(15)"
					d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
					data-name="Path 10"
					id="Path_10"
				></path>
			</svg>
		</div>
	);
};

export default SideMenuItem;
