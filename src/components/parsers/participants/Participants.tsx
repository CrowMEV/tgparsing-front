import { useState } from 'react';
import { FieldArray, Form, Formik, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { participantsValidation } from './participants-validation-schema';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';

import { ReactComponent as PlusIcon } from '../../../assets/images/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/images/icons/minus.svg';

import sharedStyles from '../index.module.sass';
import IconButton from '../../ui/iconButton/IconButton';

type FormValues = {
  groups: { id: string; value: string }[];
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
          groups: [{ id: uuidv4(), value: '' }],
          amountTo: null,
          amountFrom: null,
          name: '',
        }}
        validationSchema={participantsValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, isValid, values }) => (
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
            <div>
              <h3 className={sharedStyles.header}>Название задачи</h3>
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
            <Button
              style={{ maxWidth: '610px' }}
              variant="accent"
              type="submit"
              disabled={!isValid || isFetching}
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
