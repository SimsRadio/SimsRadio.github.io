/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';
import { SettingsModalToggle } from './SettingsModalToggle';

interface ISettingsModalProps {
  show: boolean;
  onModalClose: () => void;
}

export const SettingsModal: React.FC<ISettingsModalProps> = ({
  show,
  onModalClose,
}) => {
  const { settings, setSettings } = useSettings();
  const [hideMinorTracks, setHideMinorTracks] = useState(
    settings.hideMinorTracks
  );
  const [distinctKmstVersion, setDistinctKmstVersion] = useState(
    settings.distinctKmstVersion
  );
  const [jsonOptimizedTrackIdCopy, setJsonOptimizedTrackIdCopy] = useState(
    settings.jsonOptimizedTrackIdCopy
  );
  const [hideDmcaUnsafe, setHideDmcaUnsafe] = useState(settings.hideDmcaUnsafe);
  const [showDmcaSafeCol, setShowDmcaSafeCol] = useState(
    settings.showDmcaSafeCol
  );

  const onModalSave = () => {
    setSettings({
      hideMinorTracks,
      distinctKmstVersion,
      jsonOptimizedTrackIdCopy,
      hideDmcaUnsafe,
      showDmcaSafeCol,
    });
    onModalClose();
  };

  const onModalShow = () => {
    setHideMinorTracks(settings.hideMinorTracks);
    setDistinctKmstVersion(settings.distinctKmstVersion);
    setJsonOptimizedTrackIdCopy(settings.jsonOptimizedTrackIdCopy);
    setHideDmcaUnsafe(settings.hideDmcaUnsafe);
    setShowDmcaSafeCol(settings.showDmcaSafeCol);
  };

  return (
    <Modal show={show} onShow={onModalShow} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <>
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              {/* <SettingsModalToggle
                id="minorTrack"
                label="Hide Minor Tracks"
                checked={hideMinorTracks}
                tooltip="Minor tracks feature segments of another song"
                onChange={() => {
                  setHideMinorTracks((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="distinctKmstVersion"
                label="Distinct KMST Version"
                checked={distinctKmstVersion}
                tooltip="Prevent collisions resulting from KMST version reset"
                onChange={() => {
                  setDistinctKmstVersion((prev) => !prev);
                }}
              /> */}
              <SettingsModalToggle
                id="jsonOptimizedTrackIdCopy"
                label="JSON Optimized Single Track ID Copy"
                checked={jsonOptimizedTrackIdCopy}
                tooltip="Wrap single track ID copies in JSON compatible syntax"
                onChange={() => {
                  setJsonOptimizedTrackIdCopy((prev) => !prev);
                }}
              />
              <span
                css={css`
                  padding-top: 5px;
                `}
              ></span>

              <span
                css={css`
                  padding-bottom: 5px;
                `}
              >
                ⭐ For content creators:
              </span>
              <SettingsModalToggle
                id="setHideDmcaUnsafe"
                label="Show DMCA Safe tracks only"
                checked={hideDmcaUnsafe}
                tooltip="Songs that should be safe for content creators (this is not 100% guaranteed to be safe)"
                onChange={() => {
                  setHideDmcaUnsafe((prev) => !prev);
                }}
              />
              <SettingsModalToggle
                id="setShowDmcaSafeCol"
                label="Show DMCA Safe Column"
                checked={showDmcaSafeCol}
                tooltip="Show the DMCA Safe column"
                onChange={() => {
                  setShowDmcaSafeCol((prev) => !prev);
                }}
              />
            </div>
          </>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onModalSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
