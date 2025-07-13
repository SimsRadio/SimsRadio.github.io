import { LanguageLocale } from '../i18n';

interface IMusicRecordMetadataJson {
  albumName: string;
  albumCover: string;
  artist: string;
  subtitle: string;
  title: string;
  year: string;
  dmcaSafe: string;
}

interface IMusicRecordSourceJson {
  client: string;
  date: string;
  structure: string;
  version: string;
}

interface IMusicRecordLocaleJson {
  description?: string;
  filename: string;
  metadata?: {
    artist?: string;
    title?: string;
    dmcaSafe?: string;
  };
  songType: string;
  pack: string;
}

interface IMusicRecordDecorationJson {
  minorTrack?: boolean;
}

type IMusicRecordLocaleGroupJson = Record<
  LanguageLocale,
  IMusicRecordLocaleJson
>;

export interface IMusicRecordJson {
  decoration?: IMusicRecordDecorationJson;
  description: string;
  filename: string;
  locale?: IMusicRecordLocaleGroupJson;
  mark: string;
  metadata: IMusicRecordMetadataJson;
  source: IMusicRecordSourceJson;
  youtube: string;
  songType: string;
  pack: string;
}

export interface IMusicRecordSourceGrid
  extends Omit<IMusicRecordSourceJson, 'date'> {
  date: Date | null;
  clientVersion: string;
}

export interface IMusicRecordGrid extends Omit<IMusicRecordJson, 'source'> {
  source: IMusicRecordSourceGrid;
}

export interface IPopupData {
  trackName: string;
  artist: string;
  albumCover: string;
}

export interface IPlaytimeDuration {
  playtime: number;
  duration: number;
}
