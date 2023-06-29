import { Form, Formik } from 'formik';

import ModalWindow from '../ui/modal-window/ModalWindow';
import TextInput from '../ui/input/TextInput';
import Button from '../ui/button/Button';

import styles from './replenishment-window.module.sass';
import { replenishmentSchema } from './replenishment-schema';

type ReplenishmentWindowProps = {
  isActive: boolean;
  setActive: (modalIsActive: boolean) => void;
};

type ReplenishmentRequest = {
  amount: number | string;
};

const ReplenishmentWindow = ({
  isActive,
  setActive,
}: ReplenishmentWindowProps) => {
  const submitHandler = (data: ReplenishmentRequest) => {
    console.log(data);
  };

  return (
    <ModalWindow isActive={isActive} setActive={setActive}>
      <article className={styles.wrapper}>
        <h2 className={styles.header}>Пополнение баланса</h2>
        <div className={styles.balance}>
          <p>250.00 ₽</p>
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
                disabled={!isValid && touched.amount}
              >
                Пополнить
              </Button>
            </Form>
          )}
        </Formik>
      </article>
    </ModalWindow>
  );
};

export default ReplenishmentWindow;
