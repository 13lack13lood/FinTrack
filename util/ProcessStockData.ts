import { HistoricalPriceDataRaw } from "@/types/types";

const processHistoryData = (historyData: HistoricalPriceDataRaw) => {
	let data: { time: number; value: number }[] = [];

	Object.entries(historyData).forEach(([timestamp, value]) => {
		data.push({
			time: parseInt(timestamp),
			value: value,
		});
	});

	data.sort((x, y) => {
		if (x.time > y.time) return 1;

		if (x.time < y.time) return -1;
		return 0;
	});

	return data.map(({ time, value }) => {
		const d = new Date(time);
		return {
			time:
				Date.UTC(
					d.getFullYear(),
					d.getMonth(),
					d.getDate(),
					d.getHours(),
					d.getMinutes(),
					d.getSeconds(),
					d.getMilliseconds()
				) / 1000,
			value: value,
		};
	});
};

const getPriceChange = (initPrice: number, currentPrice: number, period: string) => {
	const percent = (((currentPrice - initPrice) / initPrice) * 100).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const difference = (currentPrice - initPrice).toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	if (currentPrice - initPrice > 0) {
		switch (period) {
			case "5d":
				return `+${difference} (+${percent}%) past week`;
			case "1mo":
				return `+${difference} (+${percent}%) past month`;
			case "6mo":
				return `+${difference} (+${percent}%) past 6 months`;
			case "ytd":
				return `+${difference} (+${percent}%) year to date`;
			case "1y":
				return `+${difference} (+${percent}%) past year`;
			case "5y":
				return `+${difference} (+${percent}%) past 5 years`;
			case "max":
				return `+${difference} (+${percent}%) all time`;
			default:
				return `+${difference} (+${percent}%) today`;
		}
	}

	switch (period) {
		case "5d":
			return `${difference} (${percent}%) past week`;
		case "1mo":
			return `${difference} (${percent}%) past month`;
		case "6mo":
			return `${difference} (${percent}%) past 6 months`;
		case "ytd":
			return `${difference} (${percent}%) year to day`;
		case "1y":
			return `${difference} (${percent}%) past year`;
		case "5y":
			return `${difference} (${percent}%) past 5 years`;
		case "max":
			return `${difference} (${percent}%) all time`;
		default:
			return `${difference} (${percent}%) today`;
	}
};

export { getPriceChange, processHistoryData };
