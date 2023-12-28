"use client";

import React from "react";
import { createChart, ColorType, CrosshairMode, PriceLineSource, LineStyle, AutoscaleInfo } from "lightweight-charts";
import { useRef, useEffect } from "react";

interface Props {
	data: { time: any; value: number }[];
	colors: {
		backgroundColor: string;
		lineColor: string;
		textColor: string;
		areaTopColor: string;
		areaBottomColor: string;
		borderColor: string;
		horiLineColor: string;
		crosshairColor: string;
		crosshairLabelBackgroundColor: string;
	};
}

const Chart = ({ data, colors }: Props) => {
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
					color: colors.backgroundColor,
				},
				textColor: colors.textColor,
			},
			width: chartContainerRef.current.clientWidth,
			height: 400,
			timeScale: {
				minBarSpacing: 0.001,
				fixLeftEdge: true,
				fixRightEdge: true,
				borderColor: colors.borderColor,
				timeVisible: true,
				secondsVisible: false,
			},
			rightPriceScale: {
				visible: false,
			},
			leftPriceScale: {
				visible: true,
				borderColor: colors.borderColor,
				autoScale: true,
				scaleMargins: {
					top: 0.1,
					bottom: 0.05,
				},
			},
			grid: {
				vertLines: {
					visible: false,
				},
				horzLines: {
					color: colors.horiLineColor,
				},
			},
			crosshair: {
				mode: CrosshairMode.Magnet,
				vertLine: {
					color: colors.crosshairColor,
					labelBackgroundColor: colors.crosshairLabelBackgroundColor,
				},
				horzLine: {
					color: colors.crosshairColor,
					labelBackgroundColor: colors.crosshairLabelBackgroundColor,
				},
			},
		});
		chart.timeScale().fitContent();

		const newSeries = chart.addAreaSeries({
			lineColor: colors.lineColor,
			topColor: colors.areaTopColor,
			bottomColor: colors.areaBottomColor,
			priceLineVisible: true,
			priceLineWidth: 2,
			priceLineStyle: LineStyle.LargeDashed,
			priceLineSource: PriceLineSource.LastVisible,
			lastValueVisible: false,
			autoscaleInfoProvider: (original: () => AutoscaleInfo | null) => {
				const res = original();
				if (res !== null && res.priceRange.minValue < 0) {
					res.priceRange.minValue = 0;
				}
				return res;
			},
		});
		newSeries.setData(data);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);

			chart.remove();
		};
	}, [data, colors.backgroundColor, colors.lineColor, colors.textColor, colors.areaTopColor, colors.areaBottomColor]);

	return <div ref={chartContainerRef} />;
};

export default Chart;
