"use client"

import { useState } from "react"
import styles from "./style.module.css"

interface SearchPlaceSection {
    searchWeatherOfplace: (place: string) => void
}

export default function SearchPlaceSection({ searchWeatherOfplace }: SearchPlaceSection) {

    const [place, setPlace] = useState("")

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (!place.length) return

        searchWeatherOfplace(place)
    }


    return (
        <form className={styles.ctas}>

            <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="New York" />

            <button className={styles.primary} onClick={handleClick}>Search</button>

        </form>
    )
}