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

export const getPurchases = (token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/my-purchases`;
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

export const getSongs = (token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/my-songs`;
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

export const getAlbums = (token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/my-albums`;
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

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/categories`;
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

export const getCarouselPlaylist = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/public-playlist-discovered`;
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

export const purchaseSong = (song_id: any, token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/purchase-song/${song_id}`;
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

export const purchaseAlbum = (album_id: any, token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/purchase-album/${album_id}`;
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
