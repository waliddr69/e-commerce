import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';




type params = {
  data:Array<{date:string,value:number}>
}

// #endregion
export default function Chart({data}:params) {
  return (
    
      <LineChart
      style={{ width: '100%', aspectRatio: 2.5 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="black" strokeWidth={2} name="My data series name" />
      <XAxis dataKey="date" fill='black'/>
      <YAxis width="auto" allowDecimals={false} dataKey={"value"} label={{ value: 'Orders', position: 'insideLeft', angle: -90 }} />
     
    </LineChart>
    
    
  );
}

