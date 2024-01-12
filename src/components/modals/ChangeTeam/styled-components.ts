import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const ModalWrapper = styled.div`
  width: 460px;
  padding: 14px 22px;
`;

export const Title = styled(Typography.Text)`
  font-size: 13px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;
