import {API_BASE} from '@env';

export const getDashboard = (token: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/dashboard`;
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

export const requestWithdrawal = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/request-withdrawal`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
