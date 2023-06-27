import React, { useState } from 'react';
import { passDataValidation } from './pass-validation-schema';
import { Form, Formik } from 'formik';
import TextInput from '../../ui/input/TextInput';
import Button from '../../ui/button/Button';
import IconButton from '../../ui/iconButton/IconButton';

import { ReactComponent as HideIcon } from '../../../assets/images/icons/closed-eye.svg';
import { ReactComponent as ShowIcon } from '../../../assets/images/icons/opened-eye.svg';

import sharedStyles from '../profile.module.sass';

type passData = {
  currentPass: string;
  newPass: string;
  newPassConfirm: string;
};

const PassData = () => {
  const [currentPassVisibility, setCurrentPassVisibility] = useState(false);
  const [newPassVisibility, setNewPassVisibility] = useState(false);

  const submitChanges = (values: passData) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        currentPass: '',
        newPass: '',
        newPassConfirm: '',
      }}
      validationSchema={passDataValidation}
      onSubmit={submitChanges}
    >
      {({ errors, touched, handleChange, handleBlur, dirty }) => (
        <Form className={sharedStyles.column}>
          <TextInput
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
                isError={
                  (dirty && errors.currentPass && touched.currentPass) || false
                }
                onClick={() => setCurrentPassVisibility((state) => !state)}
              >
                {currentPassVisibility ? <ShowIcon /> : <HideIcon />}
              </IconButton>
            }
          />
          <TextInput
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
                isError={(dirty && errors.newPass && touched.newPass) || false}
                onClick={() => setNewPassVisibility((state) => !state)}
              >
                {newPassVisibility ? <ShowIcon /> : <HideIcon />}
              </IconButton>
            }
          />
          <TextInput
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
                  (dirty && errors.newPassConfirm && touched.newPassConfirm) ||
                  false
                }
                onClick={() => setNewPassVisibility((state) => !state)}
              >
                {newPassVisibility ? <ShowIcon /> : <HideIcon />}
              </IconButton>
            }
          />
          <Button disabled={!dirty} type="submit" variant="accent">
            Изменить пароль
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PassData;
