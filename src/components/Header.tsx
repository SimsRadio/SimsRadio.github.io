/** @jsxImportSource @emotion/react */
import { Fragment } from 'react';
import { css } from '@emotion/react';

interface IHeader {
  noText?: boolean;
}

export const Header: React.FC<IHeader> = ({ noText }) => {
  return (
    <Fragment>
      <div>
        <img
          css={css`
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
          `}
          id="header-logo"
          src="assets/dj-candy.png"
          alt="header logo"
        />
      </div>
      {noText ? null : (
        <div>
          <p
            css={css`
              text-align: center;
            `}
          >
            Welcome to the SimsRadio database. This site provides a listing of
            the radio music used in games of the "The Sims" series, compiled by
            SpiderInTheSim.
          </p>
        </div>
      )}
    </Fragment>
  );
};
