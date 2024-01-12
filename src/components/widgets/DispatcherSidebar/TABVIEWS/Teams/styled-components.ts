import styled from 'styled-components';
import CheckboxList from './CheckboxList';
import { COLORS } from '@constants/theme';

export const Root = styled.div`
  height: 100%;
  
  display: flex;
  flex-direction: column;
`;

export const RootWrapper = styled.div`
  height: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  border-radius: 26px;
`;

export const StyledCheckboxList = styled(CheckboxList)`
  .ant-checkbox-wrapper {
    font-weight: 700;
    color: ${COLORS.GREY_MAIN};
    transition: background-color .3s ease-in-out;
    
    &:hover {
      background-color: ${COLORS.GREY_EXTRA_LIGHT};
    }
  }
`;
