import { Marker } from './marker';

export interface ParsingTool {
  id: string;
  name: string;
  date: string;
  mailings: number;
  duration: string;
  isFavorite: boolean;
  isCurrent: boolean;
  period: {
    from: string;
    to: string;
  };
  markers: Marker[];
  radius: number;
}
