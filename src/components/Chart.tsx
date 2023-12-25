"use client";

import React from "react";
import { createChart, ColorType, CrosshairMode, PriceLineSource, LineStyle } from "lightweight-charts";
import { useRef, useEffect } from "react";

interface Props {
	data: { time: any; value: number }[];
	colors?: { [key: string]: string };
}

const Chart = (props: Props) => {
	const {
		data,
		colors: {
			backgroundColor = "#1d1d1d",
			lineColor = "#BB86FC",
			textColor = "white",
			areaTopColor = "#BB86FC",
			areaBottomColor = "#BB86FC00",
		} = {},
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth });
		};

		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: {
					type: ColorType.Solid,
					color: backgroundColor,
				},
				textColor,
			},
			width: chartContainerRef.current.clientWidth,
			height: 400,
			timeScale: {
				minBarSpacing: 0.001,
				fixLeftEdge: true,
				fixRightEdge: true,
				borderColor: "#1d1d1d",
				timeVisible: true,
				secondsVisible: false,
			},
			rightPriceScale: {
				visible: false,
			},
			leftPriceScale: {
				visible: true,
				borderColor: "#1d1d1d",
				autoScale: true,
			},
			grid: {
				vertLines: {
					visible: false,
				},
				horzLines: {
					color: "#FFFFFF88",
				},
			},
			crosshair: {
				mode: CrosshairMode.Magnet,
				vertLine: {
					color: "white",
					labelBackgroundColor: "#BB86FC",
				},
				horzLine: {
					color: "white",
					labelBackgroundColor: "#BB86FC",
				},
			},
		});
		chart.timeScale().fitContent();

		const newSeries = chart.addAreaSeries({
			lineColor,
			topColor: areaTopColor,
			bottomColor: areaBottomColor,
			priceLineVisible: true,
			priceLineWidth: 2,
			// priceLineColor: "#40c9ff",
			priceLineStyle: LineStyle.LargeDashed,
			priceLineSource: PriceLineSource.LastVisible,
			lastValueVisible: false,
		});
		newSeries.setData(data);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

	return <div ref={chartContainerRef} />;
};

export default Chart;
