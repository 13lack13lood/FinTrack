import RoundSearchBar from "../components/searchBars/RoundSearchBar";
import StockGrid from "../components/landingPage/StockGrid";
import { fetchTrendingData } from "@/util/backendFetchData";

export default async function Home() {
    const trendingData = await fetchTrendingData();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-10">
            <div className="flex flex-col flex-grow justify-center w-full items-center mx-auto space-y-16">
                <div className="flex flex-col items-center justify-center w-[80%] space-y-32">
                    <div className="mt-28 text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent">Track and Research The Market</div>
                    <div className="flex flex-col items-center justify-center w-[60%]">
                        <RoundSearchBar></RoundSearchBar>
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-16 py-10">
                    <StockGrid item={{ title: "Trending", icon: "./active.svg", link: "/explore/trending" }} stocks={trendingData.trending}></StockGrid>
                    <StockGrid
                        item={{
                            title: "Gainers",
                            icon: "./trendingUp.svg",
                            link: "/explore/gainers",
                        }}
                        stocks={trendingData.gainers}
                    ></StockGrid>
                    <StockGrid
                        item={{
                            title: "Losers",
                            icon: "./trendingDown.svg",
                            link: "/explore/losers",
                        }}
                        stocks={trendingData.losers}
                    ></StockGrid>
                </div>
            </div>
        </main>
    );
}
