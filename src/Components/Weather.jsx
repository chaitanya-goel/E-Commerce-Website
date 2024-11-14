import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../Assets/04 Weather App React Assets/Assets/search.png'
import clear_icon from '../Assets/04 Weather App React Assets/Assets/clear.png'
import cloud_icon from '../Assets/04 Weather App React Assets/Assets/cloud.png'
import drizzle_icon from '../Assets/04 Weather App React Assets/Assets/drizzle.png'
import rain_icon from '../Assets/04 Weather App React Assets/Assets/rain.png'
import snow_icon from '../Assets/04 Weather App React Assets/Assets/snow.png'
import wind_icon from '../Assets/04 Weather App React Assets/Assets/wind.png'
import humidity_icon from '../Assets/04 Weather App React Assets/Assets/humidity.png'


const Weather = () => {
   const inputRef = useRef()
  const [weatherData, setWeatherData]= useState(false);


  const allIcons= {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }


    const search = async (city) => {

        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {

            // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
            // &appid=${process.env.REACT_APP_API_URL}`;

            // const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0a4ce9220ac6375db6899a66db557f9e`;


            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })


        } catch (error) {

        }
    }


    useEffect(() => {
        search("Mohali");

    },[])



    return (
        <div className='weather'>
            <div className="searchbar">
                <input ref={inputRef}  type="text" placeholder='Search' />
                <img src={search_icon} alt=""  onClick={()=>search(inputRef.current.value)}/>

            </div>

            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>

                    </div>

                </div>


                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Weather






  






















