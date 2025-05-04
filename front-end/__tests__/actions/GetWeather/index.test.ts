import { getWeather } from "@/actions/GetWeather"
import { fetchGeoLocations } from "@/actions/GetWeather/fetchGeoLocations"
import { fetchWeatherData } from "@/actions/GetWeather/fetchWeather"
import { findLocationByCountryCode, formatLocationName } from "@/actions/GetWeather/helpers"

jest.mock("@/actions/GetWeather/fetchGeoLocations")
jest.mock("@/actions/GetWeather/fetchWeather")
jest.mock("@/actions/GetWeather/helpers")

describe("getWeather", () => {
    const mockLocations = [
        {
            name: "Panama",
            lat: 8.9833,
            lon: -79.5167,
            country: "PA",
            state: "Panamá"
        }
    ]

    const mockWeatherData = [
        {
            name: "Panama City",
            main: {
                temp: 303.09,
                humidity: 75,
                feels_like: 309.29,
                temp_min: 302.6,
                temp_max: 303.17
            },
            weather: [
                {
                    description: "light rain"
                }
            ],
            sys: {
                country: "PA"
            }
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
        process.env.API_BASE = "https://api.example.com"
        process.env.API_KEY = "test-key"
    })

    it("returns formatted weather data", async () => {
        (fetchGeoLocations as jest.Mock).mockResolvedValueOnce(mockLocations);
        (fetchWeatherData as jest.Mock).mockResolvedValueOnce(mockWeatherData);
        (findLocationByCountryCode as jest.Mock).mockReturnValue(mockLocations[0]);
        (formatLocationName as jest.Mock).mockReturnValue("Panama, Panamá, PA (Panama City)");


        const result = await getWeather("Panama")

        expect(fetchGeoLocations).toHaveBeenCalledWith("Panama", "test-key", "https://api.example.com")
        expect(fetchWeatherData).toHaveBeenCalledWith(mockLocations, "test-key", "https://api.example.com")
        expect(findLocationByCountryCode).toHaveBeenCalledWith("PA", mockLocations)
        expect(formatLocationName).toHaveBeenCalled()

        expect(result).toEqual([
            {
                countryCode: "PA",
                placeWeatherName: "Panama, Panamá, PA (Panama City)",
                temperature: 303.09,
                humidity: 75,
                weather: "light rain"
            }
        ])
    })
})
