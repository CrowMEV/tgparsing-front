import { useState } from 'react';
import { FieldArray, Form, Formik, getIn } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import { activitiesValidation } from './activities-validation-schema';

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
  startDate: Date | null;
  endDate: Date | null;
  name: string;
};

const ACTIVITIES = ['лайки', 'комментарии', 'репосты'];

const Activities = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isSelectionActive, setIsSelectionActive] = useState(false);

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
          startDate: null,
          endDate: null,
          name: '',
          activities: [],
        }}
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
                  />
                ))}
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
              <h3 className={sharedStyles.header}>Количество активностей</h3>
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
                style={{ maxWidth: '610px' }}
                variant="additional"
                onClick={() => setIsSelectionActive(true)}
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
