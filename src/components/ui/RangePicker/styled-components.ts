import { DatePicker } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IStyleProps {
  active?: boolean;
}

export const StyledRangePicker = styled(DatePicker.RangePicker)<IStyleProps>`
  height: 28px;
  border-radius: 26px;
  border-color: ${COLORS.GREY_EXTRA};

  font-size: 12px;
  font-weight: 500;
  color: ${COLORS.WHITE};

  transition: .3s ease-in-out;
  background-color: ${COLORS.GREY_LIGHT};

  &:hover {
    border-color: ${COLORS.GREY_LIGHT} !important;
    color: ${props => props.active ? COLORS.WHITE : COLORS.GREY_MAIN} !important;
  }

  input::placeholder, input {
    color: ${COLORS.WHITE} !important;
    font-size: 12px !important;
  }

  svg {
    color: ${COLORS.WHITE} !important;
  }

  .ant-picker-active-bar {
    background: ${COLORS.WHITE};
  }
`;
