import { renderHook, act } from '@testing-library/react';
import useVideoPlayer from './useVideoPlayer';
import React from 'react';

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

const video: VideoRef = {
  requestFullscreen: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(),
  currentTime: 50,
  duration: 100,
};

const userClickedElement: UserClickedElement = {
  target: {
    value: 20,
  }
};

const ref: React.MutableRefObject<VideoRef | null> = { current: video};

describe('Hook: useVideoPlayer', () => {
  it('should set isPlaying to true when invoke togglePlay', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.playerState.isPlaying).toBe(true);
  });

  it('should set Video duration to result when invoke setVideoDuration', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    act(() => {
      result.current.setVideoDuration(50);
    });

    expect(result.current.playerState.duration).toBe('00:00:50');
  });

  it('should invoke full screen when user request full screen', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );
    if (ref.current) {
      ref.current.requestFullscreen = jest.fn();
    }

    act(() => {
      result.current.toggleFullScreen();
    });

    expect(ref?.current?.requestFullscreen).toBeCalled();
  });

  it('should update duration while video is playing', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 60;
      ref.current.duration = 120;
    }

    act(() => {
      result.current.handleOnTimeUpdate();
    });

    expect(result.current.playerState.duration).toBe('00:01:00');
  });

  it('should stop playing if video ended', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 120;
      ref.current.duration = 120;
    }

    act(() => {
      result.current.handleOnTimeUpdate();
    });

    expect(result.current.playerState.isPlaying).toBe(false);
    expect(result.current.playerState.progress).toBe(100);
  });

  it('should update video progress when user click on progress bar', () => {
    const { result } = renderHook(() =>
      useVideoPlayer(ref),
    );

    if (ref.current) {
      ref.current.currentTime = 120;
      ref.current.duration = 120;
    }

    act(() => {
      result.current.handleVideoProgress(userClickedElement);
    });

    expect(result.current.playerState.progress).toBe(20);
    expect(ref.current?.currentTime).toBe(24);
  });
});
