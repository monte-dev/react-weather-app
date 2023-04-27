import PickCity from '../PickCity/PickCity';
import ErrorBox from '../ErrorBox/ErrorBox';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
const WeatherBox = (props) => {
	const API_KEY = '61181c3bd64ee97f041e27773f39b4bf';
	const [weather, setWeather] = useState('');
	const [pending, setPending] = useState(false);
	const [dataError, setDataError] = useState(false);

	const handleCityChange = useCallback((cityName) => {
		setPending(true);
		setDataError(false);
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
		).then((res) => {
			if (res.status === 200) {
				return res.json().then((data) => {
					const weatherData = {
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					};
					setPending(false);
					setWeather(weatherData);
				});
			} else {
				setWeather('');
				setPending(false);
				setDataError(true);
			}
		});
	}, []);

	return (
		<section>
			<PickCity handleCityChange={handleCityChange} />
			{weather && !pending && <WeatherSummary {...weather} />}
			{pending && <Loader />}
			{dataError && <ErrorBox children="There is no such city" />}
		</section>
	);
};

export default WeatherBox;
