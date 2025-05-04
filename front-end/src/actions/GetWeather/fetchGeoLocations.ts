import { GeoResponse } from "./types"

export async function fetchGeoLocations(place: string, apiKey: string, apiBase: string): Promise<GeoResponse[]> {
    const params = new URLSearchParams({ q: place, appid: apiKey, limit: "100" })
    const res = await fetch(`${apiBase}/geo/1.0/direct?${params.toString()}`)

    if (!res.ok) {
        throw new Error("Error fetching geo locations", { cause: res.status })
    }

    return res.json()
}
