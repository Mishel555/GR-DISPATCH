import { ReactNode } from 'react';
import { GroupWrapper, Title, StyledDivider } from './styled-components';

interface IProps {
  title?: string;
  children: ReactNode;
}

const SettingGroup = ({ title, children }: IProps) => (
  <GroupWrapper direction="vertical">
    {!!title && <Title>{title}</Title>}
    {children}
    <StyledDivider />
  </GroupWrapper>
);

export default SettingGroup;
