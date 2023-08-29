const saveLocationToLocalStorage = (latitude: number, longitude: number): void => {
  localStorage.setItem('latitude', latitude.toString());
  localStorage.setItem('longitude', longitude.toString());
};

const getLocationFromLocalStorage = (): { latitude: string | null, longitude: string | null } => {
  const latitude = localStorage.getItem('latitude');
  const longitude = localStorage.getItem('longitude');
  return { latitude, longitude };
};

const getCurrentLocation = (): Promise<{ latitude: number, longitude: number }> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function(error) {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation not available'));
    }
  });
};

export { saveLocationToLocalStorage, getLocationFromLocalStorage, getCurrentLocation };
