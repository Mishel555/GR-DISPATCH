import { Tooltip, TooltipProps } from 'antd';
import Icon from '@ant-design/icons';
import { COLORS } from '@constants/theme';
import { CaretArrowIcon } from '@components/icons';
import Details from './Details';
import { Wrapper } from './styled-components';
import { useState } from 'react';

interface IProps {
  data: string;
}

const innerStyle: TooltipProps['overlayInnerStyle'] = {
  width: 'fit-content',
  borderRadius: 26,
  padding: '15px 20px',
  color: COLORS.GREY_MAIN,
};

const TOOLTIP_OPTIONS: TooltipProps = {
  arrow: false,
  placement: 'right',
  color: COLORS.WHITE,
  overlayInnerStyle: innerStyle,
};

const EventDetails = ({ data }: IProps) => {
  const [show, setShow] = useState<boolean>(false);

  const open = () => setShow(true);

  const close = () => setShow(false);

  return (
    <Wrapper>
      <Tooltip {...TOOLTIP_OPTIONS} title={<Details data={data} onClose={close} />} open={show}>
        <Icon component={() => <CaretArrowIcon direction="right" />} onClick={open} />
      </Tooltip>
    </Wrapper>
  );
};

export default EventDetails;
