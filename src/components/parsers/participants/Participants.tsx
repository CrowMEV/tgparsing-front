import { useState } from 'react';
import { FieldArray, Form, Formik, FormikHelpers, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { participantsValidation } from './participants-validation-schema';
import { api } from '../../../services/api';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import IconButton from '../../ui/iconButton/IconButton';

import { ReactComponent as PlusIcon } from '../../../assets/images/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/images/icons/minus.svg';

import sharedStyles from '../index.module.sass';

type FormValues = {
  groups: { id: string; value: string }[];
  amountFrom: number | null;
  name: string;
};

const Participants = () => {
  const [isFetching, setIsFetching] = useState(false);

  const initialValues: FormValues = {
    groups: [{ id: uuidv4(), value: '' }],
    amountFrom: null,
    name: '',
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    setIsFetching(true);
    api
      .post('/telegram/parser/members', {
        task_name: values.name,
        parsed_chats: values.groups.map((group) => group.value),
        groups_count: values.amountFrom,
      })
      .then(() => actions.resetForm())
      .catch((error) => {
        alert(error?.response?.data?.detail);
        console.error(error);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={participantsValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className={sharedStyles.form} method="post" action="">
            <div>
              <FieldArray
                name="groups"
                render={({ form, push, remove }) => (
                  <>
                    <div className={sharedStyles.groupsHeader}>
                      <h3 className={sharedStyles.header}>
                        Каналы и группы для поиска
                      </h3>
                      <IconButton
                        disabled={values.groups.length >= 5}
                        onClick={() => push({ id: uuidv4(), value: '' })}
                      >
                        <PlusIcon />
                      </IconButton>
                    </div>
                    <div className={sharedStyles.groupsInputsWrapper}>
                      {values.groups.map((group, index) => (
                        <div
                          className={sharedStyles.groupsInput}
                          key={group.id}
                        >
                          <TextInput
                            style={{ maxWidth: '565px' }}
                            name={`groups.${index}.value`}
                            type="text"
                            value={values.groups[index].value}
                            placeholder="Вставьте ссылку на канал, группу"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            errorMessage={(() => {
                              if (typeof errors.groups !== 'object') return '';
                              if (typeof errors.groups[index] !== 'object')
                                return '';
                              if (getIn(form.touched, `groups.${index}`)) {
                                return (errors.groups[index] as any).value;
                              }
                            })()}
                          />
                          {index > 0 ? (
                            <IconButton
                              className={sharedStyles.minusIcon}
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <MinusIcon />
                            </IconButton>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <h3 className={sharedStyles.header}>пребывают в группах</h3>
              <TextInput
                style={{ maxWidth: '305px' }}
                name="amountFrom"
                type="number"
                placeholder="От"
                value={values.amountFrom || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.amountFrom && touched.amountFrom
                    ? errors.amountFrom
                    : ''
                }
              />
            </div>
            <div>
              <h3 className={sharedStyles.header}>Название задачи</h3>
              <TextInput
                style={{ maxWidth: '610px' }}
                name="name"
                type="text"
                placeholder="Придумайте название задачи"
                hintMessage="Название будет видно только Вам"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.name && touched.name ? errors.name : ''}
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
