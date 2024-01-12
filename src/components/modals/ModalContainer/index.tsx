import { useCallback, useEffect } from 'react';
import { ModalProps } from 'antd';
import loadable, { LoadableComponent } from '@loadable/component';
import { EModalTypes } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectModalState } from '@selectors/modalSelector';
import { closeModal } from '@slices/modalSlice';
import { ModalWrapper } from './styled-components';

const AlertModal = loadable(() => import('../Alert'));
const SuccessModal = loadable(() => import('../Success'));
const ConfirmModal = loadable(() => import('../Confirm'));
const ExtraConfirmModal = loadable(() => import('../ExtraConfirm'));
const MapSettingsModal = loadable(() => import('../MapSettings'));
const AssignDriverModal = loadable(() => import('../AssignDriver'));
const ChangeTeamModal = loadable(() => import('../ChangeTeam'));
const QuickCreateOrder = loadable(() => import('../QuickCreateOrder'));
const EditOrderDetails = loadable(() => import('../EditOrderDetails'));

// eslint-disable-next-line
const MODALS: { [key in EModalTypes]: LoadableComponent<any> } = {
  [EModalTypes.ALERT_MESSAGE]: AlertModal,
  [EModalTypes.SUCCESS_MESSAGE]: SuccessModal,
  [EModalTypes.CONFIRM_MESSAGE]: ConfirmModal,
  [EModalTypes.EXTRA_CONFIRM_MESSAGE]: ExtraConfirmModal,
  [EModalTypes.MAP_SETTINGS]: MapSettingsModal,
  [EModalTypes.ASSIGN_DRIVER]: AssignDriverModal,
  [EModalTypes.CHANGE_DRIVER_TEAM]: ChangeTeamModal,
  [EModalTypes.QUICK_ORDER_CREATE]: QuickCreateOrder,
  [EModalTypes.EDIT_ORDER_DETAILS]: EditOrderDetails,
};

const MODAL_DEFAULT_SETTINGS: ModalProps = {
  footer: null,
  closable: false,
  getContainer: false,
};

const ModalContainer = () => {
  const dispatch = useAppDispatch();

  const { isOpen, type, props, settings } = useAppSelector(selectModalState);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const Component = type && MODALS[type];

  useEffect(() => {
    if (!props) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (props.autoHide) {
      timer = setTimeout(() => close(), props.timeout ?? 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, props, close]);

  return (
    <ModalWrapper key={isOpen.toString()} open={isOpen} onCancel={close} {...MODAL_DEFAULT_SETTINGS} {...settings}>
      {Component ? <Component {...props} /> : null}
    </ModalWrapper>
  );
};

export default ModalContainer;
