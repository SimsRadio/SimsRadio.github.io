import { CellClassParams, CellStyle } from 'ag-grid-community';
import { rgba, complement } from 'polished';
import { cornFlowerBlue } from '../../constants';
import { SimsGame } from '../../models/SimsGame';

export const ClientVersionCellStyle = (params: CellClassParams): CellStyle => {
  if (!params.value) return {};
  const color = rgba(cornFlowerBlue, 0.5);
  return {
    backgroundColor: SimsGame[params.value as keyof typeof SimsGame]
      ? rgba(SimsGame[params.value as keyof typeof SimsGame], 0.5)
      : complement(color),
  };
};
