import { useEffect } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { EModalTypes, IAddress } from '@types';
import api from '@services/api';
import { useAppDispatch, useAppSelector } from '@hooks';
import { closeModal, openModal } from '@slices/modalSlice';
import { quickCreateOrder } from '@thunks/ordersThunk';
import { selectAppConfig } from '@selectors/configSelector';
import { ModalWrapper, ScrollContent, Title } from './styled-components';
import PickUp, { PickUpType } from './PickUp';
import DropOff from './DropOff';
import Footer from './Footer';
import './style.scss';

const { useForm, useWatch } = Form;

const createDropOff = () => ({ name: '', address: '', phone: '' });

const QuickCreateOrder = () => {
  const dispatch = useAppDispatch();
  const appConfig = useAppSelector(selectAppConfig);

  const [form] = useForm();
  const pickUpType = useWatch('pickUpType', form) as PickUpType;
  const dropOffs = useWatch('dropOffs', form);

  const allowRemoveDropOff = dropOffs?.length > 1;

  const close = () => dispatch(closeModal());

  const addDrop = () => {
    const { getFieldValue, setFieldValue } = form;
    const dropValues = getFieldValue('dropOffs');

    setFieldValue('dropOffs', [...dropValues, createDropOff()]);
  };

  const onPickUpChange = (value: unknown) => {
    form.setFieldValue('pickUp', value);
  };

  const onDropOffSelectChange = (index: number, value: unknown) => {
    form.setFieldValue(['dropOffs', index, 'address'], value);
  };

  // eslint-disable-next-line
  const onFormSubmit = async (values: any) => {
    // eslint-disable-next-line
    const data: any = { requests: [] };
    const addresses: string[] = [];
    const fetchedAddresses: IAddress[] = [];

    if (values.dropOffs) {
      // eslint-disable-next-line
      values.dropOffs.forEach((dropOff: any, index: number) => {
        if (!appConfig?.chooseDropOffFromTheList) {
          addresses.push(dropOff.address);
        }

        if (!dropOff.date) return;

        const date = dayjs(dropOff.date.$d);
        const hours = dropOff.time.$H;
        const minutes = dropOff.time.$m;
        date.set('hours', hours);
        date.set('minutes', minutes);

        values.dropOffs[index].date = date.toISOString();
      });
    }

    for await (const id of addresses) {
      const { data } = await api.address.getAddressByPlaceId(id);
      fetchedAddresses.push(data);
    }

    // eslint-disable-next-line
    values.dropOffs.forEach((dropOff: any, index: number) => {
      data.requests.push({
        pickup: { id: values.pickUp },
        dropOff: {
          ...(appConfig?.chooseDropOffFromTheList ? ({
            id: dropOff.address,
          }) : ({
            address: { address: fetchedAddresses[index].address, location: fetchedAddresses[index].location },
            ...(dropOff.phone && ({ phone: dropOff.phone })),
            ...(dropOff.name && ({ name: dropOff.name })),
          })),
        },
        timestamps: dropOff.date ? { pickupBy: dropOff.date } : {},
        notes: dropOff.note ? { dropOffNotes: dropOff.note } : {},
      });
    });

    await dispatch(quickCreateOrder(data)).unwrap();

    form.resetFields();

    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: { messages: ['Order successfully created'], autoHide: true },
    }));
  };

  useEffect(() => {
    form.validateFields().then().catch();
  }, [form]);

  return (
    <ModalWrapper onFinish={onFormSubmit} form={form}>
      <ScrollContent>
        <Title>Quick create order</Title>
        <PickUp onPickUpChange={onPickUpChange} />
        <Form.List name="dropOffs" initialValue={[createDropOff()]}>
          {(fields, { remove }, {}) => fields.map(({ key, name }) => (
            <DropOff
              key={key}
              name={name}
              pickUpType={pickUpType}
              allowRemove={allowRemoveDropOff}
              remove={remove}
              onSelectChange={onDropOffSelectChange}
            />
          ))}
        </Form.List>
      </ScrollContent>
      <Footer addDrop={addDrop} onCancel={close} />
    </ModalWrapper>
  );
};

export default QuickCreateOrder;
