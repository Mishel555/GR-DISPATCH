import { useCallback } from 'react';
import { EModalTypes, ModalsPropsType } from '@types';
import { useAppDispatch } from '@hooks';
import { closeModal } from '@slices/modalSlice';
import { Message, ModalWrapper, Title, MessageWrapper } from './styled-components';
import Footer from './Footer';

const Confirm = ({
  messages,
  okLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ModalsPropsType<EModalTypes.CONFIRM_MESSAGE>) => {
  const dispatch = useAppDispatch();

  const close = useCallback(() => dispatch(closeModal()), [dispatch]);

  return (
    <ModalWrapper>
      <Title>Please confirm</Title>
      <MessageWrapper>
        {messages.map(message => (
          <Message key={message}>{message}</Message>
        ))}
      </MessageWrapper>
      <Footer okLabel={okLabel} closeLabel={cancelLabel} onCancel={onCancel ?? close} onConfirm={onConfirm} />
    </ModalWrapper>
  );
};

export default Confirm;
