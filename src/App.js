import { useEffect } from "react";
import { useState } from "react";
import { City, Country } from "country-state-city";
import Select from "react-select";

import Body from "./components/Body";
import AreaChartCard from "./components/AreaChartCard";

import LineCharts from "./components/LineCharts";



function App() {


  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState([]); 




  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );
  }, []);

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };


  const getWeatherDetails = async(e) => {
    e.preventDefault();

    const fetchWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity?.value?.latitude}&longitude=${selectedCity?.value?.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,windspeed_180m,winddirection_120m,temperature_180m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max&timezone=GMT`);

    const data = await fetchWeather.json();

    setWeatherDetails(data);

  };


  

  return (
    <div className="flex max-w-7xl mx-auto space-x-1">
      {/* Sidebar */}

     
    
      <div className="flex flex-col space-y-3 h-screen bg-blue-950 p-3 w-[25%]">
        {/* Form */}
        <Select
          options={allCountries}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />

        <Select
          options={City.getCitiesOfCountry(selectedCountry?.value?.isoCode).map(
            (city) => ({
              value: {
                latitude: city.latitude,
                longitude: city.longitude,
              },
              label: city.name,
            })
          )}
          value={selectedCity}
          onChange={handleSelectedCity}
        />

        <button
          onClick={getWeatherDetails}
          className="bg-green-400 w-full py-3 text-white text-sm font-bold 
          hover:scale-105 transition-all duration-200 ease-in-out"
        >
          Get Weather
        </button>

        <div className="flex flex-col space-y-2 text-white font-semibold">
          <p>
            {selectedCountry?.label} | {selectedCity?.label}
          </p>
          <p>
            Coordinates: {selectedCity?.value?.latitude} |{" "}
            {selectedCity?.value?.longitude}
          </p>
        </div>

        <div>{/* {Sunrise / Sunset} */}</div>
      </div>

       
      
      <div className="w-[75%] h-screen">
        {/* Body */}
        <Body weatherDetails={weatherDetails} />

        {/* AreaChartCard */}

        <AreaChartCard weatherDetails={weatherDetails} />

        <LineCharts weatherDetails={weatherDetails}/>

      </div>

      

      
      

    </div>
  );
}

export default App;
