import { Card, Metric, Title } from "@tremor/react";
import Sidebar from "./Sidebar";
import AreaChartCard from "./AreaChartCard";





function Body(props) {

const weatherDetails = props.weatherDetails;



    return (

        <div className="flex items-center space-x-2">
            <Card 
                decoration="top" 
                decorationColor="red" 
                className="bg-gray-100 text-center "
            >
                <Title>Temperature</Title>
                <Metric>{weatherDetails?.daily?.temperature_2m_max[0]} &#x2103;</Metric>
            </Card>



            <Card 
                decoration="top" 
                decorationColor="blue" 
                className="bg-gray-100 text-center "
            >
                <Title>Wind Speed</Title>
                <Metric>{weatherDetails?.daily?.windspeed_10m_max[0]} km/h</Metric>
            </Card>



            <Card 
                decoration="top" 
                decorationColor="green" 
                className="bg-gray-100 text-center "
            >
                <Title>UV Index</Title>
                <Metric>{weatherDetails?.daily?.uv_index_max[0]}</Metric>
            </Card>



            
            
            </div>

           

    )
}


export default Body;