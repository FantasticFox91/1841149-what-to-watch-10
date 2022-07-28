import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Film } from '../../types/films';

type VideoPlayerProps = {
  film: Film;
  index: number;
}

function VideoPlayer({film, index}: VideoPlayerProps): JSX.Element | null {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVisible = useAppSelector((state) => index < state.renderedFilmCount);

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


  if (isVisible) {
    return (
      <article className="small-film-card catalog__films-card"
        onMouseOver={() => {
          setIsPlaying(true);
        }}
        onMouseOut={() => {
          setIsPlaying(false);
        }}
      >
        <Link to={`/films/${film.id}`} title={`/films/${film.id}`} className="small-film-card__link">
          <video height="175" ref={videoRef} src={film.previewVideoLink} muted poster={film.previewImage}/>
          <h3 className="small-film-card__title">
            {film.name}
          </h3>
        </Link>
      </article>
    );
  }
  return null;
}

export default VideoPlayer;

