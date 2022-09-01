import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherBox from "./WeatherBox";
import './CSS/WeatherBox.css'
import TopCity from "./TopCity";


export default function GetLocation() {
  const APIKey = "e0c75f6e0674d3356860883d1ed7f009";

  let [data, setData] = useState({});
  let [lat, setLat] = useState();
  let [lon, setLon] = useState();
  const [isLoading, setLoading] = useState(true)
  let [location, setLocation] = useState(null);
  let [city, setCity] = useState(null);
  let [searchOrLoca , setSearchOrLoc] = useState(false);

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setSearchOrLoc(false)
    });
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      )
      .then((response) => {
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
      });
  }, [lat, lon]);
  function searchHandler(){
    if(location.length > 0 ){setCity(location);
    setSearchOrLoc(true)
    setLoading(false);
    }
  }
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-outline-success btn-lg mt-2"
          onClick={findLocation}
        >
          Current location
        </button>
      </div>
      <div>
      <div className="search">
          <input type="text" className="search-bar" placeholder="Search" onChange={(e) =>{
                setLocation(e.currentTarget.value);
          }}/>
          <button  onClick={searchHandler} className='btn btn-outline-success'><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
              </path>
            </svg></button>
        </div>
        { isLoading ? <WeatherBox data = {data} isLoading = {isLoading} /> : searchOrLoca ? <TopCity cityName={city} fromLocation={true}/> : <WeatherBox data = {data} isLoading = {isLoading}/>}
      </div>
    </>
  );
}
