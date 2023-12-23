import RoundSearchBar from "../components/RoundSearchBar";
import StockGrid from "../components/StockGrid";

const getTrendingData = async () => {
	const res = await fetch("http://localhost:5000/popular_stocks", {
		cache: "no-store",
	});
	const data = await res.json();
	console.log(data);
	return data;
};

export default async function Home() {
	const trendingData: {
		gainers: {
			change: string;
			name: string;
			ticker: string;
		}[];
		losers: {
			change: string;
			name: string;
			ticker: string;
		}[];
		trending: {
			change: string;
			name: string;
			ticker: string;
		}[];
	} = await getTrendingData();

	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-bgcolor ">
			<div className="flex flex-col flex-grow justify-center w-[80%] items-center mx-auto space-y-16">
				<div className="flex flex-col items-center justify-center w-[80%] space-y-32">
					<div className="mt-28 text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent">
						Track and Research The Market
					</div>
					<div className="flex flex-col items-center justify-center w-[60%]">
						<RoundSearchBar></RoundSearchBar>
					</div>
				</div>
				<div className="flex flex-col w-full space-y-16 py-10">
					<StockGrid title="Trending" stocks={trendingData.trending}></StockGrid>
					<StockGrid title="Gainers" stocks={trendingData.gainers}></StockGrid>
					<StockGrid title="Losers" stocks={trendingData.losers}></StockGrid>
				</div>
			</div>
		</main>
	);
}
