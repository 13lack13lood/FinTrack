import React from "react";
import StockCard from "./StockCard";
import { MenuItem, TrendingStockData } from "../../../types/types";
import ArrowButton from "../buttons/ArrowButton";

interface Props {
	item: MenuItem;
	stocks: TrendingStockData[];
}

const StockGrid = ({ item, stocks }: Props) => {
	return (
		<div className="flex flex-col">
			<ArrowButton title={item.title} icon={item.icon} link={item.link}></ArrowButton>
			<div className="grid grid-cols-5 gap-4">
				{stocks.map((stock) => {
					return <StockCard stock={stock}></StockCard>;
				})}
			</div>
		</div>
	);
};

export default StockGrid;
