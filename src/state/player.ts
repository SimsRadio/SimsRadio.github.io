import { atom } from 'jotai';
import { ILocateSong, IPlayingState } from '../models/Player';
import { IMusicRecordGrid, IPlaytimeDuration } from '../models/DataModel';

export const emptyPlayingState: IPlayingState = {
  currentSong: undefined,
  currentQueue: [],
  currentQueueSong: -1,
  repeatQueue: false,
  popupData: undefined,
};

export const emptyPlaytimeDuration: IPlaytimeDuration = {
  playtime: 0,
  duration: 1,
};

export const filterTextAtom = atom<string | undefined>(undefined);
export const locateSongAtom = atom<ILocateSong | undefined>(undefined);
export const queueRepeatAtom = atom<boolean>(false);
export const playingStateAtom = atom<IPlayingState>(emptyPlayingState);
export const gridFilteredAtom = atom<boolean>(false);
export const appQueuePoolAtom = atom<IMusicRecordGrid[]>([]);
export const isPlayingAtom = atom<boolean>(false);
