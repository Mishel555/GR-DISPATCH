import { Wrapper, Label } from './styled-components';

interface IProps {
  adminNote: string;
}

const OrderNotes = ({ adminNote }: IProps) => (
  <Wrapper>
    <Label>
      {adminNote}
    </Label>
  </Wrapper>
);

export default OrderNotes;
