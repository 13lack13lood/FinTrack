"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

const RoundSearchBar = () => {
	const [inputQuery, setInputQuery] = useState("");
	const router = useRouter();

	const searchHandler = () => {
		if (inputQuery != "") router.push("/stocks/" + inputQuery);
	};

	return (
		<div className="flex flex-row items-center w-full justify-center space-x-3">
			<input
				type="text"
				className="w-[80%] text-xl text-black font-light p-3 m-4 rounded-full outline-none capitalize indent-4 placeholder:font-extralight"
				placeholder="AAPL"
				onChange={(event) => setInputQuery(event.currentTarget.value)}
				onKeyDown={(event) => {
					if (event.key == "Enter") {
						setInputQuery(event.currentTarget.value);
						searchHandler();
						setInputQuery("");
					}
				}}
			/>
			<Image
				className="cursor-pointer transition ease-out hover:scale-[120%]"
				src="/search.svg"
				alt="search icon"
				width="50"
				height="50"
				color="black"
			></Image>
		</div>
	);
};

export default RoundSearchBar;
