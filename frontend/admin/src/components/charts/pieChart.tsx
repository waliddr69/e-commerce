import * as React from "react";
import Box from "@mui/material/Box";

import { PieChart } from "@mui/x-charts/PieChart";
const desktopOS = [
  {
    label: 'Windows',
    value: 72.72,
  },
  {
    label: 'OS X',
    value: 16.38,
  },
  {
    label: 'Linux',
    value: 3.83,
  },
  {
    label: 'Chrome OS',
    value: 2.42,
  },
  {
    label: 'Other',
    value: 4.65,
  },
];


type params={
    data:Array<{label:string,value:number}>
}
export default function RegionChart({data}:params) {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
    console.log(data)
  

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={300}
        width={300}
        series={[
          {
            data: data,
            innerRadius: radius,
            arcLabel: (params)=>params.label ?? "",
            arcLabelMinAngle: 20,
           
          },
        ]}
        skipAnimation={skipAnimation}
      />
      
      
    </Box>
  );
}
