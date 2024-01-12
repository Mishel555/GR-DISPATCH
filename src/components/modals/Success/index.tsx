import { EModalTypes, ModalsPropsType } from '@types';
import { Message, ModalWrapper, Title, Icon, MessageWrapper } from './styled-components';

import SuccessIcon from '@assets/icons/success-circle-icon.svg';

const Success = ({ messages }: ModalsPropsType<EModalTypes.SUCCESS_MESSAGE>) => (
  <ModalWrapper>
    <Icon src={SuccessIcon} preview={false} />
    <Title>Success</Title>
    <MessageWrapper>
      {messages.map(message => (
        <Message key={message}>{message}</Message>
      ))}
    </MessageWrapper>
  </ModalWrapper>
);

export default Success;
