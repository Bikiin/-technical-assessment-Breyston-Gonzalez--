import { GeoResponse } from "./types"

export const findLocationByCountryCode = (
    countryCode: string,
    locations: GeoResponse[]
): GeoResponse => {
    return locations.find(({ country }) => country === countryCode)!
}

export const formatLocationName = (
    location: GeoResponse,
    weatherLocation: string
): string => {
    return (
        (location?.name ? location?.name + ", " : "") +
        (location?.state ? location?.state + ", " : "") +
        (location?.country ? location?.country : "") +
        " (" + weatherLocation + ")"
    )
}
