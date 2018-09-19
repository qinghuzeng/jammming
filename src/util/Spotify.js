let userToken;
// const redirectURI = 'http://localhost:3000/';
const redirectURI = 'jammming_qinghu.surge.sh';
const clientID = 'ee7e6fc116014a429124843dd1efad98';

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

  // async search(term) {
  //   const url = 'https://api.spotify.com/v1/search?type=track&q=';
  //   let accessToken = this.getAccessToken();
  //   let endPoint = `${url}${term}`;
  //   let header = {Authorization: `Bearer ${accessToken}`}
  //   try {
  //     const response = await fetch(endPoint, {headers: header});
  //     if(response.ok){
  //       const jsonResponse = await response.json();
  //       if (jsonResponse.tracks.items) {
  //         return jsonResponse.tracks.items.map(track => ({
  //           name: track.name,
  //           artist: track.artists[0].name,
  //           album: track.album.name,
  //           id: track.id,
  //           uri: track.uri
  //         }));
  //       } else {
  //         return [];
  //       }
  //     } else {
  //       throw new Error("Search request failed!");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },

  //  Below code works as well
   search(term) {
    const url = 'https://api.spotify.com/v1/search?type=track&q=';
    let accessToken = this.getAccessToken();
    let endPoint = `${url}${term}`;
    let header = {Authorization: `Bearer ${accessToken}`}

    return (fetch(endPoint, {headers:header})).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(jsonResponse =>{
      if(jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track =>({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
          uri: track.uri          
        }));
      } else {
        return [];
      }
    })
  },

  async savePlaylist(palylistName, trackURIs) {
    const accessToken = this.getAccessToken();
    let header = {Authorization: `Bearer ${accessToken}`}
    // let userID;
    let playlistID;
    let userhref;
    const endPointGetID = 'https://api.spotify.com/v1/me';

    try { 
      const getID = await fetch(endPointGetID, {headers: header});
      if (getID.ok) {
        const jsonGetID = await getID.json();
        // userID = jsonGetID.id;
        userhref = jsonGetID.href;
      } else {
        throw new Error("User ID request failed!");
      }
      const endPointUpdatePlaylistName = `${userhref}/playlists`
      const updatePlaylistName = await fetch(endPointUpdatePlaylistName, {  
        method: 'POST',
        headers: header,
        body: JSON.stringify({name: palylistName})
      });
      if (updatePlaylistName.ok) {
        const jsonUpdatePlaylistName = await updatePlaylistName.json();
        playlistID = jsonUpdatePlaylistName.id;
      } else {
        throw new Error("Update playlist name failed!");
      }
      const endPointUpdatePlaylist = `${userhref}/playlists/${playlistID}/tracks`;
      const updatePlylist = await fetch(endPointUpdatePlaylist, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({uris: trackURIs})
      });
      if (updatePlylist.ok) {
        const jsonUpdatePlaylist = await updatePlylist.json();
        return jsonUpdatePlaylist.id;
      } else {
        throw new Error("Update track's URIs failed!");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default Spotify;
