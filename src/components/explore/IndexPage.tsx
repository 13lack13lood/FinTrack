"use client";

import { HistoricalPriceDataProcessed, HistoricalPriceDataRaw, IndexData, IndexTickers } from "@/types/types";
import React from "react";
import ChartPeriodButtonArray from "@/src/components/stock/ChartPeriodButtonArray";
import Chart from "@/src/components/stock/Chart";
import { useState, useEffect } from "react";

const getIndexData = async (index: string) => {
	const res = await fetch("http://localhost:5000/index/" + index, {
		cache: "no-store",
	});

	const data = await res.json();
	return data;
};

const processHistoryData = (historyData: HistoricalPriceDataRaw) => {
	let data: { time: number; value: number }[] = [];

	Object.entries(historyData).forEach(([timestamp, value]) => {
		data.push({
			time: parseInt(timestamp),
			value: value,
		});
	});

	data.sort((x, y) => {
		if (x.time > y.time) return 1;

		if (x.time < y.time) return -1;
		return 0;
	});

	return data.map(({ time, value }) => {
		const d = new Date(time);
		return {
			time:
				Date.UTC(
					d.getFullYear(),
					d.getMonth(),
					d.getDate(),
					d.getHours(),
					d.getMinutes(),
					d.getSeconds(),
					d.getMilliseconds()
				) / 1000,
			value: value,
		};
	});
};

const getPriceChange = (initPrice: number, currentPrice: number, period: string) => {
	const percent = (((currentPrice - initPrice) / initPrice) * 100).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const difference = (currentPrice - initPrice).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	if (currentPrice - initPrice > 0) {
		switch (period) {
			case "5d":
				return `+${difference} (+${percent}%) past week`;
			case "1mo":
				return `+${difference} (+${percent}%) past month`;
			case "6mo":
				return `+${difference} (+${percent}%) past 6 months`;
			case "ytd":
				return `+${difference} (+${percent}%) year to date`;
			case "1y":
				return `+${difference} (+${percent}%) past year`;
			case "5y":
				return `+${difference} (+${percent}%) past 5 years`;
			case "max":
				return `+${difference} (+${percent}%) all time`;
			default:
				return `+${difference} (+${percent}%) today`;
		}
	}

	switch (period) {
		case "5d":
			return `${difference} (${percent}%) past week`;
		case "1mo":
			return `${difference} (${percent}%) past month`;
		case "6mo":
			return `${difference} (${percent}%) past 6 months`;
		case "ytd":
			return `${difference} (${percent}%) year to day`;
		case "1y":
			return `${difference} (${percent}%) past year`;
		case "5y":
			return `${difference} (${percent}%) past 5 years`;
		case "max":
			return `${difference} (${percent}%) all time`;
		default:
			return `${difference} (${percent}%) today`;
	}
};

const IndexPage = () => {
	const [currentIndex, setCurrentIndex] = useState<IndexTickers>("^GSPC");
	const [indexData, setIndexData] = useState<IndexData>();
	const [indexDataLoaded, setIndexDataLoaded] = useState(false);
	const [period, setPeriod] = useState("1d");
	const [history, setHistory] = useState<HistoricalPriceDataProcessed>();
	const [historyLoaded, setHistoryLoaded] = useState(false);
	const [currentPrice, setCurrentPrice] = useState(-1);

	useEffect(() => {
		const fetchData = async () => {
			setIndexDataLoaded(false);
			setPeriod("1d");

			const data: IndexData = await getIndexData(currentIndex);

			setIndexData(data);
			setHistory(processHistoryData(data.history.Open));
			setHistoryLoaded(true);
			setIndexDataLoaded(true);
		};

		fetchData();
	}, [currentIndex, setCurrentIndex]);

	useEffect(() => {
		if (indexData && history) {
			setCurrentPrice(history[history.length - 1].value);
		}
	}, [indexData]);

	useEffect(() => {
		setHistoryLoaded(false);
		const fetchData = async () => {
			const res = await fetch("http://localhost:5000/history", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					period: period,
					ticker: currentIndex,
				}),
			});

			const data: { Open: HistoricalPriceDataRaw } = await res.json();

			setHistory(processHistoryData(data.Open));
			setHistoryLoaded(true);
		};
		fetchData();
	}, [period, setPeriod]);

	return (
		<div className="flex flex-col justify-center p-6 space-y-7">
			<div className="flex flex-wrap justify-center items-center space-x-10">
				<div
					className={`${
						currentIndex == "^GSPC" ? "bg-accent" : "bg-bgcolor-primary"
					} text-white text-xl rounded-full font-light px-4 py-2 capitalize drop-shadow-bg transition-all duration-200 hover:bg-accent`}
					onClick={() => setCurrentIndex("^GSPC")}
				>
					S&P 500
				</div>
				<div
					className={`${
						currentIndex == "^DJI" ? "bg-accent" : "bg-bgcolor-primary"
					} text-white text-xl rounded-full font-light px-4 py-2 capitalize drop-shadow-bg transition-all duration-200 hover:bg-accent`}
					onClick={() => setCurrentIndex("^DJI")}
				>
					Dow Jones
				</div>
				<div
					className={`${
						currentIndex == "^IXIC" ? "bg-accent" : "bg-bgcolor-primary"
					} text-white text-xl rounded-full font-light px-4 py-2 capitalize drop-shadow-bg transition-all duration-200 hover:bg-accent`}
					onClick={() => setCurrentIndex("^IXIC")}
				>
					NASDAQ Composite
				</div>
			</div>
			{indexDataLoaded && indexData && (
				<div className="flex flex-col items-center px-4 space-y-4">
					<div className="flex flex-col w-[55%] h-fit bg-bgcolor-primary space-y-6 py-6 rounded-xl drop-shadow-bg-light">
						<div className="flex flex-row items-center justify-between w-full">
							<div className="flex flex-row w-fit items-start h-fit text-white text-xl bg-accent rounded-r-full pl-8 pr-10 py-4 space-x-1">
								{indexData.name} <span className=" px-1 uppercase">({currentIndex})</span>
							</div>
							<div className="flex flex-col items-end px-6">
								<div className="text-4xl text-white font-light tracking-wider">
									$
									{currentPrice.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</div>
								{historyLoaded && history && (
									<div
										className={`${
											(currentPrice - history[0].value) / history[0].value > 0
												? "text-gain-s"
												: "text-loss-s"
										} text-xl font-light`}
									>
										{getPriceChange(history[0].value, currentPrice, period)}
									</div>
								)}
							</div>
						</div>
						<div className="px-6 py-2">
							<ChartPeriodButtonArray setPeriod={setPeriod} />
							<div className="w-full h-[400px]">
								{historyLoaded && history && (
									<Chart
										data={history}
										colors={{
											backgroundColor: "#1d1d1d",
											lineColor: "#BB86FC",
											textColor: "white",
											areaTopColor: "#BB86FC",
											areaBottomColor: "#BB86FC00",
											borderColor: "#1d1d1d",
											horiLineColor: "#FFFFFF44",
											crosshairColor: "white",
											crosshairLabelBackgroundColor: "#BB86FC",
										}}
									></Chart>
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col w-3/4 text-white justify-center pt-7">
						<div className="text-2xl border-b-2 text-center border-accent p-4 capitalize mb-5">
							About the {indexData.name}
						</div>
						<div className="text-lg font-light ">
							{indexData.wiki.text}
							<a
								className="transition-all duration-200 hover:text-accent"
								href={indexData.wiki.url}
								target="_blank"
							>
								[Read More]
							</a>
						</div>
					</div>
				</div>
			)}
			;
		</div>
	);
};

export default IndexPage;
