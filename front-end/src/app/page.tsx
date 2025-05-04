"use client"

import styles from "./page.module.css";

import WheatherCard from "@/components/WheatherCard";
import SearchPlaceSection from "@/components/SearchPlaceSection";

import { getWeather } from "@/actions/GetWeather";
import { useState } from "react";
import { GetWeatherResponse } from "@/actions/GetWeather/types";

export default function Home() {
    const [message, setMessage] = useState("")
    const [places, setPlaces] = useState<GetWeatherResponse[]>([])

    const searchWeatherOfplace = async (place: string) => {
        setMessage("Loading...")
        setPlaces([])

        try {
            const places = await getWeather(place);

            if (!places.length) {
                return setMessage("The place you were looking for was not found, try a different one.")
            }

            setPlaces(places)
        } catch (e) {
            return setMessage("The place you were looking for was not found, try a different one.")
        }

        setMessage("")
    }


    return (
        <div className={styles.page}>
            <main className={styles.main}>

                <h1>Look up the weather of a place</h1>

                <SearchPlaceSection searchWeatherOfplace={searchWeatherOfplace} />

                {message}

                {
                    places.map((place, index) => (
                        <WheatherCard {...place} key={place.placeWeatherName + index} />
                    ))
                }

            </main>
        </div>
    );
}
