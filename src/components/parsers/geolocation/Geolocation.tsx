import { useState } from 'react';
import { Circle, Popup } from 'react-leaflet';

import Map from '../../Map/Map';
import DraggableCircle from '../../Map/DraggableCircle';
import SearchControl from '../../Map/SearchControl';
import RoundRadio from '../../ui/roundRadio/RoundRadio';

import styles from './geolocation.module.sass';
import sharedStyles from '../index.module.sass';
import { Form, Formik } from 'formik';
import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import { geolocationValidation } from './geolocation-validation-schema';

const RADIUSES = [500, 1000, 2000, 3000, 5000] as const;

type FormValues = {
  radius: (typeof RADIUSES)[number];
  name: string;
  markers: Array<[number, number]>;
};

const Geolocation = () => {
  const MAX_MARKERS_AMOUNT = 10;
  const [tempMarker, setTempMarker] = useState<[number, number] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <section>
      <Formik
        initialValues={{
          radius: RADIUSES[0],
          name: '',
          markers: [],
        }}
        validationSchema={geolocationValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
        }) => (
          <Form className={sharedStyles.form}>
            <div>
              <h3 className={sharedStyles.header}>Геоточка</h3>
              <div className={styles.mapWrapper}>
                <Map
                  width="610px"
                  height="344px"
                  center={[55.7504461, 37.6174943]}
                  zoom={12}
                >
                  {
                    <>
                      <SearchControl setMarker={setTempMarker} />
                      {tempMarker && (
                        <DraggableCircle
                          radius={values.radius}
                          center={tempMarker}
                          setMarker={setTempMarker}
                        />
                      )}
                      {values.markers.map((coordinates) => (
                        <Circle
                          key={(coordinates as [number, number]).join()}
                          radius={values.radius}
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
                                  setFieldValue(
                                    'markers',
                                    values.markers.filter(
                                      (el) => el !== coordinates,
                                    ),
                                  );
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
                                  setFieldValue(
                                    'markers',
                                    values.markers.filter(
                                      (el) => el !== coordinates,
                                    ),
                                  )
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
              </div>
              <Button
                style={{ maxWidth: '280px' }}
                variant="additional"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    tempMarker &&
                    values.markers.length < MAX_MARKERS_AMOUNT
                  ) {
                    setFieldValue('markers', [...values.markers, tempMarker]);
                    setTempMarker(null);
                  }
                }}
              >
                {`Сохранить точку ${MAX_MARKERS_AMOUNT - values.markers.length}/
                ${MAX_MARKERS_AMOUNT}`}
              </Button>
              <div className={styles.mapError}>
                {errors.markers && touched.markers ? errors.markers : ''}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>
                Радиус действия геоточки (метры)
              </h3>
              <div className={styles.radiusSelect}>
                {RADIUSES.map((radius) => (
                  <RoundRadio
                    key={radius}
                    title={String(radius)}
                    name="radius"
                    value={String(radius)}
                    currentValue={String(values.radius)}
                    radioHandler={handleChange}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>Название задачи</h3>
              <TextInput
                style={{ maxWidth: '610px' }}
                name="name"
                type="text"
                placeholder="Придумайте название задачи"
                hintMessage="Название будет видно только Вам"
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.name && touched.name ? errors.name : ''}
              />
            </div>
            <Button
              style={{ maxWidth: '610px' }}
              variant="accent"
              type="submit"
              disabled={!isValid || isFetching}
            >
              Начать сбор аудитории
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Geolocation;
