
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type params = {
  data: Array<{ date: string; value: number }>;
};
const ResponsiveContainerFixed = ResponsiveContainer as any

// #endregion
export default function Chart({ data }: params) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: 2.5,
        backgroundColor: "#f4f2f2",
        borderRadius: 8,
        padding: 8,
        boxSizing: "border-box",
      }}
    >
      <ResponsiveContainerFixed width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 5, left: 10 }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis
            allowDecimals={false}
            dataKey="value"
            label={{ value: "Orders", position: "insideLeft", angle: -90 }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="black"
            strokeWidth={2}
            name="My data series name"
          />
        </LineChart>
      </ResponsiveContainerFixed>
    </div>
  );
}
