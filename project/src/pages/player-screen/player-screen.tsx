import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import { getFilm } from '../../store/film-process/selectors';
import './player-screen.css';

function PlayerScreen(): JSX.Element {
  const film = useAppSelector(getFilm);
  const navigate = useNavigate();
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    toggleFullScreen,
    handleVideoProgress,
    setVideoDuration,
  } = useVideoPlayer(videoElement);

  const onExitButtonClickHandler = () => {
    const path = `/films/${film?.id}`;
    navigate(path);
  };

  return (
    <div className="player">
      <video
        ref={videoElement}
        src={film?.previewVideoLink}
        className="player__video"
        poster={film?.previewImage}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedData={() => {
          if (videoElement.current?.duration !== undefined) {
            setVideoDuration(videoElement.current?.duration);
          }
        }}
      >
      </video>

      <button type="button" className="player__exit" onClick={onExitButtonClickHandler}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <input
              className="player__toggle"
              type="range"
              min="0"
              max="100"
              value={playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
            />
            <progress className="player__progress" max="100" value={playerState.progress}></progress>
          </div>
          <div className="player__time-value">{playerState.duration}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={playerState.isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
