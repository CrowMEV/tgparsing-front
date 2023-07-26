import { useRef, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { useAppDispatch } from '../../../hooks/redux';
import { patchUser } from '../../../store/user-slice/apiActions';
import { mainDataValidation } from './main-validation-schema';
import { BASE_URL } from '../../../consts/consts';
import { User } from '../../../types/user';

import Button from '../../ui/button/Button';
import TextInput from '../../ui/input/TextInput';
import Loader from '../../ui/loader/loader';

import sharedStyles from '../profile.module.sass';
import styles from './main-data.module.sass';

type initialValues = {
  picture: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
};

type MainDataProps = {
  user: User;
  variant?: 'admin' | 'user';
};

const MainData = ({ user, variant = 'user' }: MainDataProps) => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  const initialValues: initialValues = {
    picture: '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phoneNumber: '',
  };

  const handleSubmit = async (
    values: initialValues,
    actions: FormikHelpers<initialValues>,
  ) => {
    setIsFetching(true);
    const formData = new FormData();
    let key: keyof typeof values;
    for (key in values) {
      if (!(values[key] === initialValues[key])) {
        formData.append(key, values[key]);
      }
    }
    let action;
    if (variant === 'admin') {
      return;
    } else if (variant === 'user') {
      action = dispatch(patchUser(formData));
    }
    if (!action) return;
    await action
      .unwrap()
      .then((user) => {
        actions.resetForm({
          values: {
            picture: '',
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phoneNumber: '',
          },
        });
      })
      .catch(() => {
        if (!avatarRef.current) return;
        avatarRef.current.src = `${BASE_URL}/${user?.avatar_url}`;
        actions.resetForm();
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mainDataValidation}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        dirty,
        setFieldValue,
      }) => (
        <Form className={styles.wrapper}>
          <div className={`${styles.columnWrapper}`}>
            <h3 className={sharedStyles.header}>Аватар</h3>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <img
                  ref={avatarRef}
                  className={styles.avatarImg}
                  src={`${BASE_URL}/${user?.avatar_url}`}
                  alt="Аватар"
                />
                <input
                  className={styles.avatarInput}
                  type="file"
                  name="picture"
                  id="avatar"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (e.target.files?.[0] && avatarRef.current) {
                      const avatar = e.target.files[0];
                      setFieldValue('picture', avatar);
                      avatarRef.current.src = URL.createObjectURL(avatar);
                    }
                  }}
                />
                <label className={styles.avatarlabel} htmlFor="avatar">
                  Изменить фото
                </label>
                <div className={styles.pictureError}>
                  {errors.picture && touched.picture ? errors.picture : ''}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.columnWrapper} ${
              variant === 'admin' ? styles.adminColumn : ''
            }`}
          >
            <h3 className={sharedStyles.header}>Основные данные</h3>
            <div className={sharedStyles.column}>
              <TextInput
                name="firstname"
                type="text"
                placeholder="Имя"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  dirty && errors.firstname && touched.firstname
                    ? errors.firstname
                    : ''
                }
              />
              <TextInput
                name="lastname"
                type="text"
                placeholder="Фамилия"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  dirty && errors.lastname && touched.lastname
                    ? errors.lastname
                    : ''
                }
              />
              <TextInput
                name="email"
                type="text"
                placeholder="Электронная почта"
                hintMessage="Внимание! Эта почта будет использоваться при входе в аккаунт"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  dirty && errors.email && touched.email ? errors.email : ''
                }
              />
              <TextInput
                name="phoneNumber"
                type="text"
                placeholder="Телефон"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
              />
              <Button
                disabled={!dirty && !isFetching}
                type="submit"
                variant="accent"
              >
                {isFetching ? (
                  <Loader width={24} height={24} />
                ) : (
                  'Сохранить изменения'
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MainData;
