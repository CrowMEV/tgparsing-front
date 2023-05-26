import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.svg',
  iconAnchor: [20, 40],
  iconSize: [40, 40],
  shadowUrl: 'marker-shadow.svg',
  shadowAnchor: [11, 40],
  shadowSize: [40, 40],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MapProps = {
  children: JSX.Element;
  width: string;
  height: string;
  center?: [number, number];
  zoom?: number;
};

const Map = ({ children, width, height, center, zoom, ...rest }: MapProps) => {
  return (
    <MapContainer
      style={{ height: height, width: width }}
      center={center || [51.505, -0.09]}
      zoom={zoom || 13}
      {...rest}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
        url="https://api.mapbox.com/styles/v1/parker111/cli4hplq902ki01pr5c34edwc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFya2VyMTExIiwiYSI6ImNsaTRnZ3l1YzEydXgzbG8zc3Zobjk1ejEifQ.boESgzdAT8mfhT-TCABzxg"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
