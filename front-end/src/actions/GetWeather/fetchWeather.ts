import { GeoResponse, WeatherResponse } from "./types"

export async function fetchWeatherData(
    locations: GeoResponse[],
    apiKey: string,
    apiBase: string
): Promise<WeatherResponse[]> {
    const weatherRequests = locations.map(({ lat, lon }) => {
        const params = new URLSearchParams({
            appid: apiKey,
            lat: lat.toString(),
            lon: lon.toString()
        })

        return fetch(`${apiBase}/data/2.5/weather?${params.toString()}`)
    })

    const results = await Promise.allSettled<Response>(weatherRequests)

    const fulfilled = results
        .filter((res): res is PromiseFulfilledResult<Response> => res.status === "fulfilled" && res.value.ok)
        .map(res => res.value.json())

    return Promise.all(fulfilled)
}
