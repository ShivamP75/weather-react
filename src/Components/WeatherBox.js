import React from 'react'
import './WeatherBox.css'


export default function WeatherBox({data, isLoading}) {
  return (
    <div className="card">
        
        <div className="weather loading">
          <h2 className="city">{data.cityName}</h2>
          <h1 className="temp">{(data.cityTemp - 273.15).toFixed(2)}°C</h1>
          <div className="flex">
            <img src="https://openweathermap.org/img/wn/04n.png" alt="" className="icon" />
            <div className="description">Cloudy</div>
          </div>
          <div className="humidity">Humidity: {data.cityHumidity}</div>
          <div className="wind">Wind speed: {data.citySpeed} km/h</div>
        </div>
        
      </div>
  )
}
