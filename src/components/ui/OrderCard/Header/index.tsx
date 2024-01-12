import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Dropdown, MenuProps } from 'antd';
import Icon, { MoreOutlined } from '@ant-design/icons';
import { EModalTypes, IOrderTimeStamps, OrderLabelType, OrderStatusType } from '@types';
import { COLORS } from '@constants/theme';
import { DISPATCHER_SIDEBAR_PATHS } from '@constants/paths';
import { copyTextToClipboard, formatOrderHeaderDate, getTimeFormatString } from '@utils';
import { useAppDispatch } from '@hooks';
import { selectAppTimeFormat } from '@selectors/configSelector';
import { cancelOrderById } from '@thunks/ordersThunk';
import { openModal } from '@slices/modalSlice';
import { AlertIcon, CopyClipboardIcon } from '@components/icons';
import { CustomTooltip } from '@components/ui';
import Label, { ORDER_LABELS, ORDER_STATUSES } from '@components/ui/Label';
import { CopyButton, DateTime, MainContainer, RowGroup, Title, Wrapper } from './styled-components';

interface IProps {
  id: string;
  number: string;
  timestamps: IOrderTimeStamps;
  status: OrderStatusType;
  labels: OrderLabelType[];
  showName: boolean;
  name?: string;
  alert?: boolean;
}

const Header = ({ id, number, name, status, labels, showName, timestamps, alert }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const globalTimeFormat = useSelector(selectAppTimeFormat);
  const timeFormatString = getTimeFormatString(globalTimeFormat);

  const statusTimeStampMap: Record<OrderStatusType, string | null | undefined> = {
    ACCEPTED: timestamps.pickupBy,
    ASSIGNED: timestamps.pickupBy,
    UNASSIGNED: timestamps.pickupBy,
    PICKED_UP: timestamps.deliverBy,
    DELIVERED: timestamps.deliverBy,
    CANCELLED: timestamps.pickupBy,
    COMPLETED: timestamps.deliverBy,
    COMP_FOR_ARRIVING: timestamps.deliverBy,
  };

  const formattedDate = formatOrderHeaderDate(statusTimeStampMap[status] || timestamps.pickupBy || '', timeFormatString);

  const [hover, setHover] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const onDotsClick = (e: MouseEvent) => {
    // do not toggle collapse on dropdown dots click...
    e.stopPropagation();
  };

  const editOrder = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    // do not toggle collapse on dropdown dots click...
    e.stopPropagation();

    navigate(DISPATCHER_SIDEBAR_PATHS.EDIT_ORDER.replace(':id', id));
  };

  const cancelOrder = async () => {
    await dispatch(cancelOrderById({ orderId: id })).unwrap();
    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        timeout: 2000,
        autoHide: true,
        messages: ['Order successfully cancelled'],
      },
    }));
  };

  const openCancelModal = (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();

    dispatch(openModal({
      type: EModalTypes.CONFIRM_MESSAGE,
      props: {
        okLabel: 'Yes',
        cancelLabel: 'No',
        onConfirm: cancelOrder,
        messages: ['Are you sure you want to cancel the delivery?'],
      },
    }));
  };

  const onTooltipVisibleChange = (visible: boolean) => {
    if (!visible) {
      setCopied(false);
    }
  };

  const copyToClipboard = async (e: MouseEvent) => {
    try {
      e.stopPropagation();

      await copyTextToClipboard(number);

      setCopied(true);
    } catch (e) {
      console.log(e);
    }
  };

  const items: MenuProps['items'] = [
    { key: '1', label: 'Edit', onClick: (menuInfo) => editOrder(menuInfo.domEvent) },
    { key: '2', label: 'Cancel Delivery', onClick: (menuInfo) => openCancelModal(menuInfo.domEvent) },
  ];

  return (
    <MainContainer justify="space-between" align="middle" wrap={false}>
      <RowGroup onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Title hover={hover}>{showName && name} {number}</Title>
        {hover && (
          <CopyButton type="link" onClick={copyToClipboard}>
            <CustomTooltip
              arrow={false}
              title={copied ? 'Copied' : 'Copy'}
              color={copied ? COLORS.CYAN : COLORS.GREY_DARK}
              afterOpenChange={onTooltipVisibleChange}
            >
              <Icon component={() => <CopyClipboardIcon color={copied ? COLORS.CYAN : COLORS.GREY_MAIN} />} />
            </CustomTooltip>
          </CopyButton>
        )}
        {alert && <Icon component={() => <AlertIcon />} />}
      </RowGroup>
      <RowGroup>
        <Wrapper align="center" wrap={false}>
          {status !== 'UNASSIGNED' && <Label status={ORDER_STATUSES[status]} />}
          {labels?.map((label) => (
            <Label key={label} status={ORDER_LABELS[label]} />
          ))}
        </Wrapper>
        <CustomTooltip
          arrow={false}
          color={COLORS.GREY_LIGHT}
          title={status === 'PICKED_UP' ? 'Time to Drop-Off' : 'Time to Pick-Up'}
        >
          <DateTime alert={formattedDate.alert}>
            {formattedDate.formattedDate}
          </DateTime>
        </CustomTooltip>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement="bottomRight"
          getPopupContainer={triggerNode => triggerNode}
        >
          <MoreOutlined onClick={onDotsClick} />
        </Dropdown>
      </RowGroup>
    </MainContainer>
  );
};

export default Header;
