import { useState, useEffect } from 'react';
import { FaCloud, FaSun, FaCloudRain, FaSnowflake, FaBolt } from 'react-icons/fa';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Check if we have cached data that's less than 2 hours old
        const cachedWeather = localStorage.getItem('klWeatherCache');
        const cachedTimestamp = localStorage.getItem('klWeatherTimestamp');
        
        if (cachedWeather && cachedTimestamp) {
          const cacheAge = Date.now() - parseInt(cachedTimestamp);
          const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          
          if (cacheAge < twoHours) {
            // Use cached data
            setWeather(JSON.parse(cachedWeather));
            setLoading(false);
            return;
          }
        }
        
        // Using Malaysian Government Weather API - specific query for Kuala Lumpur
        const response = await fetch('https://api.data.gov.my/weather/forecast?contains=Kuala%20Lumpur@location__location_name');
        
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }
        
        const data = await response.json();
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Find today's forecast, prioritize Town (Tn079) > District (Ds058) > State (St009)
        let klWeather = data.find(item => 
          item.date === today && item.location.location_id === 'Tn079'
        );
        
        if (!klWeather) {
          klWeather = data.find(item => 
            item.date === today && item.location.location_id === 'Ds058'
          );
        }
        
        if (!klWeather) {
          klWeather = data.find(item => 
            item.date === today && item.location.location_id === 'St009'
          );
        }
        
        // If no forecast for today, get the most recent available forecast
        if (!klWeather && data.length > 0) {
          // Sort by date descending and get the most recent
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          klWeather = data.find(item => item.location.location_id === 'Tn079') || 
                     data.find(item => item.location.location_id === 'Ds058') || 
                     data.find(item => item.location.location_id === 'St009') || 
                     data[0];
        }
        
        if (klWeather) {
          // Transform to consistent format using the correct API structure
          const weatherData = {
            location: klWeather.location.location_name,
            summary: klWeather.summary_forecast,
            temperature: {
              min: klWeather.min_temp,
              max: klWeather.max_temp
            },
            date: klWeather.date
          };
          
          // Cache the data
          localStorage.setItem('klWeatherCache', JSON.stringify(weatherData));
          localStorage.setItem('klWeatherTimestamp', Date.now().toString());
          
          setWeather(weatherData);
        } else {
          throw new Error('Kuala Lumpur weather data not found');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        
        // Try to use cached data even if expired
        const cachedWeather = localStorage.getItem('klWeatherCache');
        if (cachedWeather) {
          setWeather(JSON.parse(cachedWeather));
        } else {
          setError('Failed to fetch weather');
        }
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 2 hours to respect API limits
    const interval = setInterval(fetchWeather, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (summary) => {
    const lowerSummary = summary?.toLowerCase() || '';
    
    if (lowerSummary.includes('sunny') || lowerSummary.includes('clear')) {
      return <FaSun className="text-yellow-400" size={16} />;
    } else if (lowerSummary.includes('cloud') || lowerSummary.includes('overcast')) {
      return <FaCloud className="text-gray-300" size={16} />;
    } else if (lowerSummary.includes('rain') || lowerSummary.includes('shower')) {
      return <FaCloudRain className="text-blue-400" size={16} />;
    } else if (lowerSummary.includes('thunder') || lowerSummary.includes('storm')) {
      return <FaBolt className="text-yellow-300" size={16} />;
    } else {
      return <FaCloud className="text-gray-300" size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-16 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-600 rounded w-12 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <FaCloud className="text-gray-400 mx-auto mb-1" size={16} />
        <div className="text-xs text-gray-400">Weather unavailable</div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-xs text-gray-400 mb-1">
        {weather?.location || 'Kuala Lumpur'}
      </div>
      <div className="flex items-center justify-center gap-2 mb-1">
        {getWeatherIcon(weather?.summary)}
        <span className="text-sm font-semibold text-white">
          {weather?.temperature?.min}°-{weather?.temperature?.max}°C
        </span>
      </div>
      <div className="text-xs text-gray-300 capitalize leading-tight">
        {weather?.summary || 'Loading...'}
      </div>
    </div>
  );
}
