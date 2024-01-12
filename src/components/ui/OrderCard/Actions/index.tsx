import { EModalTypes, OrderStatusType } from '@types';
// import { COLORS } from '@constants/theme';
import { useAppDispatch } from '@hooks';
// import { CountBadge } from '@components/ui';
import { openModal } from '@slices/modalSlice';
import { unAssignDriverFromOrder } from '@thunks/ordersThunk';
import { ActionWrapper, AssignButton, MetaText, Wrapper } from './styled-components';

interface IProps {
  orderId: string;
  source: string;
  status: OrderStatusType;
}

const Actions = ({ orderId, status, source }: IProps) => {
  const dispatch = useAppDispatch();

  const unAssignDriver = async () => {
    await dispatch(unAssignDriverFromOrder({ orderId })).unwrap();
    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        timeout: 2000,
        autoHide: true,
        messages: ['Driver successfully unassigned'],
      },
    }));
  };

  const openAssignModal = () => dispatch(openModal({
    type: EModalTypes.ASSIGN_DRIVER,
    props: { orderId },
  }));

  const openUnAssignOrder = () => dispatch(openModal({
    type: EModalTypes.CONFIRM_MESSAGE,
    props: {
      messages: ['Are you sure you want to unassign this order?'],
      okLabel: 'Unassign',
      onConfirm: unAssignDriver,
    },
  }));

  return (
    <Wrapper align="baseline">
      <MetaText>Source: {source}</MetaText>
      <ActionWrapper>
        {/* <ChatButton> */}
        {/*   Chat */}
        {/*   <CountBadge count={10} color={COLORS.RED_LIGHT} /> */}
        {/* </ChatButton> */}
        {status === 'UNASSIGNED' ? (
          <AssignButton onClick={openAssignModal}>Assign</AssignButton>
        ) : (
          <AssignButton onClick={openUnAssignOrder}>Unassign</AssignButton>
        )}
      </ActionWrapper>
    </Wrapper>
  );
};

export default Actions;
