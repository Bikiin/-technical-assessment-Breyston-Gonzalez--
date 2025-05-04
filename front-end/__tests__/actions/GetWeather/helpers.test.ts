import { findLocationByCountryCode, formatLocationName } from "@/actions/GetWeather/helpers"
import { GeoResponse } from "@/actions/GetWeather/types"

describe("findLocationByCountryCode", () => {
    const locations: GeoResponse[] = [
        {
            name: "Panama",
            lat: 8.9833,
            lon: -79.5167,
            country: "PA",
            state: "Panamá"
        },
        {
            name: "New York",
            lat: 40.7128,
            lon: -74.006,
            country: "US",
            state: "NY"
        }
    ]

    it("returns the correct location matching the country code", () => {
        const result = findLocationByCountryCode("US", locations)
        expect(result.name).toBe("New York")
    })
})

describe("formatLocationName", () => {
    it("returns formatted location with name, state, and country", () => {
        const location: GeoResponse = {
            name: "Panama",
            lat: 0,
            lon: 0,
            country: "PA",
            state: "Panamá"
        }
        const result = formatLocationName(location, "Panama City")
        expect(result).toBe("Panama, Panamá, PA (Panama City)")
    })

    it("handles missing name or state gracefully", () => {
        const location: GeoResponse = {
            name: "",
            lat: 0,
            lon: 0,
            country: "MX",
            state: ""
        }
        const result = formatLocationName(location, "Mexico City")
        expect(result).toBe("MX (Mexico City)")
    })
})
