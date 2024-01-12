import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const TableWrapper = styled.div`
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${COLORS.GREY_ULTRA_LIGHT};

  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    width: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: ${COLORS.GREY_MAIN};
  }
`;

export const Title = styled(Typography.Paragraph)`
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;

export const Label = styled(Typography.Paragraph)`
  margin: 0 !important;
  font-size: 10px;
  font-weight: 400;
  color: ${COLORS.GREY_LIGHT};
`;
