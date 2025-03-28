import WeatherCard from "../components/WeatherCard";

const Dashboard: React.FC = () => {
    const dummyWeather = {
        city: 'New York',
        temperatureC: 22,
        temperatureF: 72,
        description: 'Clear Sky',
        feelsLike: 21,
        humidity: 55,
        pressure: 1015,
        windSpeed: 3,
        iconUrl: 'https://openweathermap.org/img/wn/01d.png'
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <WeatherCard {...dummyWeather} />
        </div>
    )
}

export default Dashboard;