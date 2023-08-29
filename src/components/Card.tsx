import React from 'react';

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

type WeatherDescription = 'clear sky' | 'few clouds' | 'scattered clouds' | 'broken clouds' | 'shower rain' | 'rain' | 'thunderstorm' | 'snow' | 'mist';

export default function Card({ weatherData }: CardProps) {
  const weatherBackgroundImages: Record<WeatherDescription, string> = {
    'clear sky': 'ceulimpo.jpg',
    'few clouds': 'ceucomnuvens.jpg',
    'scattered clouds': 'nuvensdispersas.jpg',
    'broken clouds': 'nuvensquebradas.jpg',
    'shower rain': 'chuvaleve.jpg',
    'rain': 'chuva.jpg',
    'thunderstorm': 'tempestade.png',
    'snow': 'neve.jpg',
    'mist': 'nevoa.jpg',
  };

  const weatherDescription = weatherData?.weather[0].description.toLowerCase() as WeatherDescription;
  const backgroundImageUrl = weatherBackgroundImages[weatherDescription] || '';

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-4/5 bg-white p-6 rounded-lg shadow-md"
        style={{
          height: '80vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {weatherData && (
          <div className="text-center flex flex-col justify-center items-center h-full">
            <p className="text-black mb-10">{weatherData.name}</p>
            <p className="text-3xl text-black font-semibold mb-10">{weatherData.main.temp}°C</p>
            <p className="text-black mb-6">Umidade: {weatherData.main.humidity}%</p>
            <p className="text-black">Vento: {weatherData.wind.speed}km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}
