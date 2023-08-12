import { useState } from 'react';
import { FieldArray, Form, Formik, FormikHelpers, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { activitiesValidation } from './activities-validation-schema';
import { api } from '../../../services/api';

import AudienceSelectionWindow from '../AudienceSelectionWindow/AudienceSelectionWindow';
import IconButton from '../../ui/iconButton/IconButton';
import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import Checkbox from '../../ui/checkbox/Checkbox';
import ModalWindow from '../../ui/modal-window/ModalWindow';

import { ReactComponent as PlusIcon } from '../../../assets/images/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../assets/images/icons/minus.svg';

import sharedStyles from '../index.module.sass';

type FormValues = {
  groups: { id: string; value: string }[];
  amountTo: number | null;
  amountFrom: number | null;
  startDate: string | null;
  endDate: string | null;
  name: string;
  activities: string[];
};

const ACTIVITIES = ['комментарии', 'репосты'];

const Activities = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSelectionActive, setIsSelectionActive] = useState(false);

  const initialValues: FormValues = {
    groups: [{ id: uuidv4(), value: '' }],
    amountTo: null,
    amountFrom: null,
    startDate: null,
    endDate: null,
    name: '',
    activities: [],
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    // actions.resetForm();
    setIsFetching(true);
    api
      .post('/telegram/parser/activemembers', {
        task_name: values.name,
        parsed_chats: values.groups.map((group) => group.value),
        from_date: values.startDate,
        to_date: values.endDate,
        activity_count: values.amountFrom,
        activity: {
          comments: values.activities.includes('комментарии'),
          reposts: values.activities.includes('репосты'),
        },
        //TODO
        rerun: false,
      })
      .then(() => actions.resetForm())
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={activitiesValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className={sharedStyles.form}>
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
                            value={values.groups[index].value}
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
              <h3 className={sharedStyles.header}>
                Какие активности учитывать
              </h3>
              <div className={sharedStyles.activities}>
                {ACTIVITIES.map((activity) => (
                  <Checkbox
                    name="activities"
                    key={activity}
                    title={activity}
                    value={activity}
                    checkboxHandler={handleChange}
                    checked={values.activities.includes(activity)}
                  />
                ))}
              </div>
              <div className={sharedStyles.errorMessage}>
                {errors.activities && touched.activities
                  ? errors.activities
                  : null}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>
                Период, за который учитываются активности
              </h3>
              <div className={sharedStyles.inputGroup}>
                <TextInput
                  name="startDate"
                  type="date"
                  hintMessage="Введите дату начала периода"
                  value={values.startDate || ''}
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
                  value={values.endDate || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.endDate && touched.endDate ? errors.endDate : ''
                  }
                />
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>Количество активностей</h3>
              <div className={sharedStyles.inputGroup}>
                <TextInput
                  name="amountFrom"
                  type="number"
                  // placeholder="От"
                  value={values.amountFrom || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.amountFrom && touched.amountFrom
                      ? errors.amountFrom
                      : ''
                  }
                />
                {/* <TextInput
                  name="amountTo"
                  type="number"
                  placeholder="До (включительно)"
                  value={values.amountTo || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    errors.amountTo && touched.amountTo ? errors.amountTo : ''
                  }
                /> */}
              </div>
            </div>
            <div>
              <h3 className={sharedStyles.header}>
                Пользователи, активности которых учитывать
              </h3>
              <ModalWindow
                isActive={isSelectionActive}
                setActive={setIsSelectionActive}
              >
                <AudienceSelectionWindow />
              </ModalWindow>
              <Button
                disabled
                style={{ maxWidth: '610px' }}
                variant="additional"
                // onClick={() => setIsSelectionActive(true)}
              >
                Выбрать аудиторию
              </Button>
              <div className={sharedStyles.selectedTasks}></div>
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

export default Activities;
