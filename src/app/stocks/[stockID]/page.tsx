"use client";

import React from "react";
import Chart from "@/src/components/stockGraph/Chart";
import ChartPeriodButton from "@/src/components/stockGraph/ChartPeriodButton";
import { useState, useEffect } from "react";
import { HistoricalPriceDataProcessed, HistoricalPriceDataRaw, StockData } from "@/types/types";
import Loading from "./loading";
import { Suspense } from "react";
// import { getStockColorPercentText } from "@/util/Util";

interface Props {
	params: {
		stockID: string;
	};
}

const getStockData = async () => {
	const res = await fetch("http://localhost:5000/test");

	const data: StockData = await res.json();

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
	const percent = (((currentPrice - initPrice) / initPrice) * 100).toFixed(2);
	const difference = (currentPrice - initPrice).toFixed(2);

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

const getStockColorPercentText = (percent: number) => {
	return percent > 0 ? "text-gain-s" : "text-loss-s";
};

const page = ({ params }: Props) => {
	const [stockData, setStockData] = useState<StockData>();
	const [stockDataLoaded, setStockDataLoaded] = useState(false);
	const [period, setPeriod] = useState("1d");
	const [history, setHistory] = useState<HistoricalPriceDataProcessed>();
	const [historyLoaded, setHistoryLoaded] = useState(false);
	const [currentPrice, setCurrentPrice] = useState(-1);

	useEffect(() => {
		const fetchData = async () => {
			const data: StockData = await getStockData();

			setStockData(data);
			setHistory(processHistoryData(data.history.Open));
			setHistoryLoaded(true);
			setStockDataLoaded(true);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (stockDataLoaded && history) {
			console.log(history);
			setCurrentPrice(history[history.length - 1].value);
		}
	}, [stockDataLoaded]);

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
				}),
			});

			const data: { Open: HistoricalPriceDataRaw } = await res.json();

			setHistory(processHistoryData(data.Open));
			setHistoryLoaded(true);
		};
		fetchData();
	}, [period, setPeriod]);

	return (
		<div className="flex flex-row items-center justify-center w-[95%] mx-auto mt-10">
			<Suspense fallback={<Loading></Loading>}>
				{stockDataLoaded && stockData && (
					<div className="flex flex-col w-[60%] bg-bgcolor-primary space-y-6 py-6">
						<div className="flex flex-row justify-between w-full">
							<div className="flex flex-col items-start text-white bg-accent rounded-r-full pl-8 pr-10 py-2 space-y-1`">
								<div className="text-2xl">
									{stockData.name} <span className="uppercase">({params.stockID})</span>
								</div>
								<div className="text-sm uppercase">
									{stockData.info.Exchange} · {stockData.info.Currency}
								</div>
							</div>
							<div className="flex flex-col items-end px-6">
								<div className="text-4xl text-white ">${currentPrice}</div>
								{historyLoaded && history && (
									<div
										className={`${getStockColorPercentText(
											(currentPrice - history[0].value) / history[0].value
										)} text-xl`}
									>
										{getPriceChange(history[0].value, currentPrice, period)}
									</div>
								)}
							</div>
						</div>
						<div className="px-6 py-2">
							<div className="flex flex-wrap text-white text-xl px-2 mb-8 h-8">
								<ChartPeriodButton text="1D" onClickPeriod="1d" setData={setPeriod}></ChartPeriodButton>
								|
								<ChartPeriodButton text="5D" onClickPeriod="5d" setData={setPeriod}></ChartPeriodButton>
								|
								<ChartPeriodButton
									text="1M"
									onClickPeriod="1mo"
									setData={setPeriod}
								></ChartPeriodButton>
								|
								<ChartPeriodButton
									text="6M"
									onClickPeriod="6mo"
									setData={setPeriod}
								></ChartPeriodButton>
								|
								<ChartPeriodButton
									text="YTD"
									onClickPeriod="ytd"
									setData={setPeriod}
								></ChartPeriodButton>
								|
								<ChartPeriodButton text="1Y" onClickPeriod="1y" setData={setPeriod}></ChartPeriodButton>
								|
								<ChartPeriodButton text="5Y" onClickPeriod="5y" setData={setPeriod}></ChartPeriodButton>
								|
								<ChartPeriodButton
									text="Max"
									onClickPeriod="max"
									setData={setPeriod}
								></ChartPeriodButton>
							</div>
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
											horiLineColor: "#FFFFFF88",
											crosshairColor: "white",
											crosshairLabelBackgroundColor: "#BB86FC",
										}}
									></Chart>
								)}
							</div>
						</div>
					</div>
				)}
			</Suspense>

			{/* <div className="flex flex-col h-full w-1/2 bg-bgcolor-primary">asdf</div> */}
		</div>
	);
};

export default page;
