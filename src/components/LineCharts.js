import { LineChart, Card, Title } from "@tremor/react";
import { useEffect, useState } from "react";


function LineCharts({ weatherDetails }) {
    const [chartData, setChartData] = useState([]);

   
 

    useEffect(() => {
        const hourly = weatherDetails?.hourly?.time.map((time) => 
             new Date(time)
             .toLocaleString("en-US", { hour: "numeric", hour12: false })
             .slice(0, 24)
        );


       setChartData(hourly?.map((hour, i) => ({
            Time: Number(hour),
            Humidity: weatherDetails?.hourly?.relativehumidity_2m[i],
         }))
       );


    }, [weatherDetails])




  return (
    
        <Card>
            <Title>Humidity v/s Time</Title>
            <LineChart 
              data={chartData}
              index="Time"
              categories={["Humidity"]}
              colors={["yellow"]}
            />
        </Card>
      
    
  )
}
export default LineCharts;
