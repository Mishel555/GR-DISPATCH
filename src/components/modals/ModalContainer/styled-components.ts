import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalWrapper = styled(Modal)`
  width: fit-content !important;
  padding: 0;
  top: 10px;

  .ant-modal-content {
    padding: 0;
    border-radius: 17px;
  }

  .ant-modal-body {}
  
  .ant-modal-footer {}
`;
