import { ChangeEvent, useState } from 'react';
import { EModalTypes, IDriver, ModalsPropsType } from '@types';
import { useAppDispatch, useDebounce } from '@hooks';
// import api from '@services/api';
import { closeModal, openModal } from '@slices/modalSlice';
import { assignDriverToOrder } from '@thunks/ordersThunk';
import { ModalWrapper, TextWrapper, Title } from './styled-components';

import Footer from './Footer';
import Search from './Search';
import Drivers from './Drivers';

const AssignDriver = ({ orderId }: ModalsPropsType<EModalTypes.ASSIGN_DRIVER>) => {
  const dispatch = useAppDispatch();

  const [driver, setDriver] = useState<IDriver | null>(null);
  const [showRecommendation, setShowRecommendation] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

  const close = () => dispatch(closeModal());

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setDriver(null);
    setSearch(e.target.value);
  };

  const handleRecommendation = (value: boolean) => setShowRecommendation(value);

  const onDriverSelect = (driver: IDriver) => {
    setDriver(driver);
    setSearch(driver.name);
    setErrorMessage(null);
    setShowRecommendation(false);
  };

  const onConfirm = async (confirm?: boolean) => {
    if (!driver || !search) {
      return setErrorMessage('Please select a driver from the list');
    }

    // todo => fixme
    const data = {
      result: [],
    };
    // const { data } = await api.orders.checkDriverAssignWarnings({
    //   order: orderId,
    //   driver: { id: driver.id },
    // });

    if (!confirm && data.result.length) {
      dispatch(openModal({
        type: EModalTypes.ALERT_MESSAGE,
        props: {
          onOk: () => {
            onConfirm(true);
          },
          okLabel: 'Assign anyway',
          // eslint-disable-next-line
          messages: data.result.map((item: any) => item.message),
        },
      }));

      return;
    }

    await dispatch(assignDriverToOrder({ orderId, data: { driver: { id: driver.id } } }));

    dispatch(openModal({
      type: EModalTypes.SUCCESS_MESSAGE,
      props: {
        autoHide: true,
        messages: [`Order ${orderId}`, `Assigned to ${driver.name}`],
      },
    }));
  };

  return (
    <ModalWrapper>
      <TextWrapper>
        <Title>Assign Driver</Title>
        {!!errorMessage && <Title alert>{errorMessage}</Title>}
      </TextWrapper>
      <Search value={search} alert={!!errorMessage} handleRecommendation={handleRecommendation} onChange={onSearch} />
      {showRecommendation && (
        <Drivers orderId={orderId} search={debouncedSearch} onSelect={onDriverSelect} />
      )}
      <Footer onCancel={close} onConfirm={() => onConfirm()} />
    </ModalWrapper>
  );
};

export default AssignDriver;
