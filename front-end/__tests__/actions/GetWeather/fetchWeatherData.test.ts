import { fetchWeatherData } from "@/actions/GetWeather/fetchWeather"
import { GeoResponse, WeatherResponse } from "@/actions/GetWeather/types"

global.fetch = jest.fn()

describe("fetchWeatherData", () => {
    const mockApiKey = "test-api-key"
    const mockApiBase = "https://example.com"

    const mockLocations: GeoResponse[] = [
        {
            name: "Panama",
            lat: 8.9833,
            lon: -79.5167,
            country: "PA",
            state: "Panamá"
        }
    ]

    const mockWeather: WeatherResponse = {
        name: "Panama",
        main: {
            temp: 303.09,
            humidity: 75
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

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("returns weather data for fulfilled requests", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockWeather
        })

        const result = await fetchWeatherData(mockLocations, mockApiKey, mockApiBase)

        expect(fetch).toHaveBeenCalledWith(
            "https://example.com/data/2.5/weather?appid=test-api-key&lat=8.9833&lon=-79.5167"
        )
        expect(result).toEqual([mockWeather])
    })

    it("ignores rejected requests and only returns fulfilled ones", async () => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error("Network error"))
        )

        const result = await fetchWeatherData(mockLocations, mockApiKey, mockApiBase)

        expect(result).toEqual([])
    })

    it("ignores non-ok responses", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500
        })

        const result = await fetchWeatherData(mockLocations, mockApiKey, mockApiBase)

        expect(result).toEqual([])
    })
})
