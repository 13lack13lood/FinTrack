"use client";

import React, { useState } from "react";
import HamburgerMenuButton from "../buttons/HamburgerMenuButton";
import Link from "next/link";
import SearchBar from "../searchBars/NavSearchBar";
import SideMenu from "../sidemenu/SideMenu";
import Authentication from "./Authentication";

const Navigation = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className="bg-bgcolor-primary drop-shadow-bg-light fixed top-0 w-full h-16 z-[100]">
			<div className="flex flex-col w-full h-full justify-center">
				<div className="w-full flex flex-row items-center justify-between mx-auto p-4 px-8">
					<div className="flex flex-wrap items-center justify-center space-x-6">
						<HamburgerMenuButton toggle={toggle} setToggle={setToggle} />
						<Link
							href="/"
							className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent"
							onClick={() => {
								setToggle(false);
							}}
						>
							FinTrack
						</Link>
					</div>
					<div className="flex flex-wrap items-center justify-center space-x-6 px-6">
						<div className="px-6">
							<SearchBar></SearchBar>
						</div>
						<Authentication />
					</div>
				</div>
			</div>
			<SideMenu toggle={toggle} setToggle={setToggle}></SideMenu>
		</nav>
	);
};

export default Navigation;
