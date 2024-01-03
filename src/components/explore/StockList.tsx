import { TrendingStockDataFull } from "@/types/types";
import Link from "next/link";
import React from "react";

interface Props {
	data: TrendingStockDataFull[];
}

const StockList = ({ data }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center w-max mx-auto p-4 space-y-4">
			<div className="grid grid-cols-8 gap-4 items-center w-full text-white text-lg py-4 font-medium ">
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg">Ticker</div>
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg col-span-3 mx-1">
					Name
				</div>
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1">Change</div>
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1">Price</div>
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1">Volume</div>
				<div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1">Market Cap</div>
			</div>

			{data.map((stock) => {
				return (
					<Link
						href={"/stocks/" + stock.ticker}
						className="flex flex-row w-full items-center group justify-end cursor-pointer"
					>
						<div className="grid grid-cols-8 gap-4 w-full items-center bg-bgcolor-primary drop-shadow-bg-light rounded-2xl py-4 transition-all duration-200 group-hover:-translate-x-5 group-hover:bg-accent">
							<div className="text-white text-2xl text-center">{stock.ticker}</div>
							<div className="text-white col-span-3 text-lg font-light text-center">{stock.name}</div>
							<div
								className={`justify-between mx-4 text-white text-lg font-light text-center rounded-full px-4 py-2 drop-shadow-bg-light ${
									parseFloat(stock.change.replaceAll("%", "")) > 0 ? "bg-gain-s" : "bg-loss-s"
								}`}
							>
								{stock.change}
							</div>
							<div className="text-white text-lg font-light text-center w-full">${stock.stock_price}</div>
							<div className=" text-white text-lg font-light text-center">{stock.volume}</div>
							<div className="text-white text-lg font-light text-center">{stock.market_cap}</div>
						</div>
						<svg
							className="transition-all duration-300 ease-out translate-x-10 -mt-1 absolute opacity-0 group-hover:translate-x-15 group-hover:opacity-100 group-hover:transform group-hover:scale-150 fill-white mx-auto"
							viewBox="0 0 46 16"
							height="10"
							width="30"
							xmlns="http://www.w3.org/2000/svg"
							id="arrow-horizontal"
						>
							<path
								transform="translate(15)"
								d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
								data-name="Path 10"
								id="Path_10"
							></path>
						</svg>
					</Link>
				);
			})}
		</div>
	);
};

export default StockList;
