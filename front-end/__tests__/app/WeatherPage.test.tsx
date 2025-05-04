import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import WeatherPage from "@/app/page"
import * as weatherModule from "@/actions/GetWeather"
import React from "react"

jest.mock("@/actions/GetWeather", () => ({
    getWeather: jest.fn()
}))

const mockedWeather = [
    {
        countryCode: "US",
        placeWeatherName: "New York, NY, US (New York)",
        temperature: 300,
        humidity: 73,
        weather: "thunderstorm"
    }
]

describe("WeatherPage", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Displays the weather results after a successful search", async () => {
        (weatherModule.getWeather as jest.Mock).mockResolvedValueOnce(mockedWeather)

        render(<WeatherPage />)

        const input = screen.getByPlaceholderText(/New York/i)
        const button = screen.getByRole("button", { name: /Search/i })

        fireEvent.change(input, { target: { value: "New York" } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText(/New York, NY, US/i)).toBeInTheDocument()
            expect(screen.getByText(/26.85°C/i)).toBeInTheDocument()
            expect(screen.getByText(/73%/i)).toBeInTheDocument()
            expect(screen.getByText(/thunderstorm/i)).toBeInTheDocument()
        })
    })

    it("Displays an error message when an invalid city is entered", async () => {
        ; (weatherModule.getWeather as jest.Mock).mockRejectedValueOnce(new Error("Not Found"))

        render(<WeatherPage />)

        const input = screen.getByPlaceholderText(/New York/i)
        const button = screen.getByRole("button", { name: /Search/i })

        fireEvent.change(input, { target: { value: "asdfghjkl" } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText(/The place you were looking for was not found, try a different one/i)).toBeInTheDocument()
        })
    })

    it("Input field and button work correctly.", async () => {
        render(<WeatherPage />)

        const input = screen.getByPlaceholderText(/New York/i)
        const button = screen.getByRole("button", { name: /Search/i })

        fireEvent.change(input, { target: { value: "Panama" } })
        expect(input).toHaveValue("Panama")

        fireEvent.click(button)

        await waitFor(() => {
            expect(weatherModule.getWeather).toHaveBeenCalledWith("Panama")
        })
    })
})
