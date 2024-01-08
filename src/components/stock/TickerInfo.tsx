import { StockData } from "@/types/types";
import React from "react";
import { getTodayFull } from "@/util/getDate";

interface Props {
    stock_info: StockData["stock_info"];
}

const TickerInfo = ({ stock_info }: Props) => {
    return (
        <div className="flex flex-col items-center justify-start h-full space-y-7">
            <div className="text-white text-lg bg-accent rounded-full border-none px-8 py-2 text-center drop-shadow-bg font-light">{getTodayFull()}</div>
            <div className="grid grid-cols-4 w-full gap-5">
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Open</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info.Open}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Previous Close</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["Previous Close"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Market Cap</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["Market Cap"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">EPS (ttm)</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["EPS (ttm)"]}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Day&#39;s Range</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["Day's Range"]}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">52-Week Range</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["52-Week Range"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Volume</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info.Volume}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">PE Ratio</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info["PE Ratio"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Forward PE</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info["Forward PE"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Revenue</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["Revenue (ttm)"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Net Income</div>
                    <div className="text-lg xl:text-xl font-light uppercase">${stock_info["Net Income (ttm)"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Shares Out</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info["Shares Out"]}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Beta</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info.Beta}</div>
                </div>
                <div className="flex flex-col justify-center text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Analysts</div>
                    <div className="text-lg xl:text-xl font-light">{stock_info.Analysts ? stock_info.Analysts : "N/A"}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Dividend</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info.Dividend}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Ex-Dividend Date</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info["Ex-Dividend Date"]}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Price Target</div>
                    <div className="text-lg xl:text-xl font-light uppercase">{stock_info["Price Target"]}</div>
                </div>
                <div className="flex flex-row justify-between items-center col-span-2 text-white bg-bgcolor-primary w-full p-4 rounded-xl drop-shadow-bg">
                    <div className="text-base font-medium">Earnings Date</div>
                    <div className="text-lg xl:text-xl font-light">{stock_info["Earnings Date"] ? stock_info["Earnings Date"] : "N/A"}</div>
                </div>
            </div>
        </div>
    );
};

export default TickerInfo;
