/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { padStart } from 'lodash-es';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IPlayingState } from '../models/Player';
import { useAtom } from 'jotai';
import { useEvent } from 'react-use';
import { emptyPlaytimeDuration, isPlayingAtom } from '../state/player';

import PopupPlayer from './PopupPlayer';

interface IMusicPlayerProps {
  playingState: IPlayingState;
  setCurrentQueueSong: (num: number) => void;
}

export const MusicPlayer: React.FC<IMusicPlayerProps> = (props) => {
  const player = useRef<ReactPlayer>(null);
  const { playingState, setCurrentQueueSong } = props;
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [playtimeDuration, setPlaytimeDuration] = useState(
    emptyPlaytimeDuration
  );
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [duration, setDuration] = useState<number>(1);

  const togglePopup = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
      setPopupWindow(null);
      setPopupContainer(null);
    } else {
      const newWindow = window.open('', '', 'width=600,height=300');
      if (!newWindow) return;

      const container = newWindow.document.createElement('div');
      newWindow.document.body.style.backgroundColor = '#FF00FF';

      newWindow.document.body.appendChild(container);
      newWindow.document.title = 'SimsRadio - Now Playing';

      setPopupWindow(newWindow);
      setPopupContainer(container);
    }
  };

  // handle closing popup when switching to a different page wihtin the app
  useEffect(() => {
    return () => {
      if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
      }
    };
  }, [popupWindow]);

  // handle closing popup when the parent window is closed/off the app
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [popupWindow]);

  useEvent('pausevideo', () => {
    setIsPlaying(false);
  });

  const onPreviousQueueSong: () => void = () => {
    if (playingState.currentQueueSong < 1) return;
    setCurrentQueueSong(playingState.currentQueueSong - 1);
  };

  const onNextQueueSong: () => void = () => {
    if (playingState.currentQueueSong === playingState.currentQueue.length - 1)
      return;
    setCurrentQueueSong(playingState.currentQueueSong + 1);
  };

  // Cleanup when window is closed
  useEffect(() => {
    if (!popupWindow) return;

    const timer = setInterval(() => {
      if (popupWindow.closed) {
        setPopupWindow(null);
        setPopupContainer(null);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [popupWindow]);

  return (
    <div>
      <ReactPlayer
        onDuration={setDuration}
        onProgress={(state) => {
          setPlaytimeDuration({
            playtime: Math.ceil(state.playedSeconds),
            duration: duration,
          });
        }}
        css={css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100vw;
        `}
        ref={player}
        url={`https://youtu.be/${playingState.currentSong}`}
        playing={isPlaying}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(): void => {
          if (player.current !== null) {
            if (!playingState.currentQueue.length) {
              player.current.seekTo(0);
            } else {
              let newVal;
              if (
                playingState.currentQueueSong ===
                playingState.currentQueue.length - 1
              ) {
                if (playingState.repeatQueue) {
                  newVal = 0;
                } else {
                  return;
                }
              } else {
                newVal = playingState.currentQueueSong + 1;
              }
              setCurrentQueueSong(newVal);
            }
          }
        }}
      />
      {playingState.currentQueue.length > 0 && (
        <div
          className="text-center"
          css={css`
            margin-top: 5px;
          `}
        >
          <ButtonGroup size="sm">
            <Button
              variant="outline-primary"
              onClick={onPreviousQueueSong}
              disabled={playingState.currentQueueSong === 0}
            >
              <i className="fa fa-step-backward"></i>
            </Button>
            <span
              css={css`
                background-color: #343a40;
                border-color: #343a40;
                color: white;
                padding: 0.25rem 0.5rem;
                font-size: 0.875rem;
                line-height: 1.5;
                border: 1px solid transparent;
                margin-left: -1px;
              `}
            >{`${padStart(
              (playingState.currentQueueSong + 1).toString(),
              playingState.currentQueue.length.toString().length,
              '0'
            )} | ${playingState.currentQueue.length}`}</span>
            <Button
              variant="outline-primary"
              onClick={onNextQueueSong}
              disabled={
                playingState.currentQueueSong + 1 ===
                playingState.currentQueue.length
              }
            >
              <i className="fa fa-step-forward"></i>
            </Button>
          </ButtonGroup>
        </div>
      )}
      <Button
        variant={popupWindow && !popupWindow.closed ? 'danger' : 'info'}
        size="sm"
        onClick={togglePopup}
        css={css`
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10px;
        `}
      >
        {popupWindow && !popupWindow.closed
          ? 'Close pop-out'
          : 'Pop out current song'}
      </Button>

      {popupContainer &&
        ReactDOM.createPortal(
          <PopupPlayer
            songName={playingState.popupData?.trackName ?? 'song name'}
            artist={playingState.popupData?.artist ?? 'album name'}
            albumCover={
              playingState.popupData?.albumCover
                ? `${window.location.origin}/album/${playingState.popupData?.albumCover}`
                : `${window.location.origin}/mark/default.png`
            }
            playtimeDuration={playtimeDuration}
            container={popupWindow?.document.head ?? null}
          />,
          popupContainer
        )}
    </div>
  );
};
