import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from 'react';

import {
  createBotValidation,
  verificationCodeValidation,
} from './validation-schema';

import TextInput from '../../../ui/input/TextInput';
import Button from '../../../ui/button/Button';
import Loader from '../../../ui/loader/loader';
import SuccessMessage from '../../../ui/messages/SuccessMessage/SuccessMessage';
import ErrorMessage from '../../../ui/messages/ErrorMessage/ErrorMessage';
import ModalWindow from '../../../ui/modal-window/ModalWindow';

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
  const [status, setStatus] = useState<{ code: number; reason: string } | null>(
    null,
  );
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isActive) {
      setStatus(null);
    }
    return () => socket.current?.close();
  }, [isActive]);

  const handleSubmit = (values: initialValues) => {
    setIsLoading(true);
    socket.current = new WebSocket(
      `wss://api.tgparsing.ru/telegram/tgaccount/create?api_id=${values.apiId}&api_hash=${values.apiHash}&phone_number=${values.phoneNumber}`,
    );
    socket.current.onclose = (e) => {
      setStatus({ code: e.code, reason: e.reason });
      setIsConnectionOpen(false);
      setIsLoading(false);
    };
    socket.current.onmessage = () => {
      setIsLoading(false);
      setIsConnectionOpen(true);
    };
  };

  return (
    <ModalWindow clickByOut={false} isActive={isActive} setActive={setIsActive}>
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
                  hintMessage="Начинается с +, 11 цифр"
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
          (status.code === 1000 ? (
            <SuccessMessage text="Бот создан" />
          ) : (
            <ErrorMessage text="Ошибка при создании бота">
              <div>{status.reason}</div>
            </ErrorMessage>
          ))}
      </article>
    </ModalWindow>
  );
};

export default CreateBotModal;
