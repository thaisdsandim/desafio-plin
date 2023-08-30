import { useTranslations } from 'next-intl';

interface WeatherData {
  weather: {
    description: string;
  }[];
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface CardProps {
  weatherData: WeatherData | null;
}

type WeatherDescription = 'clear sky' | 'few clouds' | 'overcast clouds' | 'scattered clouds' | 'broken clouds' | 'shower rain' | 'light rain' | 'rain' | 'thunderstorm' | 'snow' | 'mist';

function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export default function Card({ weatherData }: CardProps) {
  const t = useTranslations('Weather');
  
  const selectedLanguage = localStorage.getItem('selectedLanguage');

  const weatherBackgroundImages: Record<WeatherDescription, string> = {
    'clear sky': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/ceulimpo.jpg?raw=true',
    'few clouds': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/ceucomnuvens.jpg?raw=true',
    'overcast clouds': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/nublado.jpg?raw=true',
    'scattered clouds': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/nuvensdispersas.jpg?raw=true',
    'broken clouds': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/nuvensquebradas.jpg?raw=true',
    'shower rain': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/chuvaleve.jpg?raw=true',
    'light rain': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/chuvaleve.jpg?raw=true',
    'rain': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/chuva.jpg?raw=true',
    'thunderstorm': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/tempestade.png?raw=true',
    'snow': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/neve.jpg?raw=true',
    'mist': 'https://github.com/thaisdsandim/desafio-plin/blob/main/public/nevoa.jpg?raw=true',
  };

  const weatherDescription = (weatherData?.weather[0].description.toLowerCase() as WeatherDescription) || '';
  const backgroundImageUrl = weatherBackgroundImages[weatherDescription] || '';

  const temperatureCelsius = weatherData?.main.temp || 0;
  const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);

  let temperature: number;
  let temperatureUnit: string;

  if (selectedLanguage === 'pt' || selectedLanguage === 'es') {
    temperature = temperatureCelsius;
    temperatureUnit = '°C';
  } else {
    temperature = temperatureFahrenheit;
    temperatureUnit = '°F';
  }

  let windSpeed: number;
  let windUnit: string;

  if (selectedLanguage === 'pt' || selectedLanguage === 'es') {
    windSpeed = weatherData?.wind.speed || 0;
    windUnit = 'km/h';
  } else {
    const mphConversionFactor = 0.621371;
    windSpeed = (weatherData?.wind.speed || 0) * mphConversionFactor;
    windUnit = 'mph';
    windSpeed = parseFloat(windSpeed.toFixed(2));
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-full bg-white"
        style={{
          height: '100%',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {weatherData && (
          <div className="text-center flex flex-col justify-center items-center mt-40 mb-40">
            <p className="text-black">{weatherData.name}</p>
            <p className="text-6xl text-black font-semibold mb-10">
              {temperature}
              {temperatureUnit}
            </p>
            <div className="flex text-black mb-6">
              <p>{weatherData.main.humidity}% <p>{t('moisture')}</p></p>
              <p className="ml-6">
                {windSpeed}
                {windUnit}
                <p>{t('wind')}</p>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
