import { Tooltip, TooltipProps } from 'antd';

const innerStyle = {
  height: '18px',
  borderRadius: '60px',
  padding: '0 8px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '10px',
  fontWeight: '600',
};

const CustomTooltip = (props: TooltipProps) => (
  <Tooltip {...props} overlayInnerStyle={innerStyle} />
);

export default CustomTooltip;
