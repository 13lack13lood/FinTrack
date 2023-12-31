"use client";

import StockList from "@/src/components/explore/StockList";

const page = () => {
	return (
		<div className="flex flex-col justify-center p-4 mx-10">
			<StockList stocks="trending" />
		</div>
	);
};

export default page;
