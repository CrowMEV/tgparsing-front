import { FC, useState } from 'react';
import ModalWindow from '../../ui/modal-window/ModalWindow';
import { Form, Formik, FormikState } from 'formik';
import { Tariff, TariffForm } from '../../../types/tariff';
import styles from '../admin-tariffs.module.sass';
import TextInput from '../../ui/input/TextInput';
import Checkbox from '../../ui/checkbox/Checkbox';
import Button from '../../ui/button/Button';
import { tariffSchema } from './validation-schema';
import Loader from '../../ui/loader/loader';
import { Parsers } from '../../../consts/consts';
import { useAppDispatch } from '../../../hooks/redux';
import { addTariff } from '../../../store/tariff-slice/apiActions';

interface NewTariffFormProps {
  isActive: boolean;
  setIsActive: (modalIsActive: boolean) => void;
}

const NEW_TARIFF_BLANC: TariffForm = {
  name: '',
  description: '',
  limitation_days: '',
  price: '',
  options: {
    parsersPerDay: '',
    simultaneousParsing: '',
    methods: [],
  },
};

const NewTariffForm: FC<NewTariffFormProps> = ({ isActive, setIsActive }) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = (
    tariff: TariffForm,
    resetForm: (nextState?: Partial<FormikState<Tariff>> | undefined) => void,
  ) => {
    setIsSubmitting(true);
    dispatch(addTariff(tariff as Tariff))
      .unwrap()
      .then(() => {
        setIsActive(false);
        setErrorMessage('');
        resetForm();
      })
      .catch((err) => {
        setErrorMessage(err.detail);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const resetHandler = (resetForm: () => void) => {
    resetForm();
    setIsActive(false);
  };

  return (
    <Formik
      initialValues={NEW_TARIFF_BLANC}
      validationSchema={tariffSchema}
      onSubmit={(values, { resetForm }) => submitHandler(values, resetForm)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        dirty,
        resetForm,
      }) => (
        <ModalWindow
          isActive={isActive}
          setActive={() => resetHandler(resetForm)}
          style={{ marginTop: '2vh' }}
        >
          <Form className={styles.tariffForm}>
            <h2 className={styles.tariffForm_title}>Новый тариф</h2>
            <TextInput
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.name && touched.name ? errors.name : ''}
              placeholder="Название тарифа"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
            />
            <TextInput
              name="limitation_days"
              value={values.limitation_days}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                errors.limitation_days && touched.limitation_days
                  ? errors.limitation_days
                  : ''
              }
              type="number"
              placeholder="Срок действия"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
            />
            <TextInput
              name="price"
              value={values.price}
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.price && touched.price ? errors.price : ''}
              placeholder="Стоимость"
              placeholderStyle={{ backgroundColor: '#2B3243' }}
            />
            <div>
              <h3 className={styles.tariffForm_subTitle}>Предусматривает</h3>
              <div className={styles.tariffForm_parsers}>
                <TextInput
                  name="options.simultaneousParsing"
                  value={values.options.simultaneousParsing}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.options?.simultaneousParsing &&
                    touched.options?.simultaneousParsing
                      ? errors.options?.simultaneousParsing
                      : ''
                  }
                  placeholder="Одновременный парсинг"
                  placeholderStyle={{
                    backgroundColor: '#2B3243',
                    fontSize: '12px',
                  }}
                />
                <TextInput
                  name="options.parsersPerDay"
                  value={values.options.parsersPerDay}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.options?.parsersPerDay &&
                    touched.options?.parsersPerDay
                      ? errors.options?.parsersPerDay
                      : ''
                  }
                  placeholder="Парсингов в день"
                  placeholderStyle={{
                    backgroundColor: '#2B3243',
                    fontSize: '12px',
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className={styles.tariffForm_methodsTitle}>
                Методы сбора аудитории
              </h3>
              <Checkbox
                className={styles.tariffForm_checkbox}
                name="options.methods"
                value={Parsers.Members}
                checked={values.options.methods.includes(Parsers.Members)}
                title="Участники групп/каналов"
                checkboxHandler={handleChange}
              />
              <Checkbox
                className={styles.tariffForm_checkbox}
                name="options.methods"
                value={Parsers.ActiveMembers}
                checked={values.options.methods.includes(Parsers.ActiveMembers)}
                title="Активность участников групп/каналов"
                checkboxHandler={handleChange}
              />
              <Checkbox
                className={styles.tariffForm_checkbox}
                name="options.methods"
                value={Parsers.GeoMembers}
                checked={values.options.methods.includes(Parsers.GeoMembers)}
                title="Геолокация"
                checkboxHandler={handleChange}
              />
            </div>
            {errorMessage && (
              <p className={styles.tariffForm_error}>{errorMessage}</p>
            )}
            <Button
              disabled={!(isValid && dirty) || isSubmitting}
              type="submit"
              variant="accent"
            >
              {isSubmitting ? (
                <Loader width={24} height={24} />
              ) : (
                <>Создать тариф</>
              )}
            </Button>
          </Form>
        </ModalWindow>
      )}
    </Formik>
  );
};
export default NewTariffForm;
