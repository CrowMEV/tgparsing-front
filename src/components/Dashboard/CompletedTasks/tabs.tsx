import { ReactElement } from 'react';
import { ReactComponent as StarIcon } from '../../../assets/images/icons/star.svg';
import { ReactComponent as ClockIcon } from '../../../assets/images/icons/clock.svg';

export interface Tab {
  title: string;
  value: string;
  icon?: ReactElement;
}

export const ToolTabs: Tab[] = [
  {
    title: 'Все',
    value: 'all',
  },
  {
    title: 'Избранное',
    value: 'favorite',
    icon: <StarIcon />,
  },
  {
    title: 'История',
    value: 'history',
    icon: <ClockIcon />,
  },
];
