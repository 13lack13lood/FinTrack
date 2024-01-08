"use client";

import Chart from "@/src/components/stock/Chart";
import ChartPeriodButtonArray from "@/src/components/stock/ChartPeriodButtonArray";
import React, { useState, useEffect } from "react";
import { HistoricalPriceDataProcessed, StockData } from "@/types/types";
import TickerInfo from "@/src/components/stock/TickerInfo";
import ExtraData from "@/src/components/stock/extraData/ExtraData";
import { fetchHistoryData, fetchStockData } from "@/util/backendFetchData";
import { processHistoryData, getPriceChange } from "@/util/ProcessStockData";
import Loading from "./loading";
import Image from "next/image";
import star from "../../../../public/star.svg";
import starFilled from "../../../../public/starFilled.svg";
import { isStateChanged } from "@/util/firebase/auth";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "@/util/firebase/firestore";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
    params: {
        ticker: string;
    };
}

const watchlistOnClick = (isAddedToWatchlist: boolean, setIsAddedToWatchlist: (isAddedToWatchlist: boolean) => void, loggedIn: boolean, ticker: string, router: AppRouterInstance) => {
    if (!loggedIn) {
        router.push("/login");
        return;
    }

    if (!isAddedToWatchlist) {
        addToWatchlist(ticker);
        setIsAddedToWatchlist(true);
    } else {
        removeFromWatchlist(ticker);
        setIsAddedToWatchlist(false);
    }
};

const Page = ({ params }: Props) => {
    const [stockData, setStockData] = useState<StockData>();
    const [stockDataLoaded, setStockDataLoaded] = useState(false);
    const [period, setPeriod] = useState("1d");
    const [history, setHistory] = useState<HistoricalPriceDataProcessed>();
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(-1);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [stockFound, setStockFound] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchWatchlist = async () => {
            const doc = await getWatchlist();

            if (doc && doc.watchlist.includes(params.ticker)) {
                setIsAddedToWatchlist(true);
            } else {
                setIsAddedToWatchlist(false);
            }
        };

        fetchWatchlist();
    }, [params.ticker]);

    useEffect(() => {
        const listener = isStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
        return () => {
            listener();
        };
    }, [params.ticker]);

    useEffect(() => {
        const fetchData = async () => {
            const data: StockData = await fetchStockData(params.ticker);
            console.log(data);
            // if (!data.history || !data.stock_info) {
            // 	setStockFound(false);
            // 	return;
            // }

            setStockData(data);
            setHistory(processHistoryData(data.history.Open));
            setHistoryLoaded(true);
            setStockDataLoaded(true);
        };

        fetchData();
    }, [params.ticker]);

    useEffect(() => {
        if (stockDataLoaded && history) {
            setCurrentPrice(history[history.length - 1].value);
        }
    }, [stockDataLoaded]);

    useEffect(() => {
        setHistoryLoaded(false);
        const fetchData = async () => {
            const data = await fetchHistoryData(period, params.ticker);

            setHistory(processHistoryData(data.Open));
            setHistoryLoaded(true);
        };
        fetchData();
    }, [period]);

    if (!stockFound) {
        return <div className="flex flex-col justify-center items-center h-[40vw] text-white text-4xl font-medium tracking-wider text-center">Stock Not Found</div>;
    }

    return (
        <>
            {stockDataLoaded && stockData ? (
                <div className="flex flex-col items-center px-4">
                    <div className="flex flex-row justify-center w-full p-6 mx-auto mt-10 space-x-7">
                        <div className="flex flex-col w-[55%] h-fit bg-bgcolor-primary space-y-6 py-6 rounded-xl drop-shadow-bg-light">
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-row justify-center items-center bg-accent rounded-r-full pl-8 space-x-4 pr-7">
                                    <div className="flex flex-col items-start text-white py-2 space-y-1`">
                                        <div className="text-xl">
                                            {stockData.name} <span className="uppercase">({params.ticker})</span>
                                        </div>
                                        <div className="text-sm uppercase">
                                            {stockData.info.Exchange} · {stockData.info.Currency}
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center space-x-3">
                                        <Image
                                            src={isAddedToWatchlist ? starFilled : star}
                                            alt="star"
                                            width={30}
                                            height={30}
                                            onClick={() => {
                                                watchlistOnClick(isAddedToWatchlist, setIsAddedToWatchlist, loggedIn, params.ticker, router);
                                            }}
                                        />
                                        {isAddedToWatchlist && (
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="text-white text-sm">Added To</div>
                                                <div className="text-white text-sm">Watchlist</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end px-6">
                                    <div className="text-4xl text-white font-light tracking-wider">
                                        $
                                        {currentPrice.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </div>
                                    {historyLoaded && history && (
                                        <div className={`${(currentPrice - history[0].value) / history[0].value > 0 ? "text-gain-s" : "text-loss-s"} text-xl font-light`}>{getPriceChange(history[0].value, currentPrice, period)}</div>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-2">
                                <ChartPeriodButtonArray setPeriod={setPeriod} />
                                <div className="w-full h-[400px]">
                                    {historyLoaded && history && (
                                        <Chart
                                            data={history}
                                            colors={{
                                                backgroundColor: "#1d1d1d",
                                                lineColor: "#BB86FC",
                                                textColor: "white",
                                                areaTopColor: "#BB86FC",
                                                areaBottomColor: "#BB86FC00",
                                                borderColor: "#1d1d1d",
                                                horiLineColor: "#FFFFFF44",
                                                crosshairColor: "white",
                                                crosshairLabelBackgroundColor: "#BB86FC",
                                            }}
                                        ></Chart>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-[45%]">
                            <TickerInfo stock_info={stockData.stock_info} />
                        </div>
                    </div>

                    <div className="w-full px-4">
                        <ExtraData stockData={stockData} />
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Page;
