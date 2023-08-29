const saveLocationToLocalStorage = (lat: number, lng: number): void => {
  localStorage.setItem('latitude', lat.toString());
  localStorage.setItem('longitude', lng.toString());
};

const getLocationFromLocalStorage = () => {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');
  return { latitude, longitude };
};

const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          }
        );
      } else {
        reject(new Error('Geolocation not available'));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { saveLocationToLocalStorage, getLocationFromLocalStorage, getCurrentLocation };
