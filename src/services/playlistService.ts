import {API_BASE} from '@env';

export const getRecentlyPublicPlaylist = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/public-playlist`;
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

export const getMyPlaylist = (token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/my-playlist`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
