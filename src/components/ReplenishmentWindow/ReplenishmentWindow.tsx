import { useState } from 'react';
import { Form, Formik } from 'formik';

import { api } from '../../services/api';
import { replenishmentSchema } from './replenishment-schema';
import { useAppSelector } from '../../hooks/redux';

import ModalWindow from '../ui/modal-window/ModalWindow';
import TextInput from '../ui/input/TextInput';
import Button from '../ui/button/Button';
import Loader from '../ui/loader/loader';

import styles from './replenishment-window.module.sass';

type ReplenishmentWindowProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
};

type ReplenishmentRequest = {
  amount: string;
};

const ReplenishmentWindow = ({
  isActive,
  setActive,
}: ReplenishmentWindowProps) => {
  const user = useAppSelector((state) => state.UserData.user);
  const [isFetching, setIsFetching] = useState(false);

  const submitHandler = async (formData: ReplenishmentRequest) => {
    setIsFetching(true);
    try {
      const { data } = await api.post('/payment/create/', formData);
      window.location.href = data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  if (!user) return null;

  return (
    <ModalWindow clickByOut={false} isActive={isActive} setActive={setActive}>
      <article className={styles.wrapper}>
        <h2 className={styles.header}>Пополнение баланса</h2>
        <div className={styles.balance}>
          <p>{user?.balance} ₽</p>
          <p className={styles.balanceHint}>Текущий баланс</p>
        </div>
        <Formik
          initialValues={{ amount: '' }}
          validationSchema={replenishmentSchema}
          onSubmit={(values) => submitHandler(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
            <Form className={styles.form}>
              <TextInput
                type="number"
                autoComplete="off"
                name="amount"
                placeholder="Сумма пополнения"
                placeholderStyle={{ backgroundColor: '#2B3243' }}
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.amount && touched.amount ? errors.amount : ''
                }
              />

              <Button
                variant="accent"
                type="submit"
                disabled={!isValid && touched.amount && !isFetching}
              >
                {isFetching ? <Loader width={24} height={24} /> : 'Пополнить'}
              </Button>
            </Form>
          )}
        </Formik>
      </article>
    </ModalWindow>
  );
};

export default ReplenishmentWindow;
