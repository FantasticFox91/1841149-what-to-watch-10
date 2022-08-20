import dayjs from 'dayjs';
import { useState, useEffect, ChangeEvent } from 'react';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

type VideoRef = {
  requestFullscreen: () => void;
  pause: () => void;
  play: () => void;
  currentTime: number;
  duration: number;
}

type UserClickedElement = {
  target: {
    value: number;
  }
}

const useVideoPlayer = (videoPlayer: React.MutableRefObject<HTMLVideoElement | null | VideoRef>) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    duration: '',
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const toggleFullScreen = () => {
    videoPlayer.current?.requestFullscreen();
  };

  const setVideoDuration = (filmDuration: number) =>
    setPlayerState({
      ...playerState,
      duration: dayjs.duration(filmDuration, 'seconds').format('HH:mm:ss'),
    });


  useEffect(() => {
    playerState.isPlaying
      ? videoPlayer?.current?.play()
      : videoPlayer?.current?.pause();
  }, [playerState.isPlaying, videoPlayer]);

  const handleOnTimeUpdate = () => {
    if (videoPlayer.current !== null) {
      const progress = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
      const timeLeft = Number(videoPlayer.current?.duration) - Number(videoPlayer.current.currentTime);
      if (progress !== 100) {
        return setPlayerState({
          ...playerState,
          progress,
          duration: dayjs.duration(timeLeft, 'seconds').format('HH:mm:ss'),
        });
      }
      setPlayerState({
        ...playerState,
        progress: 100,
        isPlaying: false
      });
    }
  };

  const handleVideoProgress = (event: ChangeEvent<HTMLInputElement> | UserClickedElement) => {
    const a = event.target as HTMLInputElement | null;
    if (videoPlayer.current !== null && a !== null) {
      const manualChange = Number(a.value);
      videoPlayer.current.currentTime = (videoPlayer.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    }
  };

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    toggleFullScreen,
    handleVideoProgress,
    setVideoDuration,
  };
};

export default useVideoPlayer;
