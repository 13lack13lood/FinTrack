import React from "react";
import Chart from "@/src/components/Chart";
interface Props {
	params: any;
}

const getStockData = async () => {
	const res = await fetch("http://localhost:5000/test");

	const data = await res.json();

	return data;
};

const processHistoryData = (stockData: { [key: string]: number }) => {
	let data: { time: number; value: number }[] = [];

	Object.entries(stockData).forEach(([timestamp, value]) => {
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

const page = async ({ params }: Props) => {
	const stockData = await getStockData();

	const stockHistory = processHistoryData(stockData.history.Open);

	console.log(stockData.info);

	return (
		<div className="flex flex-row items-center justify-center w-[95%] mx-auto mt-10">
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
						<div className="text-4xl text-white">${stockHistory[stockHistory.length - 1].value}</div>
					</div>
				</div>
				<div className="px-6 py-2">
					<div className="flex flex-row text-white text-xl px-2 mb-8 h-8">
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							1D
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							5D
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							1M
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							3M
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							6M
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							YTD
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							1Y
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							5Y
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
						|
						<div className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group">
							Max
							<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-1 group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
						</div>
					</div>
					<Chart data={stockHistory}></Chart>
				</div>
			</div>
			<div className="flex flex-col h-full w-1/2 bg-bgcolor-primary">asdf</div>
		</div>
	);
};

export default page;
