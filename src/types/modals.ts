import { ModalProps } from 'antd';
import { IOrderDetail } from './order';

export enum EModalTypes {
  ALERT_MESSAGE = 'ALERT_MESSAGE',
  SUCCESS_MESSAGE = 'SUCCESS_MESSAGE',
  CONFIRM_MESSAGE = 'CONFIRM_MESSAGE',
  EXTRA_CONFIRM_MESSAGE = 'EXTRA_CONFIRM_MESSAGE',
  MAP_SETTINGS = 'MAP_SETTINGS',
  ASSIGN_DRIVER = 'ASSIGN_DRIVER',
  CHANGE_DRIVER_TEAM = 'CHANGE_DRIVER_TEAM',
  QUICK_ORDER_CREATE = 'QUICK_CREATE_ORDER',
  EDIT_ORDER_DETAILS = 'EDIT_ORDER_DETAILS',
}

export interface IModalStore {
  isOpen: boolean;
  type?: EModalTypes;
  props?: ModalsPropsMap[EModalTypes] & ICommon;
  settings?: ModalProps;
}

export interface IModalOpenPayload {
  type: EModalTypes;
  props?: ModalsPropsMap[EModalTypes] & ICommon;
  settings?: ModalProps;
}

interface ICommon {
  autoHide?: boolean;
  timeout?: number;
}

interface IChangeDriverTeam {
  driverId: string;
}

interface IAssignDriver {
  orderId: string;
}

interface IConfirmMessage {
  messages: string[];
  okLabel: string;
  cancelLabel: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

interface IExtraConfirm {
  messages: string[];
  okLabel: string;
  rejectLabel: string;
  onReject: () => void;
  onConfirm: () => void;
  onClose?: () => void;
}

interface ISuccessMessage {
  messages: string[];
}

interface IAlertMessage {
  messages: string[];
  onOk?: () => void;
  okLabel?: string;
  cancelLabel?: string;
}

interface IEditOrderDetails {
  defaultItems?: IOrderDetail[];
  onSave: (data: IOrderDetail[]) => void;
}

interface ModalsPropsMap {
  [EModalTypes.ALERT_MESSAGE]: IAlertMessage;
  [EModalTypes.SUCCESS_MESSAGE]: ISuccessMessage;
  [EModalTypes.CONFIRM_MESSAGE]: IConfirmMessage;
  [EModalTypes.EXTRA_CONFIRM_MESSAGE]: IExtraConfirm;
  [EModalTypes.MAP_SETTINGS]: undefined;
  [EModalTypes.ASSIGN_DRIVER]: IAssignDriver;
  [EModalTypes.CHANGE_DRIVER_TEAM]: IChangeDriverTeam;
  [EModalTypes.QUICK_ORDER_CREATE]: undefined;
  [EModalTypes.EDIT_ORDER_DETAILS]: IEditOrderDetails;
}

export type ModalsPropsType<T extends keyof ModalsPropsMap> = ModalsPropsMap[T];
