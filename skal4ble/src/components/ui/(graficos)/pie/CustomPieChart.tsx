"use client";

import React from "react";
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

// Mantido em hexadecimal porque o MUI calcula o efeito de fade/hover via JS
const SKAL4BLE_COLORS = [
  "#710ec8", // --roxo-escuro3
  "#1cda88", // --verde
  "#9660e0", // --roxo-claro1
  "#f9ee72", // --amarelo1
  "#BCB1F8", // --roxo-claro2
  "#f2381f", // --vermelho
];

export function CustomPieChart({
  data,
  width = 320,
  height = 260,
  hideLegend = false,
}: CustomPieChartProps) {
  const formattedData = data.map((item, index) => ({
    ...item,
    color: item.color ?? SKAL4BLE_COLORS[index % SKAL4BLE_COLORS.length],
  }));

  return (
    <div className={styles.wrapper}>
      <PieChart
        className={styles.chart}
        width={width}
        height={height}
        hideLegend={hideLegend}
        series={[
          {
            data: formattedData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 120,
            cy: 130,
            highlightScope: { fade: "global", highlight: "item" },
          },
        ]}
      />
    </div>
  );
}