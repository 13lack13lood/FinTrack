import {
	ExploreSelection,
	TrendingStockDataFull,
	GeneralNewsDataRaw,
	StockData,
	HistoricalPriceDataRaw,
	QuickStockData,
	TrendingStockData,
} from "@/types/types";

const backend = process.env.NEXT_PUBLIC_BACKEND;

const fetchTrendingData = async () => {
	const res = await fetch(backend + "popular_stocks", {
		cache: "no-store",
	});

	const data: {
		gainers: TrendingStockData[];
		losers: TrendingStockData[];
		trending: TrendingStockData[];
	} = await res.json();

	return data;
};

const fetchExploreData = async (stocks: ExploreSelection) => {
	const res = await fetch(backend + "popular_stocks/" + stocks);
	const data: {
		data: TrendingStockDataFull[];
	} = await res.json();

	return data.data.sort((a, b) => {
		return parseInt(a.index) > parseInt(b.index) ? 1 : -1;
	});
};

const fetchNewsData = async () => {
	const res = await fetch(backend + "news", {
		cache: "no-store",
	});

	const data: GeneralNewsDataRaw = await res.json();

	return data;
};

const fetchStockData = async (ticker: string) => {
	const res = await fetch(backend + "stock/" + ticker, {
		cache: "no-store",
	});

	const data: StockData = await res.json();

	return data;
};

const fetchIndexData = async (index: string) => {
	const res = await fetch(backend + "index/" + index, {
		cache: "no-store",
	});

	const data = await res.json();
	return data;
};

const fetchHistoryData = async (period: string, ticker: string) => {
	const res = await fetch(backend + "history", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			period: period,
			ticker: ticker,
		}),
	});

	const data: { Open: HistoricalPriceDataRaw } = await res.json();

	return data;
};

const fetchQuickStockData = async (ticker: string) => {
	const res = await fetch(backend + "quick_info/" + ticker, {
		cache: "no-store",
	});

	const data: QuickStockData = await res.json();

	return data;
};

export {
	fetchExploreData,
	fetchNewsData,
	fetchStockData,
	fetchIndexData,
	fetchHistoryData,
	fetchQuickStockData,
	fetchTrendingData,
};
