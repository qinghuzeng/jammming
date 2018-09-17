import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

// <!-- You will add a map method that renders a set of Track components  -->
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
          return <Track track={track} key={track.id} />
        })
      }  
      </div>
    );
  }
}

export default TrackList;
