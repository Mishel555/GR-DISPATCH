import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const ModalWrapper = styled.div`
  width: 460px;
  padding: 18px 20px;
`;

export const TextWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
  padding: 0;
`;

export const Title = styled(Typography.Text)<{ alert?: boolean }>`
  font-size: 13px;
  font-weight: ${props => props.alert ? 400 : 600};
  color: ${props => props.alert ? COLORS.RED_LIGHT : COLORS.GREY_MAIN};
`;
