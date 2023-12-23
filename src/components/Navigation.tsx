"use client";

import React, { useState } from "react";
import HamburgerMenuButton from "./buttons/HamburgerMenuButton";
import Link from "next/link";
import SearchBar from "./NavSearchBar";
import FillButton from "./buttons/FillButton";
import SideMenu from "./SideMenu";

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
						>
							FinTrack
						</Link>
					</div>
					<div className="flex flex-wrap items-center justify-center space-x-6 px-6">
						<div className="px-6">
							<SearchBar></SearchBar>
						</div>
						<FillButton text="Sign Up" onClick={() => console.log("sign up")}></FillButton>
						<FillButton text="Log In" onClick={() => console.log("sign up")}></FillButton>
					</div>
				</div>
			</div>
			<SideMenu toggle={toggle}></SideMenu>
		</nav>
	);
};

export default Navigation;
