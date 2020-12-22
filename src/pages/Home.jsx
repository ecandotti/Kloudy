import React, { useState } from 'react'
import axios from 'axios'
import { BiSearchAlt } from 'react-icons/bi'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { CgCompressLeft } from 'react-icons/cg'
import { WiHumidity } from 'react-icons/wi'
import { FiWind, FiCloud } from 'react-icons/fi'

const Home = () => {
    const [dataCity, setDataCity] = useState(null)
    const [error, setError] = useState(false)
    const [urlWeather, setUrlWeather] = useState('')
    const [time, setTime] = useState('')
    const [lang, setLang] = useState('fr')
    const [units, setUnits] = useState('metric')
    const [city, setCity] = useState('')

   const currentDate = () => {
        const today = new Date(Date.now())
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const date = today.toLocaleDateString('fr-FR', options)
        return date
   }

   const isEnter = (e) => {
        if (e.charCode === 13) {
            console.log('search by EnterKey')
            fetchCity()
        }
   }

    const fetchCity = async () => {
        const { API_KEY } = process.env
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${API_KEY}`
        
        if (city) {
            await axios.get(API_URL)
                .then(res => {
                    setError(false)
                    setDataCity(res.data)
                    setUrlWeather(`http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
                    setTime(currentDate)
                })
                .catch(error => {
                    setDataCity(null)
                    setError(true)
                    console.log(error)
                })
        } else {
            setDataCity(null)
        }
    }
    
    return(
        <div className="flex flex-col flex-nowrap p-6 select-none h-full">
            { /* HEADER */}
            <div className="flex-1 text-center m-4">
                <div className="flex flex-col text-gray-100 flex-wrap items-center justify-center text-2xl">
                    <TiWeatherPartlySunny />
                    Kloudy
                </div>
            </div>
            { /* SEARCH BAR */}
            <div className="flex-1 my-4 flex flex-row flex-nowrap text-center text-gray-200">
                <input type="text" placeholder="Entrer une ville" className="bg-gray-800 hover:bg-gray-700 rounded-xl w-full text-center focus:outline-none p-2 shadow-lg" value={city} onChange ={(e) => setCity(e.target.value)} onKeyPress={isEnter} required/>
                <button className="bg-gray-800 hover:bg-gray-700 rounded-xl ml-2 px-2 shadow-lg focus:outline-none" onClick={() => fetchCity()}><BiSearchAlt /> </button>
            </div>
            { /* PANEL */}
            <div className="flex-10">
                <div className="flex flex-col flex-nowrap bg-gray-800 space-y-6 rounded-xl px-8 py-14 shadow-lg text-white h-full">
                    {
                    dataCity 
                        ?
                            <>
                                <span className="text-blue-400">{time}</span>
                                <span className="font-bold">{dataCity.name}, {dataCity.sys.country}</span>
                                <span className="space-x-4">
                                    <img className="inline-block" src={urlWeather} alt="weather img"/>
                                    <span className="inline-block text-2xl">{dataCity.main.temp}°C</span>
                                </span>
                                <div className="flex flex-row flex-wrap items-center text-center">
                                    <div className="mx-auto"><FiWind className="inline-block"/> {dataCity.wind.speed}m/s W</div>
                                    <div className="mx-auto"><FiCloud className="inline-block"/> {dataCity.clouds.all}%</div>
                                </div>
                                <div className="flex flex-row flex-wrap items-center text-center">
                                    <div className="mx-auto"><CgCompressLeft className="inline-block"/> {dataCity.main.pressure}</div>
                                    <div className="mx-auto"><WiHumidity className="inline-block"/> {dataCity.main.humidity}</div>
                                </div>
                            </>
                        :
                            <span className="p-6 mx-auto">{error ? "Aucune ville trouvé" : "Weather App in ReactJS"}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home