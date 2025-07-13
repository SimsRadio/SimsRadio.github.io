import { IMusicRecordGrid, IPopupData } from './DataModel';

export interface IPlayingState {
  currentSong: string | undefined;
  currentQueue: IMusicRecordGrid[];
  currentQueueSong: number;
  repeatQueue: boolean;
  popupData: IPopupData | undefined;
}

export interface ILocateSong {
  songId: string | undefined;
}
