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

export const addToPlaylist = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/add-to-playlist`;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const createPlaylist = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/create-playlist`;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
