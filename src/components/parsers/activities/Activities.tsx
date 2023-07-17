import { useState } from 'react';
import { Form, Formik } from 'formik';

import { activitiesValidation } from './activities-validation-schema';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';

import sharedStyles from '../index.module.sass';

type FormValues = {
  groups: string;
  amountTo: number | null;
  amountFrom: number | null;
  startDate: Date | null;
  endDate: Date | null;
  name: string;
};

const Activities = () => {
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <section>
      <Formik
        initialValues={{
          groups: '',
          amountTo: null,
          amountFrom: null,
          startDate: null,
          endDate: null,
          name: '',
        }}
        validationSchema={activitiesValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, isValid }) => (
          <Form className={sharedStyles.form}>
            <div>
              <h3 className={sharedStyles.header}>Шаг 1. Название задачи</h3>
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
            <div>
              <h3 className={sharedStyles.header}>Шаг 2. Группы для поиска</h3>
              <TextInput
                style={{ maxWidth: '610px' }}
                name="groups"
                type="text"
                placeholder="Вставьте ссылку на канал, группу"
                hintMessage="Каждая ссылка - на отдельной строке или через запятую"
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.groups && touched.groups ? errors.groups : ''
                }
              />
            </div>
            <div>
              <h3 className={sharedStyles.header}>
                Шаг 3. Период, за который учитываются активности
              </h3>
              <div className={sharedStyles.inputGroup}>
                <TextInput
                  name="startDate"
                  type="date"
                  hintMessage="Введите дату начала периода"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.startDate && touched.startDate
                      ? errors.startDate
                      : ''
                  }
                />
                <TextInput
                  name="endDate"
                  type="date"
                  hintMessage="Введите дату окончания периода"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.endDate && touched.endDate ? errors.endDate : ''
                  }
                />
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>количество активностей</h3>
              <div className={sharedStyles.inputGroup}>
                <TextInput
                  name="amountFrom"
                  type="number"
                  placeholder="От"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.amountFrom && touched.amountFrom
                      ? errors.amountFrom
                      : ''
                  }
                />
                <TextInput
                  name="amountTo"
                  type="number"
                  placeholder="До (включительно)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.amountTo && touched.amountTo ? errors.amountTo : ''
                  }
                />
              </div>
            </div>
            <Button
              style={{ maxWidth: '610px' }}
              variant="accent"
              type="submit"
              disabled={isFetching}
            >
              Начать сбор аудитории
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Activities;
