import {API_BASE} from '@env';

export const getSubscriptionPlans = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/subscriptions`;
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

export const submitAlbum = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/submit-album`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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

export const getAppSettings = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/app-settings`;
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

export const checkSubscription = ({token}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/check-subscription`;
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
