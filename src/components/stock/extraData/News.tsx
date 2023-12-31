import { StockData } from "@/types/types";
import React from "react";

interface Props {
	news: StockData["news"];
	news_mean: StockData["news_mean"];
}

const processNewsData = (news: StockData["news"]) => {
	let data: {
		compound: string;
		compoundColor: string;
		date: string;
		time: string;
		headline: string;
		link: string;
		publisher: string;
	}[] = new Array(Object.keys(news.headline).length);

	Object.entries(news.headline).forEach(([key, value]) => {
		const compound = news.compound[parseInt(key)];
		const positive = compound > 0;
		const negative = compound < 0;

		data[parseInt(key)] = {
			compound: positive
				? `↑ Positive (${(compound * 100).toFixed(0)}%)`
				: negative
				? `↓ Negative (${(compound * 100).toFixed(0)}%)`
				: `- Neutral`,
			compoundColor: positive ? "bg-gain-s" : negative ? "bg-loss-s" : "bg-bgcolor-secondary",
			date: news.date[parseInt(key)],
			time: news.time[parseInt(key)],
			headline: news.headline[parseInt(key)],
			link: news.link[parseInt(key)],
			publisher: news.publisher[parseInt(key)],
		};
	});

	return data;
};

const News = ({ news, news_mean }: Props) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="grid grid-cols-2 gap-4 col-span-2">
				{processNewsData(news).map((value, index) => {
					return (
						<a key={`${value.headline}_${index}`} href={value.link} target="_blank">
							<div className="flex flex-col bg-bgcolor-primary rounded-2xl px-5 py-4 drop-shadow-bg space-y-3 h-full">
								<div className="flex flex-row justify-start items-center space-x-4 font-thin text-white text-sm">
									<div className="">{value.date}</div>
									<div className="text-white">{value.time}</div>
									<div className="text-white">{value.publisher}</div>
								</div>
								<div className="text-lg text-white grow">{value.headline}</div>
								<div
									className={`${value.compoundColor} text-sm  text-white rounded-full px-4 py-2 inline-block w-fit drop-shadow-bg-light`}
								>
									{`FinBERT Analysis: ${value.compound}`}
								</div>
							</div>
							;
						</a>
					);
				})}
			</div>
			<div className="flex flex-col w-full items-center space-y-5 bg-bgcolor-primary rounded-2xl drop-shadow-bg h-fit p-4">
				<div className=" text-xl border-b-2 border-accent text-white px-4 py-1 text-center drop-shadow-bg-light font-light">
					Overall News Analysis
				</div>
				<div className="flex flex-col w-full items-center space-y-4">
					{Object.entries(news_mean.compound)
						.reverse()
						.map(([date, value], index) => {
							const compound = value;
							const positive = compound > 0;
							const negative = compound < 0;

							return (
								<div
									key={`${value}_${index}`}
									className="flex flex-row items-center text-white justify-between w-full bg-bgcolor-secondary rounded-full px-5 py-3 drop-shadow-bg-light "
								>
									<div className="text-lg">{date}</div>
									<div
										className={`rounded-full drop-shadow-bg-light text-sm font-light px-4 py-1 ${
											positive ? "bg-gain-s" : negative ? "bg-loss-s" : "bg-bgcolor-secondary"
										}`}
									>{`${
										positive
											? `↑ Positive (${(compound * 100).toFixed(0)}%)`
											: negative
											? `↓ Negative (${(compound * 100).toFixed(0)}%)`
											: `- Neutral`
									}`}</div>
								</div>
							);
						})}
				</div>
				<div className="flex flex-col w-full items-center pt-5 text-white px-3 text-center space-y-2">
					<div className="text-lg border-b-2 mb-2 border-accent">How News Analysis Works</div>
					<div className="text-base font-light">
						Sentimental analysis is performed on each news headline using FinBERT, developed by ProsusAI.
						FinBERT is a pre-trained natural language processing model to analyze sentiment of financial
						text. The model determines a label of positive, negative, or neutral given the text along with a
						percentage.
						<a
							className="underline px-2 transition-all duration-150 hover:text-accent"
							href="https://huggingface.co/ProsusAI/finbert"
							target="_blank"
						>
							[More info on FinBERT]
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default News;
