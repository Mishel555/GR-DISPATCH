import { FormDistanceField } from '@components/ui';
import { FormWrapper, RootWrapper, Title } from './styled-components';

const DistanceFields = () => (
  <RootWrapper justify="space-between">
    <Title>Driving Distance</Title>
    <FormWrapper>
      <FormDistanceField name={['distances', 'drivingDistance']} controls={false} readonly />
      <FormDistanceField name={['distances', 'distance']} label="Driver Pick-up Distance " controls={false} readonly />
    </FormWrapper>
  </RootWrapper>
);

export default DistanceFields;
