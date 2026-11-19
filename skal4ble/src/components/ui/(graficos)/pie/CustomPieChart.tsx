"use client";

import React, { useEffect, useRef, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import styles from "./CustomPieChart.module.css";

export interface PieDataItem {
  id: string | number;
  value: number;
  label: string;
  color?: string;
}

interface CustomPieChartProps {
  data: PieDataItem[];
  width?: number;
  height?: number;
  hideLegend?: boolean;
}

const SKAL4BLE_COLORS = [
  "#390c88", // --roxo-escuro1
  "#710ec8", // --roxo-escuro3
  "#f9ee72", // --amarelo1
  "#1cda88", // --verde
  "#9660e0", // --roxo-claro1
  "#f2381f", // --vermelho
];

export function CustomPieChart({
  data,
  width,
  height,
  hideLegend = false,
}: CustomPieChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 360, height: 320 });

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerSize({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const availableWidth = width ?? containerSize.width;
  const availableHeight = height ?? containerSize.height;

  // Reserva a altura real ocupada pelas linhas de pílulas da legenda
  const isCompact = availableHeight < 420;
  const legendRows = hideLegend ? 0 : Math.max(1, Math.ceil(data.length / 2));
  const legendHeight = hideLegend
    ? 0
    : legendRows * (isCompact ? 38 : 48) + (legendRows - 1) * 10 + 16;

  // Desconta a legenda e calcula o raio máximo que cabe sem estourar
  const maxSvgHeight = Math.max(110, availableHeight - legendHeight - 8);
  const maxRadius = Math.min(
    (availableWidth - 20) / 2,
    (maxSvgHeight - 12) / 2
  );

  const outerRadius = Math.max(48, Math.min(135, Math.floor(maxRadius)));
  const innerRadius = Math.max(20, Math.round(outerRadius * 0.33));
  const pieSvgHeight = outerRadius * 2 + 12;

  const formattedData = data.map((item, index) => ({
    ...item,
    color: item.color ?? SKAL4BLE_COLORS[index % SKAL4BLE_COLORS.length],
  }));

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <PieChart
        className={styles.chart}
        width={availableWidth}
        height={pieSvgHeight}
        hideLegend={hideLegend}
        margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
        series={[
          {
            data: formattedData,
            labelMarkType: "circle",
            innerRadius,
            outerRadius,
            paddingAngle: 3,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            highlightScope: { fade: "global", highlight: "item" },
          },
        ]}
        slotProps={{
          legend: {
            direction: "horizontal",
            position: { vertical: "bottom", horizontal: "center" },
          },
          tooltip: {
            disablePortal: true,
          },
        }}
      />
    </div>
  );
}