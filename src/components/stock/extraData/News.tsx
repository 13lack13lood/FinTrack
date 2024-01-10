import { GeneralNewsDataRaw, GeneralNewsDataProcessed } from "@/types/types";
import React from "react";

interface Props {
    news: GeneralNewsDataRaw;
    // news_mean: StockData["news_mean"];
}
const processNewsData = (news: GeneralNewsDataRaw) => {
    let data: GeneralNewsDataProcessed = new Array(Object.keys(news.headline).length);

    for (let i = 0; i < data.length; i++) {
        const index = i.toString();

        data[i] = {
            link: news.link[index],
            img_src: news.img_src[index],
            timestamp: news.timestamp[index],
            description: news.description[index],
            headline: news.headline[index],
            tickers: news.tickers[index],
            publisher: news.publisher[index],
            // compound: news.compound[index],
        };
    }

    return data;
};

const News = ({ news }: Props) => {
    if (!news) {
        return <div className="text-4xl text-center w-full mt-16">Information unavailable right now</div>;
    }

    const processedData = processNewsData(news);

    return (
        <div className="flex flex-col w-max max-w-full space-y-7 items-center justify-center">
            {/* <div className="grid grid-cols-2 gap-4 col-span-2"> */}
            {processedData.map((value) => {
                return (
                    <div key={value.headline} className="flex flex-row w-full rounded-2xl p-4 bg-bgcolor-primary drop-shadow-bg space-x-5">
                        <img src={value.img_src} width={200} height={200}></img>
                        <div className="flex flex-col justify-center text-white space-y-3">
                            <div className="flex flex-wrap space-x-5">
                                <div className="font-thin">{value.timestamp}</div>
                                <div className="font-thin">{value.publisher}</div>
                            </div>
                            <a href={value.link}>
                                <div className="text-2xl font-light">{value.headline}</div>
                            </a>

                            <div className="flex flex-wrap space-x-5">
                                <div className="font-medium">Other Stocks:</div>
                                {value.tickers.length == 0 ? (
                                    <div className="font-light tracking-wider">None</div>
                                ) : (
                                    value.tickers.map((ticker) => {
                                        return (
                                            <div key={"stock_news_" + ticker} className="font-light tracking-wider">
                                                {ticker}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* </div> 
                <div className="flex flex-col w-full items-center space-y-5 bg-bgcolor-primary rounded-2xl drop-shadow-bg h-fit p-4">
                <div className=" text-xl border-b-2 border-accent text-white px-4 py-1 text-center drop-shadow-bg-light font-light">Overall News Analysis</div>
                <div className="flex flex-col w-full items-center space-y-4">
                    {Object.entries(news_mean.compound)
                        .reverse()
                        .map(([date, value], index) => {
                            const compound = value;
                            const positive = compound > 0;
                            const negative = compound < 0;

                            return (
                                <div key={`${value}_${index}`} className="flex flex-row items-center text-white justify-between w-full bg-bgcolor-secondary rounded-full px-5 py-3 drop-shadow-bg-light ">
                                    <div className="text-lg">{date}</div>
                                    <div className={`rounded-full drop-shadow-bg-light text-sm font-light px-4 py-1 ${positive ? "bg-gain-s" : negative ? "bg-loss-s" : "bg-bgcolor-secondary"}`}>{`${
                                        positive ? `↑ Positive (${(compound * 100).toFixed(0)}%)` : negative ? `↓ Negative (${(compound * 100).toFixed(0)}%)` : `- Neutral`
                                    }`}</div>
                                </div>
                            );
                        })}
                </div>
                <div className="flex flex-col w-full items-center pt-5 text-white px-3 text-center space-y-2">
                    <div className="text-lg border-b-2 mb-2 border-accent">How News Analysis Works</div>
                    <div className="text-base font-light">
                        Sentimental analysis is performed on each news headline using FinBERT, developed by ProsusAI. FinBERT is a pre-trained natural language processing model to analyze sentiment of financial text. The model determines a
                        label of positive, negative, or neutral given the text along with a percentage.
                        <a className="underline px-2 transition-all duration-150 hover:text-accent" href="https://huggingface.co/ProsusAI/finbert" target="_blank">
                            [More info on FinBERT]
                        </a>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default News;
