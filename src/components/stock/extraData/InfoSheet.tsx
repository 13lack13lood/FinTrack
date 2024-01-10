import { StockData } from "@/types/types";
import React, { useState } from "react";

interface Props {
    info: StockData["balance"] | StockData["income"] | StockData["cashflow"];
    quarter: StockData["balance_quarter"] | StockData["income_quarter"] | StockData["cashflow_quarter"];
}

const processInfoData = (info: Props["info"], quarter: Props["quarter"]) => {
    const merged = { ...info, ...quarter };
    const data = Object.entries(merged).sort((a, b) => {
        const calc = (year: number) => {
            return year - Math.floor(year) == 0 ? year + 0.5 : year;
        };
        const year1 = calc(parseFloat(a[0].replace("Q", ".")));
        const year2 = calc(parseFloat(b[0].replace("Q", ".")));

        if (year1 > year2) {
            return -1;
        }

        return 1;
    });

    return data;
};

const InfoSheet = ({ info, quarter }: Props) => {
    if (!info || !quarter) {
        return <div className="text-4xl text-center w-full mt-16">Information unavailable right now</div>;
    }

    const data = processInfoData(info, quarter);
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-col w-full items-center justify-center space-y-7">
            <div className="flex flex-wrap items-center justify-center space-x-4">
                {data.map((value, index) => {
                    return (
                        <div
                            key={value + "_" + index}
                            className={`${selected == index ? "bg-accent" : "bg-bgcolor-primary"} text-white font-light rounded-full px-5 py-2 drop-shadow-bg transition-all duration-200 hover:bg-accent hover:opacity-[85%] ease-out`}
                            onClick={() => setSelected(index)}
                        >
                            {value[0].replace("Q", " Q")}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col w-max bg-bgcolor-primary space-y-4 p-4 rounded-2xl drop-shadow-bg">
                {Object.entries(data[selected][1]).map(([key, value]) => {
                    return (
                        <div key={key + "_" + selected} className="flex flex-row justify-between space-x-8 text-white bg-bgcolor-secondary drop-shadow-bg-light px-3 py-1 rounded-full">
                            <div className="text-white font-medium">{key}</div>
                            <div className="text-white font-light">{value ? (value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${value.toLocaleString()}`) : "N/A"}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfoSheet;
