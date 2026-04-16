
import { BarChart } from "@mui/x-charts/BarChart";






const chartSetting = {
  yAxis: [
    {
      label: "orders",
      width: 60,
    },
  ],
  series: [{ dataKey: "orders", label: "orders" }],
  height: 300,
  margin: { left: 0 },
};

type params = {
    rows : Array<{name:string,orders:number}>
}

export default function ProductChart({rows}:params) {
 

  return (
    <div style={{ width: "100%",backgroundColor:"#f4f2f2",borderRadius:8 }}>
      
      <BarChart
        dataset={rows}
        xAxis={[{ dataKey: "name" }]}
        
        {...chartSetting}
      />
    </div>
  );
}
