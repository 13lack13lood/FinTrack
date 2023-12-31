"use client";

import React, { useState, useEffect } from "react";
import { ExploreSelection } from "@/types/types";
import ExploreButton from "@/src/components/explore/ExploreButton";
import { useRouter } from "next/navigation";

const buttons: ExploreSelection[] = ["market index", "trending", "gainers", "losers"];

const ExploreButtonArray = () => {
	const [selectedPage, setSelectedPage] = useState<ExploreSelection>("market index");
	const router = useRouter();

	useEffect(() => {
		if (selectedPage == "market index") {
			router.push("/explore");
		} else {
			router.push("/explore/" + selectedPage);
		}
	}, [selectedPage]);

	return (
		<div className="flex flex-wrap items-center mx-auto w-[90%] justify-center py-7 border-b-2 border-accent space-x-16">
			{buttons.map((text) => {
				return <ExploreButton selected={selectedPage} setSelected={setSelectedPage} text={text} />;
			})}
		</div>
	);
};

export default ExploreButtonArray;
