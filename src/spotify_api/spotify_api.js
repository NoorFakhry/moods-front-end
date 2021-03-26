// get access token for the very first time from the hash url
const getHashParams = () => {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const tokenFromHash = getHashParams();
if(tokenFromHash.accessToken) {
  // if there is a token store it in the local storage
  localStorage.setItem('token', tokenFromHash.accessToken);
};
let accessToken = localStorage.getItem('token');
const localHostUrl = 'http://localhost:8888/newAccessToken';
const liveHostUrl = 'https://moods-music.glitch.me/newAccessToken';

// generate new access token and store it in locl storage
const generateNewAccessToken = () => {
  fetch(liveHostUrl)
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('token', data.accessToken);
      accessToken = localStorage.getItem('token');
    });
};

// renew new access token each 30 minutes
const generateNewAccessTokenEveryFiveinutes = (() => {
  const waitForFiveMinutes = 300000;
  setInterval(() => {
      generateNewAccessToken();
  }, waitForFiveMinutes);
})();

// functions that get data from spotify
// ====================================

// create async function that returns the search results for the user
export const getSearchResults = async (input) => {
  const url = `https://api.spotify.com/v1/search?q=${input}&type=album%2Cartist%2Ctrack%2Cplaylist&limit=50&offset=0`;
    const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data;
};

// create async function that returns any album tracks if the user press on certain album
export const getTracksForCertainAlbum = async (albumId) => {
  const albumUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50&offset=0`;
    const response = await fetch(albumUrl,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    } );
    const tracksForThisAlbum = await response.json();
    tracksForThisAlbum.id = albumId;
    return tracksForThisAlbum;
};

// create async function that returns albums new releases 
export const getNewAlbumsReleases = async () => {
  const url = 'https://api.spotify.com/v1/browse/new-releases?limit=50&offset=5';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.albums.items;
};