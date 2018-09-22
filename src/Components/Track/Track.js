import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.showPreviewUrl = this.showPreviewUrl.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  showPreviewUrl() {
    if(this.props.track.previewUrl === null) {
      return;
    }
    if(this.props.isSearchResult) {
      return (
        <div>
          <audio src={this.props.track.previewUrl} controls="controls">
            Your browser does not support the audio element.
          </audio>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}|{this.props.track.album}</p>
        </div>
          {this.showPreviewUrl()}
          {this.renderAction()}
      </div>
    );
  }
}

export default Track;
