import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from 'react';

import {
  createBotValidation,
  verificationCodeValidation,
} from './validation-schema';

import TextInput from '../../../components/ui/input/TextInput';
import Button from '../../../components/ui/button/Button';
import Loader from '../../../components/ui/loader/loader';
import SuccessMessage from '../../../components/ui/SuccessMessage/SuccessMessage';
import ModalWindow from '../../../components/ui/modal-window/ModalWindow';

import styles from './create-bot-modal.module.sass';

interface CreateBotModalProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

type initialValues = {
  apiId: string;
  apiHash: string;
  phoneNumber: string;
};

const CreateBotModal = ({ isActive, setIsActive }: CreateBotModalProps) => {
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => socket.current?.close();
  }, []);

  const handleSubmit = (values: initialValues) => {
    setIsLoading(true);
    socket.current = new WebSocket(
      `wss://api.tgparsing.ru/auth?api_id=${values.apiId}&api_hash=${values.apiHash}&phone_number=${values.phoneNumber}`,
    );
    socket.current.onopen = () => {
      setIsConnectionOpen(true);
      setIsLoading(false);
    };
    socket.current.onclose = (e) => {
      console.log('closed', e);
      setIsConnectionOpen(false);
      setIsLoading(false);
    };
    socket.current.onmessage = (e) => console.log('msg', e);
    socket.current.onerror = (e) => console.log('err', e);
  };

  return (
    <ModalWindow isActive={isActive} setActive={setIsActive}>
      <article className={styles.wrapper}>
        {!isConnectionOpen && !status && (
          <Formik
            validationSchema={createBotValidation}
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader width={24} height={24} />
                  ) : (
                    'Создать бота'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {isConnectionOpen && !status && (
          <Formik
            validationSchema={verificationCodeValidation}
            onSubmit={(values) => {
              setStatus('1000');
              setIsLoading(true);
              socket.current?.send(values.code);
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

        {status &&
          !isConnectionOpen &&
          (status === '1000' ? (
            <SuccessMessage text="Бот создан" />
          ) : (
            <div>Ошибка</div>
          ))}
      </article>
    </ModalWindow>
  );
};

export default CreateBotModal;
