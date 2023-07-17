import { useState } from 'react';
import { Form, Formik } from 'formik';

import { passDataValidation } from './pass-validation-schema';
import { useAppDispatch } from '../../../hooks/redux';
import { patchUser } from '../../../store/user-slice/apiActions';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import IconButton from '../../ui/iconButton/IconButton';
import Loader from '../../ui/loader/loader';

import { ReactComponent as HideIcon } from '../../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../../assets/images/icons/opened-eye.svg';

import sharedStyles from '../profile.module.sass';

const PassData = () => {
  const [currentPassVisibility, setCurrentPassVisibility] = useState(false);
  const [newPassVisibility, setNewPassVisibility] = useState(false);
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const initialValues = {
    currentPass: '',
    newPass: '',
    newPassConfirm: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passDataValidation}
      onSubmit={async (values, actions) => {
        setIsFetching(true);
        const formData = new FormData();
        formData.append('password', values.newPass);
        await dispatch(patchUser(formData))
          .unwrap()
          .catch()
          .finally(() => {
            setIsFetching(false);
            actions.resetForm();
          });
      }}
    >
      {({ errors, touched, handleChange, handleBlur, dirty }) => (
        <Form>
          <h3 className={sharedStyles.header}>Пароль</h3>
          <div className={sharedStyles.column}>
            <TextInput
              disabled
              autoComplete="new-password"
              name="currentPass"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                dirty && errors.currentPass && touched.currentPass
                  ? errors.currentPass
                  : ''
              }
              type={currentPassVisibility ? 'text' : 'password'}
              placeholder="Текущий пароль"
              endIcon={
                <IconButton
                  disabled
                  isError={
                    (dirty && errors.currentPass && touched.currentPass) ||
                    false
                  }
                  onClick={() => setCurrentPassVisibility((state) => !state)}
                >
                  {currentPassVisibility ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              }
            />
            <TextInput
              autoComplete="new-password"
              name="newPass"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                dirty && errors.newPass && touched.newPass ? errors.newPass : ''
              }
              type={newPassVisibility ? 'text' : 'password'}
              placeholder="Новый пароль"
              endIcon={
                <IconButton
                  isError={
                    (dirty && errors.newPass && touched.newPass) || false
                  }
                  onClick={() => setNewPassVisibility((state) => !state)}
                >
                  {newPassVisibility ? <ShowIcon /> : <HideIcon />}
                </IconButton>
              }
            />
            <TextInput
              autoComplete="new-password"
              name="newPassConfirm"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                dirty && errors.newPassConfirm && touched.newPassConfirm
                  ? errors.newPassConfirm
                  : ''
              }
              type={newPassVisibility ? 'text' : 'password'}
              placeholder="Повторите новый пароль"
              endIcon={
                <IconButton
                  isError={
                    (dirty &&
                      errors.newPassConfirm &&
                      touched.newPassConfirm) ||
                    false
                  }
                  onClick={() => setNewPassVisibility((state) => !state)}
                >
                  {newPassVisibility ? <ShowIcon /> : <HideIcon />}
                </IconButton>
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
                'Изменить пароль'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PassData;
