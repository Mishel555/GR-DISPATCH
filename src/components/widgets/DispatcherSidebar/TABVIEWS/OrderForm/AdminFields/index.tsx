import { useCallback, useEffect } from 'react';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { IValueLabel, OrderApiStatusType, OrderFrequencyType, OrderPaymentType, OrderStatusType } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getDrivers } from '@thunks/driversThunk';
import { selectDrivers } from '@selectors/driversSelector';
import { CheckboxGroup, FormAreaField, FormInputField, FormSelect, SearchSelect } from '@components/ui';
import PriceFields from './PriceFields';
import { RootWrapper } from './styled-components';

interface IProps {
  setFormValue: (name: FormItemProps['name'], value: unknown) => void;
}

const ORDER_STATUSES: IValueLabel<OrderStatusType>[] = [
  { label: 'Unassigned', value: 'UNASSIGNED' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Picked up', value: 'PICKED_UP' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Comp for arriving', value: 'COMP_FOR_ARRIVING' },
  { label: 'Canceled', value: 'CANCELLED' },
];

const ORDER_API_STATUSES: IValueLabel<OrderApiStatusType>[] = [
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Transit to pickup', value: 'TRANSIT_TO_PICKUP' },
  { label: 'Ready for pickup', value: 'READY_FOR_PICKUP' },
  { label: 'Food not ready', value: 'FOOD_NOT_READY' },
  { label: 'Transit to dropoff', value: 'TRANSIT_TO_DROPOFF' },
  { label: 'Otw active at dropoff', value: 'OTW_ACTIVEAT_DROPOFF' },
  { label: 'Done delivered', value: 'DONE_DELIVERED' },
  { label: 'Done cannot deliver', value: 'DONE_CANNOT_DELIVER' },
  { label: 'Returned', value: 'RETURNED' },
];

const PAYMENT_TYPES: IValueLabel<OrderPaymentType>[] = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Order paid tip cash', value: 'ORDER_PAID_TIPS_CASH' },
  { label: 'Order paid tip paid', value: 'ORDER_PAID_TIPS_PAID' },
  { label: 'Paid with CC', value: 'ORDER_PAID_TIPS_CC_CLIP' },
  { label: 'Photo', value: 'PHOTO' },
  { label: 'Extra', value: 'EXTRA' },
  { label: 'Unknown', value: 'UNKNOWN' },
];

const FREQUENCY_TYPES: IValueLabel<OrderFrequencyType>[] = [
  { label: 'DOES_NOT_REPEAT', value: 'DOES_NOT_REPEAT' },
  { label: 'DAILY', value: 'DAILY' },
  { label: 'WEEKLY', value: 'WEEKLY' },
  { label: 'MONTHLY', value: 'MONTHLY' },
  { label: 'ANNUALY', value: 'ANNUALY' },
  { label: 'EVERY_WEEKDAY', value: 'EVERY_WEEKDAY' },
  { label: 'CUSTOM', value: 'CUSTOM' },
];

const FLAGS2: IValueLabel[] = [
  { label: 'Photo Required', value: 'photo' },
];

const AdminFields = ({ setFormValue }: IProps) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectDrivers);
  const driverOptions = data?.map(({ driver }) => ({
    value: driver.id,
    label: driver.name,
  })) || [];

  const onDriverChange = (driver: unknown) => {
    setFormValue(['driver', 'id'], driver);
  };

  const onSearch = useCallback((search: string | null) => {
    if (search !== null && search.length > 3) {
      return dispatch(getDrivers({ query: search, withShiftsOnly: false }));
    }

    dispatch(getDrivers({ withShiftsOnly: false }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDrivers({ withShiftsOnly: false }));

    return () => {
      dispatch(getDrivers({ withShiftsOnly: false }));
    };
  }, [dispatch]);

  return (
    <RootWrapper>
      <FormAreaField
        gap={30}
        label="Admin Notes"
        name={['notes', 'adminNotes']}
        placeholder="Add Notes"
        allowClear={false}
      />
      <FormSelect name="" label="Frequency" gap={43} options={FREQUENCY_TYPES} />
      <FormSelect name="status" label="Order Status" gap={29} options={ORDER_STATUSES} />
      <SearchSelect
        gap={70}
        name="driver"
        label="Driver"
        options={driverOptions}
        onSearch={onSearch}
        onChange={onDriverChange}
      />
      <FormSelect name="apiStatus" label="API Status" gap={43} options={ORDER_API_STATUSES} />
      <FormSelect
        name={['payments', 'paymentType']}
        rules={[{ required: true, message: '' }]}
        label="Payment Type"
        gap={22}
        options={PAYMENT_TYPES}
      />
      <PriceFields />
      <FormInputField name="signerName" label="Signer Name" gap={27} />
      <CheckboxGroup name="FLAGS2" options={FLAGS2} rtl />
    </RootWrapper>
  );
};

export default AdminFields;
