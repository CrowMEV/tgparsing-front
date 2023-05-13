import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as L from 'leaflet';

type SearchControlProps = {
  setMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};

const SearchControl = ({ setMarker }: SearchControlProps) => {
  const map = useMap();

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: '/marker-icon.svg',
      iconAnchor: [20, 20],
      iconSize: [40, 40],
      shadowUrl: 'marker-shadow.svg',
      shadowAnchor: [11, 20],
      shadowSize: [40, 40],
    });

    const searchControl = GeoSearchControl({
      notFoundMessage: 'Мы не смогли найти это место',
      provider: new OpenStreetMapProvider(),
      autoComplete: true,
      marker: {
        icon: DefaultIcon,
        draggable: true,
      },
      showMarker: false,
      keepResult: false,
      style: 'bar',
    });

    // eslint-disable-next-line
    map.on('geosearch/showlocation', (evt: any) => {
      setMarker([evt.location.y, evt.location.x]);
    });

    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
};
export default SearchControl;
