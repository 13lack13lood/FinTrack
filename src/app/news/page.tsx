import { GeneralNewsDataProcessed, GeneralNewsDataRaw } from "@/types/types";
import React from "react";
import { fetchNewsData } from "@/util/backendFetchData";

const processNewsData = (news: GeneralNewsDataRaw) => {
	let data: GeneralNewsDataProcessed = new Array(Object.keys(news.headline).length);

	for (let i = 0; i < data.length; i++) {
		const index = i.toString();

		data[i] = {
			link: news.link[index],
			img_src: news.img_src[index],
			timestamp: news.timestamp[index],
			description: news.description[index],
			headline: news.headline[index],
			tickers: news.tickers[index],
			publisher: news.publisher[index],
			compound: news.compound[index],
		};
	}

	return data;
};

const page = async () => {
	const data = await fetchNewsData();
	const processedData = processNewsData(data);

	return (
		<div className="flex flex-col items-center justify-center w-max mx-auto space-y-7 p-10">
			<div className="text-white w-full text-3xl text-center border-b-2 p-4 border-accent font-medium">
				Stock Market News
			</div>
			<div className="flex flex-col w-max max-w-full space-y-7 items-center justify-center">
				{processedData.map((value) => {
					return (
						<div className="flex flex-row w-full rounded-2xl p-4 bg-bgcolor-primary drop-shadow-bg space-x-5">
							<img src={value.img_src} width={200} height={200}></img>
							<div className="flex flex-col justify-center text-white space-y-3">
								<div className="flex flex-wrap space-x-5">
									<div className="font-thin">{value.timestamp}</div>
									<div className="font-thin">{value.publisher}</div>
								</div>
								<a href={value.link}>
									<div className="text-2xl font-light">{value.headline}</div>
								</a>

								<div className="flex flex-wrap space-x-5">
									<div className="font-medium">Stocks:</div>
									{value.tickers.map((ticker) => {
										return <div className="font-light tracking-wider">{ticker}</div>;
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default page;
