import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import "./CSS/TopCity.css";
import LoadingSpinner  from "./LoadingSpinner";


function TopCity(props) {
  const APIKey = "e0c75f6e0674d3356860883d1ed7f009";
  let [data1, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&appid=${APIKey}`
      )
      .then((response) => {
        // console.log(response.data);
        const { name } = response.data;
        const { icon, description } = response.data.weather[0];
        const { temp, humidity } = response.data.main;
        const { speed } = response.data.wind;
        // console.log(name);
        let newData = {
          cityName: name,
          cityIcon: icon,
          cityDescription: description,
          cityTemp: temp,
          cityHumidity: humidity,
          citySpeed: speed,
        };
        setData(newData);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        alert(`No Weather found for ${props.cityName}. Please search for valid city`)
      });
  }, [props.cityName]);
  let iconSrc = `https://openweathermap.org/img/wn/${data1.cityIcon}.png`
  return (
    <div className="card" >
      { isLoading ? <LoadingSpinner /> : 
        <div className="weather loading">
          <h2 className="city">{data1.cityName}</h2>
          <h1 className="temp">{(data1.cityTemp - 273.15).toFixed(2)}°C</h1>
          <div className="flex">
            <img
              src= {iconSrc}
              alt=""
              className="icon"
            />
            <div className="description">{data1.cityDescription}</div>
          </div>
          <div className="humidity">Humidity: {data1.cityHumidity}</div>
          <div className="wind">Wind speed: {data1.citySpeed} km/h</div>
        </div>
        }
    </div>
  );
}

export default memo(TopCity);
