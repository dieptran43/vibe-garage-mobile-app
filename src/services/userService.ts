import {API_BASE} from '@env';

export const addCoins = ({params, token}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/add-coins`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const creditWallet = ({params, token}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/credit-wallet`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const subscribe = ({params, token}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/subscribe`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
