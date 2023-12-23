import React from "react";
import StockCard from "./StockCard";
import { TrendingStockData } from "../types";

interface Props {
	title: string;
	stocks: TrendingStockData[];
}

const StockGrid = ({ title, stocks }: Props) => {
	return (
		<div className="flex flex-col">
			<div className="text-white text-2xl m-5">{title}</div>
			<div className="grid grid-cols-5 gap-4">
				{stocks.map((stock) => {
					return <StockCard stock={stock}></StockCard>;
				})}
			</div>
		</div>
	);
};

export default StockGrid;
