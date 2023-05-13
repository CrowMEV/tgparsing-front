import { Tab } from '../types/tab';

export const ToolTabs: Tab[] = [
  {
    title: 'Все инструменты',
    value: 'all',
  },
  {
    title: 'Текущий',
    value: 'current',
  },
  {
    title: 'Избранное',
    value: 'favorite',
    icon: 'star_border',
  },
  {
    title: 'История',
    value: 'history',
    icon: 'access_time',
  },
];

export enum ParserNames {
  Geolocation = 'Geolocation',
  Activities = 'Activities',
  Participants = 'Participants',
}
