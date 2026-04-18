"use client";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "./Cards";

interface AdminSalesBarChartProps {
  data: {
    month: string;
    amount: number;
  }[];
}

export function AdminSalesBarChart({ data }: AdminSalesBarChartProps) {
  return (
    <SectionCard title={"AdminBarChart"} description={""}>
      <BarChart
        data={data}
        responsive
        style={{
          width: "100%",
          // maxWidth: "1600px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        margin={{ right: 30, left: 20, top: 40, bottom: 20 }}
      >
        <XAxis dataKey={"month"} />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat("en-US", {
              style: "decimal",
              maximumFractionDigits: 0,
            }).format(value)
          }
        />
        <Tooltip
          formatter={(value) =>
            new Intl.NumberFormat("en-US").format(value as number)
          }
        />
        <CartesianGrid />
        <Bar
          dataKey={"amount"}
          radius={[10, 10, 0, 0]}
          fill="#FACC14"
          barSize={70}
        />
      </BarChart>
    </SectionCard>
  );
}
