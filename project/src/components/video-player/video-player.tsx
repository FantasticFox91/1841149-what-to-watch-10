import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/films';

type VideoPlayerProps = {
  film: Film;
}

function VideoPlayer({film}: VideoPlayerProps): JSX.Element | null {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();
  }, [isPlaying]);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={() => {
        setIsPlaying(true);
      }}
      onMouseOut={() => {
        setIsPlaying(false);
      }}
      data-testid='videoWrapper'
    >
      <Link to={`/films/${film.id}`} title={`/films/${film.id}`} className="small-film-card__link">
        <video height="175" ref={videoRef} src={film.previewVideoLink} muted poster={film.previewImage} data-testid='video'/>
        <h3 className="small-film-card__title">
          {film.name}
        </h3>
      </Link>
    </article>
  );
}

export default memo(VideoPlayer);

