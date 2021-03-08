import {API_BASE} from '@env';

export const storeAlbums = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/store/albums`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const storeSongs = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/store/songs`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const topSongs = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/store/top-songs`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
