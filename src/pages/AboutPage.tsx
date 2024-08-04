/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import GitHubButton from 'react-github-btn';

const AboutPage: React.FC = () => (
  <div>
    <div
      css={css`
        @media (min-width: 1024px) {
          margin-right: 33vw;
        }
      `}
    >
      <h2>About</h2>
      <p>
        This database catalogs radio music from various games in the "The Sims"
        series. It has been compiled and is being updated by SpiderInTheSim.
      </p>
      <h6>
        <b>Music Playback</b>
      </h6>
      <p>
        Music is played within an embedded YouTube player. The track is looped
        upon completion, unless in the shuffled queue mode (see below).
      </p>
      <h6>
        <b>Shuffled Queue</b>
      </h6>
      <p>
        The shuffled queue feature randomizes the entire music collection and
        plays upcoming songs automatically. Skip to the next track or return to
        the previous track with the controls under the media player. When
        filters are applied to the grid, the song pool is limited to the
        filtered entries.
      </p>
      <h6>
        <b>Grid Controls</b>
      </h6>
      <p>
        To sort by a column, press the column header. Hover over a column header
        and press the menu icon to access the advanced filter dialog. Mobile
        users can access the filter dialog by pressing and holding the column
        header.
      </p>
      <h6>
        <b>Acknowledgments</b>
      </h6>
      <p>
        We thank the creators of the{' '}
        <a
          href="https://github.com/maplestory-music/maplestory-music.github.io"
          target="_blank"
          rel="noreferrer"
        >
          Maplestory Music
        </a>{' '}
        database project for their amazing work and ideas, of which we have used
        as the foundation of the SimsRadio website project.
      </p>
    </div>
    <h2>Source</h2>
    <p>The following GitHub projects power this site.</p>
    <div className="gh-project-entry">
      <h5 className="gh-project-name">SimsRadio: Sims Radio music website</h5>
      <GitHubButton
        href="https://github.com/simsradio/simsradio.github.io"
        data-size="large"
        data-show-count={true}
        aria-label="Star simsradio.simsradio.github.io on GitHub"
      >
        Star
      </GitHubButton>
    </div>
  </div>
);

export default AboutPage;
