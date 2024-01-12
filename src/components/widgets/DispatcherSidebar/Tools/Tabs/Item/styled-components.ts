import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

const getBadgeRightPosition = (badge: string | number): number => {
  if (typeof badge === 'string') return 1;

  if (badge.toString().length > 1) {
    return 3;
  }

  if (badge > 999) return -1;

  return 5;
};

const getBadgePadding = (badge: string | number): number => {
  if (typeof badge === 'string') return 7;

  if (badge.toString().length > 1) {
    return 5;
  }

  return 3;
};

export const Label = styled(Typography.Text)<{ badge?: number | string; active?: boolean }>`
  color: ${props => props.active ? COLORS.CYAN : COLORS.GREY_MAIN};

  &::before {
    content: '${props => props.badge}';

    display: ${props => props.badge !== undefined ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;

    padding: 0 ${props => props.badge ? getBadgePadding(props.badge) : 3}px;
    width: fit-content;
    min-width: 18px;
    height: 18px;
    border-radius: ${props => props.badge === 'All' ? 10 : 9}px;

    font-size: 10px;
    color: ${COLORS.WHITE};
    background-color: ${COLORS.CYAN};

    position: absolute;
    top: 0;
    right: ${props => props.badge && getBadgeRightPosition(props.badge)}px;
  }
`;
