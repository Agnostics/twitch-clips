import React from 'react';
import Clappr from 'clappr';

class ClapprPlayer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /* eslint-disable react/no-string-refs */
  componentDidMount() {
    this.change(this.props.source);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const changed = (nextProps.source !== this.props.source);
    this.props = nextProps;
    this.state = nextState;
    if (changed) {
      this.change(nextProps.source);
    }
    return false;
  }


  componentWillUnmount() {
    this.destroyPlayer();
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  change(source) {
    if (this.player) {
      this.destroyPlayer();
    }

    this.player = new Clappr.Player({
      parent: this.refs.player,
      source,
      poster: this.props.poster,
      width: '100%',
      height: '100%',
      autoPlay: true,
    });
  }
  render() {
    return (
      <div>
        <div ref="player"></div>
      </div>
    );
  }
}

ClapprPlayer.propTypes = {
  source: React.PropTypes.string,
  poster: React.PropTypes.string,
};

export default ClapprPlayer;
