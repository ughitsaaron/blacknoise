import React, { PureComponent } from 'react';

const audio = [
  { source: 'baby-crying.mp3', label: 'A baby crying' },
  { source: 'construction.mp3', label: 'Construction Noises!' },
  { source: 'garbage-truck.mp3', label: 'A garbage truck' },
  { source: 'car-alarm.mp3', label: 'A car alarm' },
  { source: 'fingernail-clipping.mp3', label: 'Fingernails being clipped' },
  { source: 'high-pitch.mp3', label: 'Just a loud high pitch' },
  { source: 'plastic.mp3', label: 'A plastic bottle being crunched' },
  { source: 'dog-barking.mp3', label: 'A dog barking' },
  { source: 'vomiting.mp3', label: 'Vomit' },
  { source: 'subway.mp3', label: 'The MTA' },
];

/**
 * presentational container for audio elements
 * @param {object} props
 * @returns {Component}
 */
function Audio(props) {
  const { audioRef, source, toggle, playing } = props;
  const name = source.source.split('.').shift();
  const isPlaying = playing ? 'playing' : '';

  return (
     <li className={['audio-container', name, isPlaying].join(' ')}>
      <audio ref={audioRef} loop src={`/assets/audio/${source.source}`} />
      <a onClick={toggle} title={source.title}><img src={`/assets/img/${name}.svg`} /></a>
     </li>
  );
}

/**
 * stateful container wrap for Audio element
 */
class AudioContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { playing: false };
  }

  render() {
    const { playing } = this.state;

    return <Audio
      playing={playing}
      toggle={onClick.bind(this)}
      audioRef={node => this.node = node}
      source={this.props.source} />;
  }
}

/**
 * @returns {Component}
 */
export default function Application() {
  return (
    <div>
      <header><img src='/assets/img/skull.png' /></header>
      <ul className='audio-container-list'>
        {audio.map((s, i) => <AudioContainer key={i} source={s} />)}
      </ul>
      <footer>
        <p>this dum project by <a href="https://twitter.com/ughitsaaron">aaron petcoff</a></p>
        <p className="footer-links">
          <a href="http://github.com/ughitsaaron/blacknoise">github</a> <span className="share-links">
            share to: <a href="https://www.facebook.com/sharer/sharer.php?u=https://blacknoise.herokuapp.com">facebook</a> <a href="https://twitter.com/intent/tweet?text=make%20awful%20noises%20https://blacknoise.herokuapp.com">twitter</a>
          </span>
        </p>
      </footer>
    </div>
  );
}

/**
 * event handler for audio click
 * @returns {undefined}
 */
function onClick() {
  const audio = this.node;

  audio.volume = 1.0; // ensure noises are loud as possible

  audio.paused ? audio.play() : audio.pause();
  this.setState({ playing: !audio.paused });
}
