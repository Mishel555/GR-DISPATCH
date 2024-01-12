import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import { EModalTypes, ISidebarTab } from '@types';
import { ROOT_PATHS } from '@constants/paths';
import { useAppDispatch } from '@hooks';
import { openModal } from '@slices/modalSlice';
import { PlusButton } from '@components/ui';
import { StyledTabs, PlusWrapper } from './styled-components';

interface IProps {
  tabs: ISidebarTab[];
  showCreateOrder: boolean;
}

const BASE_PATH = ROOT_PATHS.ROOT;

const Tabs = ({ tabs, showCreateOrder }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cleanPath = pathname.replace(BASE_PATH, '');
  const defaultValue = tabs.find(tab => tab.value === cleanPath.replace('/', ''));

  const createOrder = () => dispatch(openModal({ type: EModalTypes.QUICK_ORDER_CREATE }));

  return (
    <Row justify="space-between">
      <Col span={20}>
        <StyledTabs
          block
          options={tabs}
          defaultValue={defaultValue?.value}
          onChange={(value) => navigate(value as string)}
          className="tabs"
        />
      </Col>
      {showCreateOrder && (
        <PlusWrapper>
          <PlusButton onClick={createOrder} />
        </PlusWrapper>
      )}
    </Row>
  );
};

export default Tabs;
