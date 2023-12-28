import React from "react";

interface Props {
	text: string;
	onClickPeriod: string;
	setData: (data: any) => void;
}

const ChartPeriodButton = ({ text, onClickPeriod, setData }: Props) => {
	return (
		<div
			className="flex flex-col items-center text-lg px-4 transition-all duration-200 hover:scale-125 tracking-widest group"
			onClick={() => {
				setData(onClickPeriod);
			}}
		>
			{text}
			<div className="w-0 h-0 rounded-full bg-accent transition-all ease-in duration-200 group-hover:h-[2px] group-hover:w-full group-hover:transition-all group-hover:ease-in group-hover:duration-200"></div>
		</div>
	);
};

export default ChartPeriodButton;
