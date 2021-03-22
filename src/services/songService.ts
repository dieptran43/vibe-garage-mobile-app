import {API_BASE} from '@env';

export const getNewReleases = (newReleasesPageNo: Number) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/new-releases?page=${newReleasesPageNo}`;
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

export const getTopSongs = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/top-songs`;
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

export const getSongsByGenre = (genre: Number) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/songs-by-genre/${genre}`;
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

export const getBestNewReleases = (bestNewReleasesPageNo: Number) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/top-songs?page=${bestNewReleasesPageNo}`;
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

export const getLatestMusic = (latestMusicPageNo: Number) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/new-releases?page=${latestMusicPageNo}`;
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

export const getRecentlyPlayed = (token?: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/recently-played`;
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

export const getTopSongsThisWeek = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/top-songs-this-week`;
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

export const getRecommendedSongs = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/recommended`;
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

export const getFavourites = (token: String) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/favourites`;
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

export const submitSong = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/submit-song`;
    fetch(url, {
      method:"POST",
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

export const getSpotlight = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/spotlight`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
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
