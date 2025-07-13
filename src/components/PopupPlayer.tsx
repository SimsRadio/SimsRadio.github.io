/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { css, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { IPlaytimeDuration } from '../models/DataModel';

interface IPopupPlayer {
  songName: string;
  artist: string;
  albumCover?: string;
  playtimeDuration?: IPlaytimeDuration;
  container?: HTMLHeadElement | null;
}

const PopupPlayer: React.FC<IPopupPlayer> = ({
  songName,
  artist,
  albumCover = 'mark/default.png',
  playtimeDuration,
  container,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [invertable, setInvertable] = useState(false);
  const songNameContainerRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    const el = songNameContainerRef.current;
    if (el) {
      const isOver = el.scrollWidth > el.clientWidth;
      setIsOverflowing(isOver);
    }
  };

  useEffect(() => {
    setInvertable((currentInvertable) => !currentInvertable);
    setIsOverflowing(false);
  }, [songName]);

  useEffect(() => {
    checkOverflow();
  }, [invertable]);

  const emotionCache = useMemo(() => {
    return container ? createCache({ key: 'popup', container }) : undefined;
  }, [container]);

  if (!emotionCache) return null;

  const songNameStyle = css`
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    padding-right: 4.8rem;
    flex-shrink: 0;
  `;

  return (
    <Fragment>
      <CacheProvider value={emotionCache}>
        <div
          id="coverAndPlayerContainer"
          css={css`
            display: flex;
            align-items: center;
            padding: 1rem;
            font-family: 'Poppins', sans-serif;
            color: white;
          `}
        >
          <img
            src={albumCover}
            alt="Song Cover"
            css={css`
              width: 150px;
              height: 150px;
              border-radius: 0.4rem;
              z-index: 1;
            `}
          />

          <div
            id="playerContainer"
            css={css`
              border-radius: 0.4rem;
              flex: 1;
              height: 150px;
              background-color: #222222;
              margin-left: 10px;
              padding-left: 20px;
              padding-right: 20px;

              display: flex;
              flex-direction: column;
              justify-content: center;
            `}
          >
            <div
              ref={songNameContainerRef}
              id="songNameContainer"
              css={css`
                position: relative;
                width: 100%;
                overflow: hidden;
                height: 2em;

                @keyframes scrollLeft {
                  0% {
                    transform: translateX(0%);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
              `}
            >
              <div
                id="songNameTrack"
                css={css`
                  position: absolute;
                  display: flex;
                  width: max-content;
                  ${isOverflowing &&
                  'animation: scrollLeft 10s linear infinite;'}
                `}
              >
                <h2 css={songNameStyle}>{songName}</h2>
                {isOverflowing && <h2 css={songNameStyle}>{songName}</h2>}
              </div>
            </div>
            <h3
              css={css`
                margin: 0;
                font-weight: normal;
                color: #ccc;
              `}
            >
              {artist}
            </h3>
            {playtimeDuration && (
              <progress
                css={css`
                  -webkit-appearance: none;
                  appearance: none;
                  display: block;
                  width: 100%;
                  margin-left: auto;
                  margin-right: auto;
                  margin-top: 10px;
                  border: none;
                  border-radius: 5px;
                  height: 10px;
                  transition: width 1s linear;
                  background-color: white;

                  &::-webkit-progress-bar {
                    background-color: white;
                    border-radius: 5px;
                    transition: width 1s linear;
                  }
                  &::-webkit-progress-value {
                    background-color: #00bc8c;
                    border-radius: 5px;
                    transition: width 1s linear;
                  }
                  &::-moz-progress-bar {
                    appearance: none;
                    background-color: #00bc8c;
                    border-radius: 5px;
                  }
                `}
                value={playtimeDuration.playtime}
                max={playtimeDuration.duration}
              />
            )}
          </div>
        </div>
      </CacheProvider>
    </Fragment>
  );
};

export default PopupPlayer;
