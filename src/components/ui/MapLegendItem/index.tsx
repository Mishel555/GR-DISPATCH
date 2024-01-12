import { Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { IMapSettingsLegend } from '@types';
import { COLORS } from '@constants/theme';

const Wrapper = styled(Space)`
  gap: 14px !important;
`;

const Label = styled(Typography.Text)`
  font-size: 13px;
  font-weight: 400;
  color: ${COLORS.GREY_MAIN};
`;

const MapLegendItem = ({ icon, label }: IMapSettingsLegend) => (
  <Wrapper>
    <Icon component={() => icon} />
    <Label>{label}</Label>
  </Wrapper>
);

export default MapLegendItem;
