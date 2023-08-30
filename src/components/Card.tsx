import {useTranslations} from 'next-intl';

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

export default function Card({ weatherData }: CardProps) {
  const t = useTranslations('Weather');
  const weatherBackgroundImages: Record<WeatherDescription, string> = {
    'clear sky': 'ceulimpo.jpg',
    'few clouds': 'ceucomnuvens.jpg',
    'overcast clouds': 'nublado.jpg',
    'scattered clouds': 'nuvensdispersas.jpg',
    'broken clouds': 'nuvensquebradas.jpg',
    'shower rain': 'chuvaleve.jpg',
    'light rain': 'chuvaleve.jpg',
    'rain': 'chuva.jpg',
    'thunderstorm': 'tempestade.png',
    'snow': 'neve.jpg',
    'mist': 'nevoa.jpg',
  };

  const weatherDescription = (weatherData?.weather[0].description.toLowerCase() as WeatherDescription) || '';
  const backgroundImageUrl = weatherBackgroundImages[weatherDescription] || '';

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
            <p className="text-6xl text-black font-semibold mb-10">{Math.round(weatherData.main.temp)}°C</p>
            <div className="flex text-black mb-6">
              <p>{weatherData.main.humidity}% <p>{t('moisture')}</p></p>
              <p className="ml-6">{weatherData.wind.speed} km/h<p>{t('wind')}</p></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
