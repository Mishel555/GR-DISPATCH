import { Col, Input } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
`;

export const StyledCol = styled(Col)`
  margin-top: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, .08);
`;

export const StyledInput = styled(Input)`
  height: 30px;
  border-radius: 12px;
  padding: 0 5px;

  &:hover {
    border: 1px solid ${COLORS.CYAN};
  }

  .ant-input-group-addon {
    border: none;
    background-color: initial;
  }

  .ant-input-affix-wrapper {
    height: 25px;
    margin-top: 2px;
    padding: 0;
    border: none;

    font-size: 12px;

    &-focused {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;

export const SearchIconWrapper = styled.div`
  padding-top: 4px !important;
`;
