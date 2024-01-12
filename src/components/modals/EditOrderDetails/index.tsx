import { useEffect } from 'react';
import { Form } from 'antd';
import { EModalTypes, IOrderDetail, ModalsPropsType } from '@types';
import { objectEquals } from '@utils';
import { useAppDispatch } from '@hooks';
import { closeModal, openModal } from '@slices/modalSlice';
import OrderItem from './OrderItem';
import Footer from './Footer';
import { ModalWrapper, ScrollContent, Title } from './styled-components';
import './style.scss';

interface IForm {
  items: IOrderDetail[];
}

const { useForm } = Form;

const createItem = (): IOrderDetail => ({ title: '', quantity: undefined, description: '', imageUrl: '' });

const EditOrderDetails = ({ defaultItems, onSave }: ModalsPropsType<EModalTypes.EDIT_ORDER_DETAILS>) => {
  const dispatch = useAppDispatch();

  const [form] = useForm<IForm>();

  const onFormSubmit = (values: IForm) => {
    onSave(values.items);
    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        timeout: 2000,
        autoHide: true,
        messages: ['Your changes have been saved.'],
      },
    }));
  };

  const close = () => {
    const currentData = form.getFieldValue('items');

    if (defaultItems && !objectEquals(defaultItems, currentData)) {
      if (currentData.length < 2 && (!currentData[0].title || !currentData[0].quantity)) {
        return dispatch(closeModal());
      }

      dispatch(openModal({
        type: EModalTypes.EXTRA_CONFIRM_MESSAGE,
        props: {
          okLabel: 'Ok',
          rejectLabel: 'No',
          messages: ['Do you want to save changes?'],
          onConfirm: () => onFormSubmit(currentData),
          onReject: () => dispatch(closeModal()),
          onClose: () => {
            dispatch(openModal({
              type: EModalTypes.EDIT_ORDER_DETAILS,
              props: {
                onSave,
                defaultItems: currentData,
              },
            }));
          },
        },
      }));
    } else {
      dispatch(closeModal());
    }
  };

  const addItem = () => {
    const { getFieldValue, setFieldValue } = form;
    const items = getFieldValue('items');

    setFieldValue('items', [...items, createItem()]);
  };

  useEffect(() => {
    form.validateFields().then().catch();
  }, [form]);

  return (
    <ModalWrapper
      form={form}
      initialValues={{ items: defaultItems?.length ? defaultItems : [createItem()] }}
      onFinish={(data) => onFormSubmit(data as IForm)}
    >
      <ScrollContent>
        <Title>Order Details Editor</Title>
        <Form.List name="items">
          {(fields, { remove }, {}) => fields.map(({ key, name }) => (
            <OrderItem
              key={key}
              name={name}
              remove={remove}
              allowRemove
            />
          ))}
        </Form.List>
      </ScrollContent>
      <Footer addItem={addItem} onCancel={close} />
    </ModalWrapper>
  );
};

export default EditOrderDetails;
