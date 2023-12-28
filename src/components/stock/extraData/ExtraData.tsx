import React from "react";
import { useState } from "react";
import News from "./News";
import { ExtraDataSelection, StockData } from "@/types/types";
import InfoSheet from "./InfoSheet";
import MoreInfo from "./MoreInfo";

interface Props {
	stockData: StockData;
}

const getInfo = (selected: ExtraDataSelection, stockData: StockData) => {
	if (selected == "balance") {
		return <InfoSheet info={stockData.balance} quarter={stockData.balance_quarter} />;
	}

	if (selected == "income") {
		return <InfoSheet info={stockData.income} quarter={stockData.income_quarter} />;
	}

	if (selected == "cashflow") {
		return <InfoSheet info={stockData.cashflow} quarter={stockData.cashflow_quarter} />;
	}

	if (selected == "more info") {
		return <MoreInfo info={stockData.info} wiki={stockData.wiki} name={stockData.name} />;
	}

	return <News news={stockData.news} news_mean={stockData.news_mean} />;
};

const ExtraData = ({ stockData }: Props) => {
	const [buttonSelected, setButtonSelected] = useState<ExtraDataSelection>("news");

	const buttons: ExtraDataSelection[] = ["news", "balance", "income", "cashflow", "more info"];

	return (
		<div className="flex flex-col items-center justify-center w-full p-4 mb-7">
			<div className="w-full border-b-2 border-accent mb-10 p-4 pb-7">
				<div className="flex flex-wrap w-fit mx-auto space-x-10">
					{buttons.map((title) => {
						return (
							<div
								className={`${
									buttonSelected == title ? "bg-accent" : "bg-bgcolor-primary"
								} text-white text-xl text-center w-fit mx-auto drop-shadow-bg-light  px-6 py-2 rounded-full capitalize transition-all duration-200 hover:bg-accent hover:opacity-[85%] ease-out`}
								onClick={() => {
									setButtonSelected(title);
								}}
							>
								{title}
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-full">{getInfo(buttonSelected, stockData)}</div>
		</div>
	);
};

export default ExtraData;
