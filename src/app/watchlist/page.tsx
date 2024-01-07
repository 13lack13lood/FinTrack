"use client";

import React, { Suspense } from "react";
import { getWatchlist } from "@/util/firebase/firestore";
import Loading from "./loading";
import { fetchQuickStockData } from "@/util/backendFetchData";

const page = async () => {
	const doc = await getWatchlist();
	return (
		<Suspense fallback={<Loading />}>
			<div className="flex flex-col justify-center items-center mt-10 p-6">
				{doc &&
					doc.watchlist.map(async (ticker: string) => {
						const stockData = await fetchQuickStockData(ticker);

						return (
							<div className="flex flex-row text-white bg-bgcolor-primary drop-shadow-bg w-full">
								{ticker}
								{stockData.Open}
								{stockData.Close}
								{stockData.High}
								{stockData.Low}
								{stockData.Volume}
							</div>
						);
					})}
			</div>
		</Suspense>
	);
};

export default page;
