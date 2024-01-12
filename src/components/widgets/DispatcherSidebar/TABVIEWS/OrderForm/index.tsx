import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { EModalTypes, IFullOrderCreateForm, IOrderBusinessLog, IValueLabel } from '@types';
import { DISPATCHER_SIDEBAR_PATHS, ROOT_PATHS } from '@constants/paths';
import api from '@services/api';
import { getInitialValues, MOCK_ADDRESS_VALUE, processFormValuesForOrderCreate } from '@utils';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectAppConfig } from '@selectors/configSelector';
import { openModal } from '@slices/modalSlice';
import { fullCreateOrder, updateOrderById } from '@thunks/ordersThunk';
import OrderItem from '@components/modals/EditOrderDetails/OrderItem';
import DateFields from './DateFields';
import PickUpFields from './PickUpFields';
import DropOffFields from './DropOffFields';
import AdditionalOptions from './AdditionalOptions';
import AdminFields from './AdminFields';
import TimeFields from './TimeFields';
import ExtraActions from './ExtraActions';
import BusinessLog from './BusinessLog';
import Footer from './Footer';
import { FormWrapper, HiddenWrapper, ScrollContent } from './styled-components';
import './style.scss';

const { useForm, useWatch } = Form;

const OrderForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const appConfig = useAppSelector(selectAppConfig);

  const { id } = useParams();
  const [form] = useForm<IFullOrderCreateForm>();
  const createDropOff = !!useWatch(['dropOff', 'create'], form)?.length;

  const [newId, setNewId] = useState<string | null>(null);

  const [initialValues, setInitialValues] = useState<IFullOrderCreateForm | null>(null);
  const [autoClose, setAutoClose] = useState<boolean>(false);
  const [outAddress, setOutAddress] = useState<IValueLabel[] | null>(null);
  const [businessLog, setBusinessLog] = useState<IOrderBusinessLog[]>([]);

  const goBack = () => navigate(ROOT_PATHS.ROOT);

  const setFormValue = (name: FormItemProps['name'], value: unknown) => {
    if (name === undefined) return;

    form.setFieldValue(name, value);
  };

  const openOrderDetails = () => {
    const defaultValues = form.getFieldValue('orderDetails');

    dispatch(openModal({
      type: EModalTypes.EDIT_ORDER_DETAILS,
      props: {
        defaultItems: defaultValues,
        onSave: (data) => {
          setFormValue('orderDetails', data);
        },
      },
    }));
  };

  const saveAndClose = () => {
    setAutoClose(true);
    form.submit();
  };

  const createOrder = async (values: unknown) => {
    try {
      if (!newId) return;

      // Convert form values to BE body type...
      const data = processFormValuesForOrderCreate(values as IFullOrderCreateForm);
      data.id = newId;

      if (typeof data.dropOff?.address === 'string') {
        if (!appConfig?.chooseDropOffFromTheList) {
          const { data: fetchedAddress } = await api.address.getAddressByPlaceId(data.dropOff?.address);

          data.dropOff.address = { address: fetchedAddress.address, location: fetchedAddress.location };
        }

        if (appConfig?.chooseDropOffFromTheList) {
          data.dropOff = {
            // eslint-disable-next-line
            // @ts-ignore
            id: data.dropOff.address,
            ...('phone' in data.dropOff && ({
              phone: data.dropOff.phone || null,
            })),
            ...('email' in data.dropOff && ({
              email: data.dropOff.email || null,
            })),
          };
        }
      }

      const order = await dispatch(fullCreateOrder(data)).unwrap();
      setFormValue(['distances', 'drivingDistance'], order.distances.drivingDistance);
      setFormValue(['distances', 'distance'], order.distances.drivingDistance);

      setNewId(null);
      dispatch(openModal({
        type: EModalTypes.SUCCESS_MESSAGE,
        props: {
          messages: ['Order successfully created'],
        },
      }));

      if (autoClose) {
        return goBack();
      }

      navigate(`/${DISPATCHER_SIDEBAR_PATHS.EDIT_ORDER.replace(':id', newId)}`);
    } catch (e) {
      dispatch(openModal({
        type: EModalTypes.ALERT_MESSAGE,
        props: {
          messages: [e as string],
        },
      }));
    }
  };

  const updateOrder = async (values: unknown) => {
    try {
      if (!id) return;

      const data = {
        orderId: id,
        data: processFormValuesForOrderCreate(values as IFullOrderCreateForm),
      };

      await dispatch(updateOrderById(data)).unwrap();

      if (autoClose) {
        goBack();
      }

      dispatch(openModal({
        type: EModalTypes.SUCCESS_MESSAGE,
        props: {
          messages: ['Order successfully updated'],
        },
      }));
    } catch (e) {
      dispatch(openModal({
        type: EModalTypes.ALERT_MESSAGE,
        props: {
          messages: [e as string],
        },
      }));
    }
  };

  const onFormSubmit = async (values: unknown) => {
    if (id && !newId) {
      return updateOrder(values);
    }

    createOrder(values);
  };

  useEffect(() => {
    const getOrder = async () => {
      const { data } = id ? await api.orders.getOrderById(id) : await api.orders.getNewTemplate();
      setInitialValues(getInitialValues(data));

      if (!id) return setNewId(data.id);

      const { data: logResponse } = await api.orders.getOrderBusinessLog(id);
      setBusinessLog(logResponse.result);

      setOutAddress([{
        value: MOCK_ADDRESS_VALUE,
        label: data.dropOff.address.address,
      }]);
    };

    getOrder();
  }, [id, form]);

  useEffect(() => {
    form.validateFields().then().catch();
  }, [form]);

  return initialValues ? (
    <FormWrapper form={form} initialValues={initialValues} onFinish={onFormSubmit}>
      <ScrollContent>
        <DateFields />
        <PickUpFields getFormValue={form.getFieldValue} setFormValue={setFormValue} />
        <DropOffFields
          create={createDropOff}
          setFormValue={setFormValue}
          outAddress={outAddress?.length ? outAddress : undefined}
        />
        <AdditionalOptions />
        <AdminFields setFormValue={setFormValue} />
        <TimeFields />
        <ExtraActions onViewDetails={openOrderDetails} />
        <BusinessLog data={businessLog} />
      </ScrollContent>
      <Footer goBack={goBack} saveAndClose={saveAndClose} />
      {/* Hidden form list for correct Antd form working... */}
      <HiddenWrapper>
        <Form.List name="orderDetails">
          {(fields, { remove }, {}) => fields.map(({ key, name }) => (
            <OrderItem
              key={key}
              name={name}
              remove={remove}
              allowRemove
            />
          ))}
        </Form.List>
      </HiddenWrapper>
    </FormWrapper>
  ) : null;
};

export default OrderForm;
