import { IOrderPayments, OrderPaymentType } from '@types';
import { useAppSelector } from '@hooks';
import { getCurrencySymbol } from '@utils';
import { selectAppCurrencyUnit } from '@selectors/configSelector';
import { UsdIcon } from '@components/icons';
import { RootWrapper, ContentWrapper, StyledIcon, Label } from './styled-components';

interface IProps {
  data: IOrderPayments;
}

const PAYMENT_TITLE_MAP: Record<OrderPaymentType, string> = {
  'CASH': 'Cash',
  'EXTRA': 'Extra',
  'PHOTO': 'Unknown',
  'UNKNOWN': 'Unknown',
  'ORDER_PAID_TIPS_CASH': 'Prepaid',
  'ORDER_PAID_TIPS_PAID': 'Prepaid',
  'ORDER_PAID_TIPS_CC_CLIP': 'Prepaid',
};

const Payments = ({ data }: IProps) => {
  const appCurrency = useAppSelector(selectAppCurrencyUnit) || 'US_DOLLAR';
  const currencySymbol = getCurrencySymbol(appCurrency);

  const paymentData = {
    paymentType: data.paymentType,
    total: data.total,
    tip: data.tip,
    cash: data.cash,
    subtotal: data.sum,
  };

  if (!Object.values(paymentData).length) return null;

  return (
    <RootWrapper align="start" wrap>
      {!!paymentData.paymentType && (
        <ContentWrapper wrap={false} align="start">
          <StyledIcon component={UsdIcon} />
          <Label>
            {PAYMENT_TITLE_MAP[paymentData.paymentType]}
            &nbsp;
            {paymentData.paymentType === 'CASH' && (paymentData.cash || paymentData.total) && (
              `${currencySymbol}${paymentData.total ?? paymentData.cash ?? ''}`
            )}
            {paymentData.paymentType !== 'CASH' && paymentData.subtotal && (
              `${currencySymbol}${paymentData.subtotal}`
            )}
          </Label>
        </ContentWrapper>
      )}
      {!!paymentData.tip && (
        <ContentWrapper wrap={false} align="start">
          <StyledIcon component={UsdIcon} />
          <Label>Tip {currencySymbol}{paymentData.tip}</Label>
        </ContentWrapper>
      )}
    </RootWrapper>
  );
};

export default Payments;
