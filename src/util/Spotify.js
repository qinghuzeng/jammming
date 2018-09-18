let userToken = '';
const redirectURI = 'http://localhost:3000/';
const clientID = 'ee7e6fc116014a429124843dd1efad98';
const url = 'https://api.spotify.com/v1/search?type=track&q=';

const Spotify = {
  getAccessToken() {
    if(userToken) {
      return userToken;
    }

    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expirationTime = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expirationTime) {
      userToken = accessToken[1];
      const expiresIn = Number(expirationTime[1]);
      window.setTimeout(() => userToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },

  async search(term) {
    const accessToken = this.getAccessToken();
    const endPoint = `${url}${term}`;
    const header = {Authorization: `Bearer ${accessToken}`}
    try {
      const response = await fetch(endPoint, {headers: header});
      if(response.ok){
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        return jsonResponse.tracks.items.map(track => ({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
          uri: track.uri
        }));
        // {name: "Dahai2", artist: "ZYS21", album: "Dahai2", id: "11"},
      }
    } catch (error) {
      console.log(error);
    }

  },

  async savePlaylist(palylistName, trackURIs) {
    const accessToken = this.getAccessToken();
    const header = {'Authorization': 'Bearer ' + accessToken};
    let userID = '';
    let PlaylistID = '';
    const endPointGetID = 'https://api.spotify.com/v1/me';

    try { 
      const getID = await fetch(endPointGetID, {header: header});
      if (getID.ok) {
        const jsonGetID = getID.json();
        userID = jsonGetID.id;
      }
      const endPointUpdatePlaylistName = `https://api.spotify.com/v1/users/${userID}/playlists`
      const updatePlaylistName = await fetch(endPointUpdatePlaylistName, {
        method: 'POST',
        header: header,
        body: JSON.stringify({name: palylistName})
      });
      if (updatePlaylistName.ok) {
        PlaylistID = await updatePlaylistName.json().id;
      }
      const endPointUpdatePlaylist = `https://api.spotify.com/v1/playlists/${PlaylistID}/tracks`;
      const updatePlylist = await fetch(endPointUpdatePlaylist, {
        method: 'POST',
        header: header,
        body: JSON.stringify({uris: trackURIs})
      });
      if (updatePlylist.ok) {
        return await updatePlylist.json().id;
      }
    } catch (error) {
      console.log(error);
    }

  }


}

export default Spotify;
