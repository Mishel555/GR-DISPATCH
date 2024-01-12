import { EModalTypes } from '@types';
import { useAppDispatch } from '@hooks';
import { openModal } from '@slices/modalSlice';
import { ToolsWrapper, SettingsButton, SettingsIcon } from './styled-components';

const MapToolbar = () => {
  const dispatch = useAppDispatch();

  const openSettings = () => dispatch(openModal({
    type: EModalTypes.MAP_SETTINGS,
  }));

  return (
    <ToolsWrapper>
      <SettingsButton onClick={openSettings}>
        Map Settings
        <SettingsIcon />
      </SettingsButton>
    </ToolsWrapper>
  );
};

export default MapToolbar;
