import {API_BASE} from '@env';
import {
  ILogin,
  IRegistration,
  IActivateAccount,
  IToken,
} from '../types/interfaces';

export const login = (payload: ILogin) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/login`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const register = (payload: IRegistration) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/register`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const activateAccount = (payload: IActivateAccount) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/activate`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const authUser = ({token}: IToken) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/auth-user`;
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

export const refreshToken = ({token}: IToken) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/refresh-token`;
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

export const logOut = ({token}: IToken) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/logout`;
    fetch(url, {
      method: 'POST',
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

export const resendCode = ({token}: IToken) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/resend-code`;
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

export const socialLogin = (payload: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/social-login`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const sendPasswordResetCode = (payload: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/send-password-reset-code`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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

export const changePassword = (payload: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/change-password`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
