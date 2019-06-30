import React from 'react';
import WeatherModel from '../shared/models/Weather';

import './Weather.css';

type WeatherProps = {
  weather?: WeatherModel
}

const Weather: React.FC<WeatherProps> = ({weather}) => {
  if (!weather) {
    return null;
  }

  return (
    <div className="weather">
      <h2>{weather.name}</h2>
      <dl>
        <dt>Weather</dt>
        <dd>
          {weather.weather[0].main}
          <small>({weather.weather[0].description})</small>
        </dd>
        <dt>Tempereture(Max/Min)</dt>
        <dd>
          {weather.main.temp_max}℃ / {weather.main.temp_min}℃
        </dd>
      </dl>
    </div>
  )
}

export default Weather;
