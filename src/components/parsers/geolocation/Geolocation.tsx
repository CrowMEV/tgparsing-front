import { useState } from 'react';
import { Circle, Popup } from 'react-leaflet';

import Map from '../../Map/Map';
import DraggableCircle from '../../Map/DraggableCircle';
import SearchControl from '../../Map/SearchControl';
import RoundRadio from '../../ui/roundRadio/RoundRadio';

import { ParserNames } from '../../../consts/consts';

import styles from './geolocation.module.sass';
import sharedStyles from '../index.module.sass';

const RADIUSES = [500, 1000, 2000, 3000, 5000] as const;

type FormInfo = {
  markers: Array<[number, number]>;
  radius: (typeof RADIUSES)[number];
  name: string;
  parserType: keyof typeof ParserNames;
};

const Geolocation = () => {
  const MAX_MARKERS_AMOUNT = 10;
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null);
  const [formInfo, setFormInfo] = useState<FormInfo>({
    markers: [],
    radius: RADIUSES[0],
    name: '',
    parserType: ParserNames.Geolocation,
  });

  return (
    <section>
      <div className="center">
        <h3>Геоположение</h3>
      </div>
      <form className={sharedStyles.form} method="post" action="">
        <div>
          <Map
            width="100%"
            height="400px"
            center={[55.7504461, 37.6174943]}
            zoom={12}
          >
            {
              <>
                <SearchControl setMarker={setTempMarker} />
                {tempMarker && (
                  <DraggableCircle
                    radius={formInfo.radius}
                    center={tempMarker}
                    setMarker={setTempMarker}
                  />
                )}
                {formInfo.markers.map((coordinates) => (
                  <Circle
                    key={coordinates.join()}
                    radius={formInfo.radius}
                    center={coordinates}
                  >
                    <Popup>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                          onClick={() => {
                            setFormInfo({
                              ...formInfo,
                              markers: formInfo.markers.filter(
                                (el) => el !== coordinates,
                              ),
                            });
                            setTempMarker(coordinates);
                          }}
                        >
                          Переместить точку
                        </span>
                        <span
                          style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                          onClick={() =>
                            setFormInfo({
                              ...formInfo,
                              markers: formInfo.markers.filter(
                                (el) => el !== coordinates,
                              ),
                            })
                          }
                        >
                          Удалить точку
                        </span>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </>
            }
          </Map>
          <button
            className={`${sharedStyles.button} ${styles.markerButton}`}
            onClick={(e) => {
              e.preventDefault();
              if (tempMarker && formInfo.markers.length < MAX_MARKERS_AMOUNT) {
                setFormInfo({
                  ...formInfo,
                  markers: [...formInfo.markers, tempMarker],
                });
                setTempMarker(null);
              }
            }}
          >
            Сохранить точку ({MAX_MARKERS_AMOUNT - formInfo.markers.length} /{' '}
            {MAX_MARKERS_AMOUNT})
          </button>
        </div>
        <div>
          <h3>Радиус области</h3>
          <div className={styles.radiusSelect}>
            {RADIUSES.map((radius) => (
              <RoundRadio
                key={radius}
                title={String(radius)}
                name="Radius"
                value={String(radius)}
                currentValue={String(formInfo.radius)}
                radioHandler={(value) =>
                  setFormInfo({
                    ...formInfo,
                    radius: Number(value) as (typeof RADIUSES)[number],
                  })
                }
              />
            ))}
          </div>
        </div>
        <div>
          <h3>Название задачи</h3>
          <input
            className={sharedStyles.input}
            type="text"
            placeholder="Название задачи"
            onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
          />
        </div>
        <button type="submit" className={sharedStyles.button}>
          Создать задачу
        </button>
      </form>
    </section>
  );
};

export default Geolocation;
