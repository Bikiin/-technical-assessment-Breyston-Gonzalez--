"use server"

import { fetchGeoLocations } from "./fetchGeoLocations"
import { fetchWeatherData } from "./fetchWeather"
import { findLocationByCountryCode, formatLocationName } from "./helpers"

export async function getWeather(place: string) {
    const API_BASE = process.env.API_BASE as string
    const API_KEY = process.env.API_KEY as string

    const locations = await fetchGeoLocations(place, API_KEY, API_BASE)
    const weatherList = await fetchWeatherData(locations, API_KEY, API_BASE)

    const formatted = weatherList.map((weather) => {
        const location = findLocationByCountryCode(weather.sys.country, locations)
        return {
            countryCode: weather.sys.country,
            placeWeatherName: formatLocationName(location, weather.name),
            temperature: weather.main.temp,
            humidity: weather.main.humidity,
            weather: weather.weather[0].description
        }
    })

    return formatted
}
