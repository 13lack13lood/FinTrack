import React from "react";
import ChartPeriodButton from "./ChartPeriodButton";

interface Props {
	setPeriod: (period: string) => void;
}

const buttons = [
	{
		text: "1D",
		click: "1d",
	},
	{
		text: "5D",
		click: "5d",
	},
	{
		text: "3M",
		click: "3mo",
	},
	{
		text: "6M",
		click: "6mo",
	},
	{
		text: "YTD",
		click: "ytd",
	},
	{
		text: "1Y",
		click: "1y",
	},
	{
		text: "5Y",
		click: "5y",
	},
	{
		text: "Max",
		click: "max",
	},
];

const ChartPeriodButtonArray = ({ setPeriod }: Props) => {
	return (
		<div className="flex flex-wrap text-white text-xl px-2 mb-8 h-8">
			<p>|</p>
			{buttons.map(({ text, click }, index) => {
				return (
					<div key={`div ${text}_${index}`} className="flex flex-row">
						<ChartPeriodButton
							key={`${text}_${index}`}
							text={text}
							onClickPeriod={click}
							setData={setPeriod}
						></ChartPeriodButton>
						|
					</div>
				);
			})}
		</div>
	);
};

export default ChartPeriodButtonArray;
