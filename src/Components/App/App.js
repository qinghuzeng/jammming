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
      const savedPlaylist = this.state.playlistTracks.slice();
      savedPlaylist.push(track);
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
    if (this.state.playlistName.length <= 0) {
      alert("No playlist name assigned!");
      return;
    }
    if (this.state.playlistTracks.length <= 0) {
      alert("No track was added!");
      return;
    }
    const trackURIs = this.state.playlistTracks.map(track =>{
      return track.uri;
    });
    
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      }
    ); 
  }

  search(term) {
    if(term === '') {
      return;
    }
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  onPreviewStatusChange(status) {

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} onStatusChange={this.onPreviewStatusChange}/>
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