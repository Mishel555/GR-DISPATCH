import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const TableWrapper = styled.div`
  margin-top: 10px;
  padding-bottom: 50px;
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

export const Label = styled(Typography.Paragraph)<{ bold?: boolean }>`
  margin: 0 !important;
  font-size: 13px;
  font-weight: ${props => props.bold ? 700 : 400};
  color: ${props => props.bold ? COLORS.GREY_MAIN : COLORS.GREY_LIGHT};
`;
