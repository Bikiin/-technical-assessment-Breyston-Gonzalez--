export interface GeoResponse {
    name: string
    lat: number
    lon: number
    country: string
    state: string
}

export interface WeatherResponse {
    weather: Weather[]
    main: Main
    sys: Sys
    name: string
}

export interface Coord {
    lon: number
    lat: number
}

export interface Weather {
    description: string
}

export interface Main {
    temp: number
    humidity: number
}

export interface Sys {
    country: string
}

export interface GetWeatherResponse {
    countryCode: string
    placeWeatherName: string
    temperature: number
    humidity: number
    weather: string
}
