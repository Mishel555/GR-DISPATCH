import dayjs from 'dayjs';
import { ILatLng } from '@types';
import { getTimeFormatString } from '@utils';
import { useAppSelector } from '@hooks';
import { selectAppTimeFormat } from '@selectors/configSelector';
import { CustomMarker } from '@components/ui';
import { Wrapper, Address, BoldText } from './styled-components';

interface IProps {
  position: ILatLng;
  data: {
    name?: string;
    address?: string;
    date?: string | null;
  };
  onDot?: boolean;
}

const DropOffDescription = ({ position, data, onDot }: IProps) => {
  const timeFormat = useAppSelector(selectAppTimeFormat);

  const { date, address, name } = data;
  const formattedDate = date ? dayjs(date).format(`MMM DD / ${getTimeFormatString(timeFormat)}`) : '';

  return (
    <CustomMarker position={position}>
      <Wrapper onDot={onDot}>
        <BoldText>To</BoldText>
        <Address><BoldText>{name}</BoldText> {address}</Address>
        <BoldText>{formattedDate}</BoldText>
      </Wrapper>
    </CustomMarker>
  );
};

export default DropOffDescription;
