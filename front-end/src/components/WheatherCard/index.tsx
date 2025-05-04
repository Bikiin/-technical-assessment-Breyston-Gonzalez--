import { GetWeatherResponse } from "@/actions/GetWeather/types"
import styles from "./style.module.css"

export default function WhetherCardComponent(props: GetWeatherResponse) {
    return (
        <div className={styles.weatherCard}>
            <h2>
                <img
                    src={`https://openweathermap.org/images/flags/${props.countryCode.toLowerCase()}.png`}
                    width={16}
                    height={11}
                    alt={"Ensign of " + props.countryCode}
                />
                {props.placeWeatherName}
            </h2>
            <div className={styles.weatherInfo}>
                <span><strong>🌡️ Temperature:</strong> {(props.temperature - 273.15).toFixed(2)}°C</span>
                <span><strong>💧 Humidity:</strong> {props.humidity}%</span>
                <span><strong>🌦️ Weather:</strong> {props.weather}</span>
            </div>
        </div>
    )
}