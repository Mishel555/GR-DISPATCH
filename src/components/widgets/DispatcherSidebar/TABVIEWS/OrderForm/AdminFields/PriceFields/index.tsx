import { FormPriceField } from '@components/ui';
import { FormWrapper, RootWrapper, Title } from './styled-components';

const PriceFields = () => (
  <RootWrapper justify="space-between">
    <Title>Total</Title>
    <FormWrapper>
      <FormPriceField name={['payments', 'cash']} controls={false} />
      <FormPriceField label="Tip" name={['payments', 'tip']} controls={false} />
    </FormWrapper>
  </RootWrapper>
);

export default PriceFields;
