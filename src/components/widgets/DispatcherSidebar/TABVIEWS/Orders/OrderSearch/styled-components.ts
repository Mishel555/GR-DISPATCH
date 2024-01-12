import { Col, Input } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

export const RootWrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const FiltersWrapper = styled.div`
  padding: 0 15px;
`;

export const SearchIconWrapper = styled.div`
  padding-top: 4px !important;
`;

export const StyledCol = styled(Col)`
  margin-top: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, .08);
`;

export const StyledInput = styled(Input)`
  height: 30px;
  border-radius: 12px;

  &:hover {
    border: 1px solid ${COLORS.CYAN};
  }

  .ant-input-group-addon {
    border: none;
    background-color: initial;
    padding-right: 8px;

    &:nth-of-type(2) {
      position: relative;

      &:after {
        content: '';
        width: 1px;
        height: 10px;
        background-color: colors.$BLACK;

        position: absolute;
        top: 50%;
        left: 5px;

        transform: translateY(-50%);
      }
    }
  }

  .ant-input-affix-wrapper {
    height: 25px;
    margin-top: 2px;
    padding: 5px;
    border: none;

    font-size: 12px;

    &-focused {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
