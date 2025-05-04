import { fetchGeoLocations } from "@/actions/GetWeather/fetchGeoLocations"
import { GeoResponse } from "@/actions/GetWeather/types"

global.fetch = jest.fn()

describe("fetchGeoLocations", () => {
    const mockPlace = "Panama"
    const mockApiKey = "test-api-key"
    const mockApiBase = "https://example.com"

    const mockResponse: GeoResponse[] = [
        {
            name: "Panama",
            lat: 8.9833,
            lon: -79.5167,
            country: "PA",
            state: "Panamá"
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("returns location data when the request is successful", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        })

        const result = await fetchGeoLocations(mockPlace, mockApiKey, mockApiBase)
        expect(fetch).toHaveBeenCalledWith(
            "https://example.com/geo/1.0/direct?q=Panama&appid=test-api-key&limit=100"
        )
        expect(result).toEqual(mockResponse)
    })

    it("throws an error when the response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404
        })

        await expect(
            fetchGeoLocations(mockPlace, mockApiKey, mockApiBase)
        ).rejects.toThrow("Error fetching geo locations")
    })
})
