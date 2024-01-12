import { useCallback } from 'react';
import { EModalTypes, ModalsPropsType } from '@types';
import { useAppDispatch } from '@hooks';
import { closeModal } from '@slices/modalSlice';
import { Message, ModalWrapper, Title, Icon, MessageWrapper } from './styled-components';
import Footer from './Footer';

import AlertIcon from '@assets/icons/alert-circle-icon.svg';

const Alert = ({ onOk, okLabel, cancelLabel, messages }: ModalsPropsType<EModalTypes.ALERT_MESSAGE>) => {
  const dispatch = useAppDispatch();

  const close = useCallback(() => dispatch(closeModal()), [dispatch]);

  return (
    <ModalWrapper>
      <Icon src={AlertIcon} preview={false} />
      <Title>Warning</Title>
      <MessageWrapper>
        {messages.map(message => (
          <Message key={message}>{message}</Message>
        ))}
      </MessageWrapper>
      <Footer closeLabel={cancelLabel} okLabel={okLabel} onCancel={close} onConfirm={onOk} />
    </ModalWrapper>
  );
};

export default Alert;
