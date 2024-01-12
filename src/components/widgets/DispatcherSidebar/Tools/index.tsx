import { useMatch } from 'react-router-dom';
import { ROOT_PATHS } from '@constants/paths';
import { ISidebarTab } from '@types';
import { Wrapper } from './styled-components';
import Tabs from './Tabs';

interface IProps {
  tabs: ISidebarTab[];
}

const Tools = ({ tabs }: IProps) => {
  const isOrderView = useMatch(`${ROOT_PATHS.ROOT}`);

  return (
    <Wrapper>
      <Tabs tabs={tabs} showCreateOrder={!!isOrderView} />
    </Wrapper>
  );
};

export default Tools;
