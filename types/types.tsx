type TrendingStockData = {
	change: string;
	name: string;
	ticker: string;
};

type MenuItem = {
	title: string;
	icon: string;
	link: string;
};

type StockData = {
	name: string;
	info: {
		Industry: string;
		Sector: string;
		Founded: string;
		Employees: string;
		"Stock Exchange": string;
		"Ticker Symbol": string;
		Exchange: string;
		Currency: string;
	};
	wiki: {
		url: string;
		text: string;
	};
	stock_info: {
		"Market Cap": string;
		"Revenue (ttm)": string;
		"Net Income (ttm)": string;
		"Shares Out": string;
		"EPS (ttm)": string;
		"PE Ratio": string;
		"Forward PE": string;
		Dividend: string;
		"Ex-Dividend Date": string;
		Volume: string;
		Open: string;
		"Previous Close": string;
		"Day's Range": string;
		"52-Week Range": string;
		Beta: string;
		Analysts: string;
		"Price Target": string;
		"Earnings Date": string;
	};
	balance: {
		[key: string]: { [key: string]: number };
	};
	balance_quarter: {
		[key: string]: { [key: string]: number };
	};
	income: {
		[key: string]: { [key: string]: number };
	};
	income_quarter: {
		[key: string]: { [key: string]: number };
	};
	cashflow: {
		[key: string]: { [key: string]: number };
	};
	cashflow_quarter: {
		[key: string]: { [key: string]: number };
	};
	history: {
		Open: HistoricalPriceDataRaw;
	};
	news: {
		compound: {
			[key: number]: number;
		};
		date: {
			[key: number]: string;
		};
		time: {
			[key: number]: string;
		};
		headline: {
			[key: number]: string;
		};
		link: {
			[key: number]: string;
		};
		publisher: {
			[key: number]: string;
		};
	};
	news_mean: {
		compound: {
			[key: string]: number;
		};
	};
};

type HistoricalPriceDataRaw = { [key: string]: number };

type HistoricalPriceDataProcessed = { time: number; value: number }[];

type ExtraDataSelection = "news" | "balance" | "income" | "cashflow" | "more info";

type GeneralNewsDataRaw = {
	link: { [index: string]: string };
	img_src: { [index: string]: string };
	timestamp: { [index: string]: string };
	publisher: { [index: string]: string };
	headline: { [index: string]: string };
	description: { [index: string]: string };
	tickers: { [index: string]: string[] };
	compound: { [index: string]: number };
};

type GeneralNewsDataProcessed = {
	link: string;
	img_src: string;
	timestamp: string;
	publisher: string;
	headline: string;
	description: string;
	tickers: string[];
	compound: number;
}[];

type IndexTickers = "^GSPC" | "^DJI" | "^IXIC";

type IndexData = {
	name: string;
	ticker: IndexTickers;
	history: {
		Open: HistoricalPriceDataRaw;
	};
	wiki: {
		url: string;
		text: string;
	};
};

type ExploreSelection = "market index" | "trending" | "gainers" | "losers";

type TrendingStockDataFull = {
	index: string;
	change: string;
	name: string;
	ticker: string;
	stock_price: string;
	volume: string;
	market_cap: string;
};

export type {
	TrendingStockData,
	MenuItem,
	StockData,
	HistoricalPriceDataProcessed,
	HistoricalPriceDataRaw,
	ExtraDataSelection,
	GeneralNewsDataProcessed,
	GeneralNewsDataRaw,
	IndexData,
	IndexTickers,
	ExploreSelection,
	TrendingStockDataFull,
};
