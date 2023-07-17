import { useState } from 'react';
import { Form, Formik } from 'formik';

import { participantsValidation } from './participants-validation-schema';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';

import sharedStyles from '../index.module.sass';

type FormValues = {
  groups: string;
  amountTo: number | null;
  amountFrom: number | null;
  name: string;
};

const Participants = () => {
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
          name: '',
        }}
        validationSchema={participantsValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, isValid }) => (
          <Form className={sharedStyles.form} method="post" action="">
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
              <h3 className={sharedStyles.header}>пребывают в группах</h3>
              <TextInput
                style={{ maxWidth: '305px' }}
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

export default Participants;
