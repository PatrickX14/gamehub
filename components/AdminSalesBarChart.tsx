"use client";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface AdminSalesBarChartProps {
  data: {
    month: string;
    amount: number;
  }[];
}

export function AdminSalesBarChart({ data }: AdminSalesBarChartProps) {
  return (
    <div>
      <h3 className="text-2xl my-2 font-semibold text-secondary">
        AdminBarChart
      </h3>
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
        className="bg-[#F9FAFB] rounded-md shadow-md border border-[#0000]/20"
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
    </div>
  );
}
