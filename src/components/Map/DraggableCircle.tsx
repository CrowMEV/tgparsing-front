import React, { useEffect, useState } from 'react';
import { Circle, useMap } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

type DraggableCircleProps = {
  center: [number, number];
  radius: number;
  children?: JSX.Element;
  setMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};

const DraggableCircle = ({
  center,
  radius,
  children,
  setMarker,
}: DraggableCircleProps) => {
  const map = useMap();
  const [coordinates, setCoordinates] = useState(center);

  useEffect(() => {
    setCoordinates(center);
  }, [center]);

  return (
    <Circle
      center={coordinates}
      radius={radius}
      eventHandlers={{
        mousedown: () => {
          map.on('mousemove', (e: LeafletMouseEvent) => {
            map.dragging.disable();
            setCoordinates([e.latlng.lat, e.latlng.lng]);
          });
        },
        mouseup: () => {
          map.dragging.enable();
          map.removeEventListener('mousemove');
          setMarker(coordinates);
        },
      }}
    >
      {children}
    </Circle>
  );
};

export default DraggableCircle;
