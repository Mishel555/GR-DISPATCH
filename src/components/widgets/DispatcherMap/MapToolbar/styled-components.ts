import { Button, Space } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { SettingOutlined } from '@ant-design/icons';

export const ToolsWrapper = styled(Space)`
  position: absolute;
  top: 25px;
  right: 25px;
`;

export const SettingsButton = styled(Button)`
  display: flex;
  align-items: center;

  padding: 0 10px;
  border: none;
  border-radius: 11px !important;

  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  background-color: ${COLORS.GREY_EXTRA_LIGHT};

  &:hover {
    color: ${COLORS.GREY_LIGHT} !important;
    border-color: ${COLORS.GREY_LIGHT} !important;
  }
`;

export const SettingsIcon = styled(SettingOutlined)`
  font-size: 15px;
`;
