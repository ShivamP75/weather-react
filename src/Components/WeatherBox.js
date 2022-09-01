import React from 'react'
import './CSS/WeatherBox.css'
import LoadingSpinner from './LoadingSpinner'

export default function WeatherBox({data, isLoading}) {
  let iconSrc = `https://openweathermap.org/img/wn/${data.cityIcon}.png`
  
  return (
    <div className="card">
        {isLoading ? <LoadingSpinner /> :
        <div className="weather loading">
          <h2 className="city">{data.cityName}</h2>
          <h1 className="temp">{(data.cityTemp - 273.15).toFixed(2)}°C</h1>
          <div className="flex">
            <img src={iconSrc} alt="" className="icon" />
            <div className="description">{data.cityDescription}</div>
          </div>
          <div className="humidity">Humidity: {data.cityHumidity}</div>
          <div className="wind">Wind speed: {data.citySpeed} km/h</div>
        </div>
        }
      </div>
  )
}
