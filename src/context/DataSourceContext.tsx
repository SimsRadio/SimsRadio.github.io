import React, { useEffect } from 'react';
import { parseISO } from 'date-fns';
import {
  IMusicRecordGrid,
  IMusicRecordJson,
  IMusicRecordSourceGrid,
} from '../models/DataModel';
import { useSettings } from './SettingsContext';
import { useSetAtom } from 'jotai';
import { IPlaylist } from '../models/Playlist';
import { playlistMapAtom } from '../state/playlist';
import { convertToPlaylistMap } from '../components/utils/PlaylistUtils';

type State = IMusicRecordGrid[];
type DataSourceProviderProps = { children: React.ReactNode };

const DataSourceStateContext = React.createContext<State | undefined>(
  undefined
);

export const DataSourceProvider: ({
  children,
}: DataSourceProviderProps) => React.ReactElement = ({ children }) => {
  const [state, setState] = React.useState<State>([]);
  const setPlaylistMap = useSetAtom(playlistMapAtom);
  const { settings } = useSettings();

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/dyzancorn/SimsRadioData/main/simsRadioData.json'
    )
      .then((result) => result.json())
      .then((rowData: IMusicRecordJson[]) => {
        const rowDataGrid: IMusicRecordGrid[] = rowData
          .filter((song) => {
            return settings.hideMinorTracks
              ? !song.decoration?.minorTrack ?? true
              : true;
          })
          .map((song: IMusicRecordJson) => {
            const date = song.source.date ? parseISO(song.source.date) : null;
            const source: IMusicRecordSourceGrid = {
              client: song.source.client,
              date,
              structure: song.source.structure,
              version: song.source.version,
              clientVersion: song.source.client,
            };
            const gridRecord: IMusicRecordGrid = Object.assign({}, song, {
              source: source,
            });
            return gridRecord;
          });
        setState(rowDataGrid);
      });
    fetch(
      'https://raw.githubusercontent.com/maplestory-music/maplebgm-db/prod/playlist.min.json'
    )
      .then((result) => result.json())
      .then((playlist: IPlaylist[]) => {
        setPlaylistMap(convertToPlaylistMap(playlist));
      });
  }, [
    setState,
    settings.hideMinorTracks,
    settings.distinctKmstVersion,
    setPlaylistMap,
  ]);

  return (
    <DataSourceStateContext.Provider value={state}>
      {children}
    </DataSourceStateContext.Provider>
  );
};

export const useDataSourceState: () => State = () => {
  const context = React.useContext(DataSourceStateContext);
  if (!context) {
    throw new Error(
      'useDataSourceState must be used within a DataSourceProvider'
    );
  }
  return context;
};
