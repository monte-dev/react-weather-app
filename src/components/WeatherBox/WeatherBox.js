import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
const WeatherBox = (props) => {
	const API_KEY = '61181c3bd64ee97f041e27773f39b4bf';
	const [weather, setWeather] = useState({});
	const handleCityChange = useCallback((cityName) => {
		console.log(cityName);
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const weatherData = {
					city: data.name,
					temp: data.main.temp,
					icon: data.weather[0].icon,
					description: data.weather[0].main,
				};
				setWeather(weatherData);
			});
	}, []);
	console.log(weather);
	return (
		<section>
			<PickCity handleCityChange={handleCityChange} />
			<WeatherSummary {...weather} />
			<Loader />
		</section>
	);
};

export default WeatherBox;
