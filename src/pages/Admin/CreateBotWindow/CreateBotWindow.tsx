import { Formik, Form } from 'formik';

import { createBotValidation } from './validation-schema';

import TextInput from '../../../components/ui/input/TextInput';
import Button from '../../../components/ui/button/Button';

import { useEffect, useRef, useState } from 'react';

import ModalWindow from '../../../components/ui/modal-window/ModalWindow';

import styles from './create-bot-window.module.sass';

const CreateBotWindow = () => {
  const [isActive, setIsActive] = useState(true);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // return () => socket.close();
  }, []);

  const handleSubmit = (values: any) => {
    socket.current = new WebSocket(
      'wss://api.tgparsing.ru/auth?api_id=28227346&api_hash=33dd8bfcaaafd42f308c31f6b01ecbac&phone_number=79121425101',
      // `ws://api.tgparsing.ru/auth?api_id=${values.apiId}&api_hash=${values.apiHash}&phone_number=${values.phoneNumber}`,
    );
    socket.current.onopen = (e) => {
      setIsConnectionOpen(true);
      console.log('opened', e);
    };
    socket.current.onclose = (e) => console.log('closed', e);
    socket.current.onmessage = (e) => console.log('msg', e);
    socket.current.onerror = (e) => console.log('err', e);
  };

  return (
    <ModalWindow isActive={isActive} setActive={setIsActive}>
      <article className={styles.wrapper}>
        {!isConnectionOpen && (
          <Formik
            // validationSchema={createBotValidation}
            onSubmit={handleSubmit}
            initialValues={{ apiId: '', apiHash: '', phoneNumber: '' }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className={styles.formWrapper}>
                <h2 className={styles.header}>Создание бота</h2>
                <TextInput
                  className={styles.input}
                  name="apiId"
                  errorMessage={
                    errors.apiId && touched.apiId ? errors.apiId : ''
                  }
                  placeholder="api id"
                  placeholderStyle={{ backgroundColor: '#2B3243' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  className={styles.input}
                  name="apiHash"
                  errorMessage={
                    errors.apiHash && touched.apiHash ? errors.apiHash : ''
                  }
                  placeholder="api hash"
                  placeholderStyle={{ backgroundColor: '#2B3243' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  className={styles.input}
                  name="phoneNumber"
                  errorMessage={
                    errors.phoneNumber && touched.phoneNumber
                      ? errors.phoneNumber
                      : ''
                  }
                  placeholder="Телефон"
                  placeholderStyle={{ backgroundColor: '#2B3243' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  className={styles.button}
                  variant="accent"
                >
                  Создать бота
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {isConnectionOpen && (
          <Formik
            // validationSchema={createBotValidation}
            onSubmit={(values) => {
              console.log(values.code);
              if (!socket.current) return;
              socket.current.send(values.code);
            }}
            initialValues={{ code: '' }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className={styles.formWrapper}>
                <TextInput
                  className={styles.input}
                  name="code"
                  errorMessage={errors.code && touched.code ? errors.code : ''}
                  placeholder="Код подтверждения"
                  placeholderStyle={{ backgroundColor: '#2B3243' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button type="submit" variant="accent">
                  Отправить код
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </article>
    </ModalWindow>
  );
};

export default CreateBotWindow;
