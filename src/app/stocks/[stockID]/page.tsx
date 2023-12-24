import React from "react";

interface Props {
	params: any;
}

const getStockData = async () => {
	const res = await fetch("http://localhost:5000/test");

	const data = await res.json();

	return data;
};

const processHistoryData = (stockData: { [key: string]: any }) => {
	const allHistoryData = stockData.history;

	const processedHistoryMax = new Map();

	for (const [time, value] of Object.entries(allHistoryData.max_data.Open)) {
		processedHistoryMax.set(new Date(parseInt(time)), value);
	}

	const processedHistoryMin = new Map();

	for (const [time, value] of Object.entries(allHistoryData.min_data.Open)) {
		processedHistoryMin.set(new Date(parseInt(time)), value);
	}

	return [processedHistoryMax, processedHistoryMin];
};

const page = async ({ params }: Props) => {
	const stockData = await getStockData();

	const [historyMax, historyMin] = processHistoryData(stockData);

	console.log(historyMax);
	console.log(historyMin);

	return (
		<div className="flex flex-row items-center justify-center w-[95%] h-[90%] m-auto">
			<div className="flex flex-col h-full w-1/2 bg-bgcolor-primary">asdf</div>
			<div className="flex flex-col h-full w-1/2 bg-bgcolor-primary">asdf</div>
		</div>
	);
};

export default page;
