import React, { useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export const MarkRenderer: React.FC<ICellRendererParams> = (params) => {
  const [imgSrc, setImgSrc] = useState(`mark/${params.value}`);

  return (
    <span>
      <img
        src={imgSrc}
        alt="icon"
        width="35"
        height="35"
        onError={() => setImgSrc(`mark/default.png`)}
      ></img>
    </span>
  );
};
