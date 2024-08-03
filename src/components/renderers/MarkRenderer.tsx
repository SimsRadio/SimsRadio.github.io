import React, { useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const MarkRenderer: React.FC<ICellRendererParams> = (params) => {
  const [imgSrc, setImgSrc] = useState(`mark/${params.value}`);

  return (
    <>
      <OverlayTrigger
        delay={{ show: 250, hide: 100 }}
        overlay={
          <Tooltip id={`tooltip-pack-name`}>
            {params.data.pack
              ? params.data.pack
              : params.data.source?.clientVersion}
          </Tooltip>
        }
      >
        <span>
          <img
            src={imgSrc}
            alt="icon"
            width="35"
            height="35"
            onError={() => setImgSrc(`mark/default.png`)}
          ></img>
        </span>
      </OverlayTrigger>
    </>
  );
};
