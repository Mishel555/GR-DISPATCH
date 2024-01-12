import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { hexToRgbString } from '@utils';

export const ModalWrapper = styled.div`
  width: 460px;
  padding: 14px 22px;
  text-align: center;
`;

export const Title = styled(Typography.Paragraph)`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
  
  margin: 20px 0;
`;

export const MessageWrapper = styled.div`
  margin-top: 30px;
`;

export const Message = styled(Typography.Paragraph)`
  margin: 0 !important;
  
  font-size: 13px;
  font-weight: 600;
  color: rgba(${hexToRgbString(COLORS.GREY_MAIN)}, .5);
`;
