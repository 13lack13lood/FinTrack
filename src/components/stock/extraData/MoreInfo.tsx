import { StockData } from "@/types/types";
import React from "react";

interface Props {
    info: StockData["info"];
    wiki: StockData["wiki"];
    name: StockData["name"];
}

const MoreInfo = ({ info, wiki, name }: Props) => {
    return (
        <div className="flex flex-wrap w-full items-center justify-center space-x-7">
            <div className="grid grid-cols-2 gap-4">
                {info &&
                    Object.entries(info).map(([key, value]) => {
                        return (
                            <div key={key + "_" + name} className="flex flex-col items-start p-4 space-y-3 bg-bgcolor-primary rounded-2xl drop-shadow-bg">
                                <div className="text-white font-medium">{key}</div>
                                <div className="text-white text-lg font-light">{value}</div>
                            </div>
                        );
                    })}
            </div>
            {wiki && name && (
                <div className="flex flex-col w-1/3 bg-bgcolor-primary p-4 rounded-2xl drop-shadow-bg">
                    <div className="text-xl text-center text-white border-b-2 border-accent p-4 mb-5">{`About ${name}`}</div>
                    <div className="text-white font-light text-center">
                        {wiki.text}
                        <a href={wiki.url} className="underline transition-all duration-150 hover:text-accent" target="_blank">
                            [Read More]
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoreInfo;
