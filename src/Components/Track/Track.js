import React from 'react';
import './Track.css';

class Track extends React.Component {
  // renderAction() {
  //   Create a method called renderAction that displays a - anchor tag if the
  //   isRemoval property is true, and a + anchor tag if the isRemoval property
  //    is false. Set the class name to Track-action.
  // }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}|{this.props.track.album}</p>
        </div>
        <a className="Track-action">+</a>
      </div>
    );
  }
}

export default Track;
