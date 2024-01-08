"use client";

import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "@/util/firebase/firestore";
import { fetchQuickStockData } from "@/util/backendFetchData";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import close from "../../../public/close.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/util/firebase/firebase";

const Page = async () => {
    const [docData, setDocData] = useState<DocumentData>();
    const [update, setUpdate] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const doc = await getWatchlist();

            setDocData(doc?.watchlist);
        };

        getData();
    }, [update]);

    const user = auth.currentUser;

    if (!user) {
        router.push("/login");
        return <div></div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-max mx-auto p-4 space-y-7">
            <div className="grid grid-cols-8 gap-4 items-center w-full text-white text-lg py-4 font-medium ">
                <div></div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg px-6">Ticker</div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1 px-6">Open</div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1 px-6">Close</div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1 px-6">High</div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg mx-1 px-6">Low</div>
                <div className="bg-bgcolor-primary rounded-2xl py-4 text-center drop-shadow-bg px-6 col-span-2">Volume</div>
            </div>
            {docData &&
                (docData.length > 0 ? (
                    docData.map(async (ticker: string) => {
                        const stockData = await fetchQuickStockData(ticker);

                        return (
                            <div key={"watchlist_" + ticker} className="grid grid-cols-8 items-center w-full">
                                <div className="flex flex-row items-center justify-center w-full ">
                                    <Image
                                        src={close}
                                        alt="close"
                                        width={30}
                                        height={30}
                                        className="p-1 rounded-full bg-bgcolor-primary drop-shadow-bg border-2 border-accent transition-all duration-200 hover:scale-150 hover:bg-accent"
                                        onClick={() => {
                                            removeFromWatchlist(ticker);
                                            setUpdate(true);
                                        }}
                                    />
                                </div>
                                <Link href={"/stocks/" + ticker} className="col-span-7 flex flex-row w-full items-center group justify-end cursor-pointer ">
                                    <div className="grid grid-cols-7 gap-4 w-full items-center bg-bgcolor-primary drop-shadow-bg-light rounded-2xl py-4 transition-all duration-200 group-hover:-translate-x-5 group-hover:bg-accent tracking-wide">
                                        <div className="text-white text-2xl text-center px-6 mx-1">{ticker.toUpperCase()}</div>
                                        <div className="text-white text-lg font-light text-center px-6 mx-1">${stockData.Open.toFixed(2)}</div>
                                        <div className="text-white text-lg font-light text-center px-6 mx-1">${stockData.Close.toFixed(2)}</div>
                                        <div className="text-white text-lg font-light text-center px-6 mx-1">${stockData.High.toFixed(2)}</div>
                                        <div className="text-white text-lg font-light text-center px-6 mx-1">${stockData.Low.toFixed(2)}</div>
                                        <div className="text-white text-lg font-light text-center col-span-2 px-6 mx-1">{stockData.Volume.toLocaleString()}</div>
                                    </div>
                                    <svg
                                        className="transition-all duration-300 ease-out translate-x-10 -mt-1 absolute opacity-0 group-hover:translate-x-15 group-hover:opacity-100 group-hover:transform group-hover:scale-150 fill-white mx-auto"
                                        viewBox="0 0 46 16"
                                        height="10"
                                        width="30"
                                        xmlns="http://www.w3.org/2000/svg"
                                        id="arrow-horizontal"
                                    >
                                        <path transform="translate(15)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                    </svg>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full text-white text-2xl text-center my-20 ">You have nothing in your watchlist.</div>
                ))}
        </div>
    );
};

export default Page;
