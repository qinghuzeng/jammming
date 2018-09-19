import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from './../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New Playlist',
      playlistTracks: [],
      // searchResults:[
      //   {name: "Dahai2", artist: "ZYS21", album: "Dahai2", id: "11"},
      //   {name: "Dahai2", artist: "ZYS22", album: "Dahai2", id: "22"},
      //   {name: "Dahai2", artist: "ZYS23", album: "Dahai2", id: "32"},
      //   {name: "Dahai2", artist: "ZYS24", album: "Dahai2", id: "41"}
      // ]
      searchResults: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      const savedPlaylist = this.state.playlistTracks;
      console.log(savedPlaylist);
      savedPlaylist.push(track);
      console.log(savedPlaylist);
      this.setState({
        playlistTracks: savedPlaylist
      });
    }
  }

  removeTrack(track) {
    if (!this.state.playlistTracks.find(removedTrack => removedTrack.id === track.id)) {
      return;
    } else {
      const newPlaylist = this.state.playlistTracks.filter(newTrack => newTrack.id !== track.id);
      this.setState({
        playlistTracks: newPlaylist
      })
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track =>{
      return track.uri;
    });
    console.log(trackURIs);
    if (this.state.playlistName === '') {
      return;
    }
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term) {
    if(term === '') {
      return;
    }
    Spotify.search(term).then(searchResults => {
      console.log(searchResults);
      this.setState({
        searchResults: searchResults
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist playlistName={this.state.playlistName}
               playlistTracks={this.state.playlistTracks}
               onRemove={this.removeTrack}
               onNameChange={this.updatePlaylistName}
               onSave = {this.savePlaylist}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;