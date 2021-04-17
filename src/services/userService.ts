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
