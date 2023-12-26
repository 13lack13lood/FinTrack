import React from "react";
import { TrendingStockData } from "../../types/types";

interface Props {
	stock: TrendingStockData;
}

const getStockColorPercent = (percentChange: string) => {
	let percent = parseFloat(percentChange.replace("%", ""));

	if (percent > 0) {
		if (percent > 10) return "bg-gain-l";

		if (percent > 5) return "bg-gain-m";

		return "bg-gain-s";
	}

	if (percent < -10) return "bg-loss-l";

	if (percent < -5) return "bg-loss-m";

	return "bg-loss-s";
};

const getStockText = (percentChange: string) => {
	let percent = parseFloat(percentChange.replace("%", ""));

	return percent > 0 ? `↑ ${percentChange}` : `↓ ${percentChange.replace("-", "")}`;
};

const StockCard = ({ stock }: Props) => {
	return (
		<a className="group drop-shadow-bg block relative w-full h-full bg-bgcolor-primary rounded-2xl p-6 overflow-hidden border-2 border-bgcolor-primary hover:border-accent transition ease-in hover:cursor-pointer">
			<div className="flex flex-col h-full">
				<div className="flex flex-row justify-between items-center mb-7">
					<h3 className="text-white text-2xl">{stock.ticker}</h3>
					<div className={`p-2 rounded-xl ${getStockColorPercent(stock.change)}`}>
						<p className="text-white text-lg">{getStockText(stock.change)}</p>
					</div>
				</div>
				<p className="text-white text-md">{stock.name}</p>
				<div className="flex justify-center absolute overflow-hidden top-0 right-0 h-full w-7 pr-2 transition-all duration-300 ease-out transform skew-x-[8deg] -mr-10 items-start bg-accent group-hover:-mr-3">
					<div className="-mr-1 mt-2 opacity-0 text-white text-lg transition-all duration-300 ease-out transform skew-x-[8deg] group-hover:opacity-100">
						→
					</div>
				</div>
			</div>
		</a>
	);
};

export default StockCard;
