"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
	title: string;
	icon: string;
	link: string;
}

const ArrowButton = ({ title, icon, link }: Props) => {
	const router = useRouter();

	return (
		<button
			className="flex flex-row bg-none group items-center w-fit space-x-3 group"
			onClick={() => {
				router.push(link);
			}}
		>
			<div className="text-white pb-2 text-lg pr-4">
				<div className="flex flex-row items-center justify-start space-x-3">
					<Image src={icon} alt={`${icon.replace("/", "")} icon`} width="35" height="35"></Image>
					<div className="text-white text-2xl">{title}</div>
				</div>
			</div>
			<svg
				className="transition-all duration-300 ease-out -mt-1 -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:transform group-hover:scale-x-125 fill-white"
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
		</button>
	);
};

export default ArrowButton;
