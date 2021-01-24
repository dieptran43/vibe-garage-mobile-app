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
