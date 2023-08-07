import { useEffect, useState } from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import { passDataValidation } from './pass-validation-schema';
import { patchUser } from '../../../store/user-slice/apiActions';
import { api } from '../../../services/api';
import { useAppDispatch } from '../../../hooks/redux';
import { useDebounce } from '../../../hooks/useDebounce';

import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import IconButton from '../../ui/iconButton/IconButton';
import Loader from '../../ui/loader/loader';

import { ReactComponent as HideIcon } from '../../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../../assets/images/icons/opened-eye.svg';

import sharedStyles from '../profile.module.sass';

type formValues = {
  currentPassValidity: boolean;
  currentPass: string;
  newPass: string;
  newPassConfirm: string;
};

const CurrentPass = ({ disabled }: { disabled: boolean }) => {
  const { setFieldValue, values } = useFormikContext<formValues>();
  const [currentPassVisibility, setCurrentPassVisibility] = useState(false);
  const [currentPassError, setCurrentPassError] = useState('');
  const debouncedCurrentPassword = useDebounce(values.currentPass, 1500);

  useEffect(() => {
    if (debouncedCurrentPassword) {
      api
        .post('/user/pass', { password: debouncedCurrentPassword })
        .then(() => setFieldValue('currentPassValidity', true))
        .catch((error) => {
          setCurrentPassError(error.response.data.detail);
          setFieldValue('currentPassValidity', false);
        });
    }
  }, [debouncedCurrentPassword]);

  return (
    <TextInput
      disabled={disabled}
      autoComplete="new-password"
      name="currentPass"
      value={values.currentPass}
      onChange={(e) => {
        setFieldValue('currentPass', e.target.value);
        setCurrentPassError('');
      }}
      errorMessage={currentPassError}
      type={currentPassVisibility ? 'text' : 'password'}
      placeholder="Текущий пароль"
      endIcon={
        <IconButton
          disabled={disabled}
          isError={Boolean(currentPassError.length)}
          onClick={() => setCurrentPassVisibility((state) => !state)}
        >
          {currentPassVisibility ? <ShowIcon /> : <HideIcon />}
        </IconButton>
      }
    />
  );
};

const PassData = ({ disabled = false }: { disabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const [newPassVisibility, setNewPassVisibility] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const initialValues: formValues = {
    currentPassValidity: false,
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
      {({ errors, touched, handleChange, handleBlur, dirty, values }) => (
        <Form>
          <h3 className={sharedStyles.header}>Пароль</h3>
          <div className={sharedStyles.column}>
            <CurrentPass disabled={disabled} />
            <TextInput
              disabled={!values.currentPassValidity}
              autoComplete="new-password"
              name="newPass"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                values.currentPassValidity &&
                dirty &&
                errors.newPass &&
                touched.newPass
                  ? errors.newPass
                  : ''
              }
              type={newPassVisibility ? 'text' : 'password'}
              placeholder="Новый пароль"
              endIcon={
                <IconButton
                  disabled={!values.currentPassValidity}
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
              disabled={!values.currentPassValidity}
              autoComplete="new-password"
              name="newPassConfirm"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                values.currentPassValidity &&
                dirty &&
                errors.newPassConfirm &&
                touched.newPassConfirm
                  ? errors.newPassConfirm
                  : ''
              }
              type={newPassVisibility ? 'text' : 'password'}
              placeholder="Повторите новый пароль"
              endIcon={
                <IconButton
                  disabled={!values.currentPassValidity}
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
              disabled={!dirty && !isFetching && !values.currentPassValidity}
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
