import { render, screen } from "@testing-library/react"
import RootLayout from "@/app/layout"

jest.mock('next/font/google', () => ({
    Geist: () => ({ variable: '--font-geist-sans' }),
    Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}))

describe("RootLayout", () => {

    it("renders children", () => {
        render(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>,
            { container: document }
        )

        expect(screen.getByText("Test Content")).toBeInTheDocument()
    })

})