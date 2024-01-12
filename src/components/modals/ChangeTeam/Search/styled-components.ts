import { Input } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const FormInput = styled(Input)`
  margin-top: 15px;
  padding: 8px 22px;
  border-radius: 26px;
  border-color: ${COLORS.GREY_ULTRA_LIGHT};
  background-color: ${COLORS.GREY_ULTRA_LIGHT};

  &:hover {
    border-color: ${COLORS.CYAN} !important;
  }

  input {
    margin-left: 12px;

    font-size: 13px;
    font-weight: 400;
    color: ${COLORS.GREY_LIGHT};
    background-color: ${COLORS.GREY_ULTRA_LIGHT};
  }
`;
