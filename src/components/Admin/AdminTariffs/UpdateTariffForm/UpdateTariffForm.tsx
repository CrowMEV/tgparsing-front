import { FC, useState } from 'react';
import ModalWindow from '../../../ui/modal-window/ModalWindow';
import { Form, Formik } from 'formik';
import { TariffResponse } from '../../../../types/tariff';
import styles from '../admin-tariffs.module.sass';
import TextInput from '../../../ui/input/TextInput';
import Checkbox from '../../../ui/checkbox/Checkbox';
import Button from '../../../ui/button/Button';
import { tariffSchema } from '../NewTariffForm/validation-schema';
import Loader from '../../../ui/loader/loader';
import { useAppDispatch } from '../../../../hooks/redux';
import { updateTariff } from '../../../../store/tariff-slice/apiActions';

interface UpdateTariffFormProps {
  tariff: TariffResponse | null;
  isActive: boolean;
  setIsActive: (modalIsActive: boolean) => void;
}

const UpdateTariffForm: FC<UpdateTariffFormProps> = ({
  tariff,
  isActive,
  setIsActive,
}) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = (tariff: TariffResponse, resetForm: () => void) => {
    setIsSubmitting(true);
    dispatch(updateTariff(tariff))
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

  if (!tariff) {
    return null;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={tariff}
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
      }) => (
        <ModalWindow
          isActive={isActive}
          setActive={setIsActive}
          style={{ marginTop: '2vh' }}
          clickByOut={false}
        >
          <Form className={styles.tariffForm}>
            <h2 className={styles.tariffForm_title}>Изменение тарифа</h2>
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
                  name="options.simultaneous_parsing"
                  value={values.options.simultaneous_parsing}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.options?.simultaneous_parsing &&
                    touched.options?.simultaneous_parsing
                      ? errors.options?.simultaneous_parsing
                      : ''
                  }
                  placeholder="Одновременный парсинг"
                  placeholderStyle={{
                    backgroundColor: '#2B3243',
                    fontSize: '12px',
                  }}
                />
                <TextInput
                  name="options.parsers_per_day"
                  value={values.options.parsers_per_day}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.options?.parsers_per_day &&
                    touched.options?.parsers_per_day
                      ? errors.options?.parsers_per_day
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
                name="options.members"
                checked={values.options.members}
                title="Участники групп/каналов"
                checkboxHandler={handleChange}
              />
              <Checkbox
                className={styles.tariffForm_checkbox}
                name="options.activity"
                checked={values.options.activity}
                title="Активность участников групп/каналов"
                checkboxHandler={handleChange}
              />
              <Checkbox
                className={styles.tariffForm_checkbox}
                name="options.geo"
                checked={values.options.geo}
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
                <>Сохранить изменения</>
              )}
            </Button>
          </Form>
        </ModalWindow>
      )}
    </Formik>
  );
};
export default UpdateTariffForm;
